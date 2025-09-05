import { Router, Request, Response } from "express";
import Database from "better-sqlite3";
import UserService from "../../lib/user";

const usersRouter = Router();
const db = new Database("./auth.db");

// Get all users
usersRouter.get("/users", (req: Request, res: Response) => {
  try {
    const users = db.prepare("SELECT * FROM user").all();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users"
    });
  }
});

// Get anonymous users only
usersRouter.get("/users/anonymous", (req: Request, res: Response) => {
  try {
    const users = db.prepare("SELECT * FROM user WHERE isAnonymous = 1").all();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch anonymous users"
    });
  }
});

// Get OAuth users only
usersRouter.get("/users/oauth", (req: Request, res: Response) => {
  try {
    const users = db.prepare("SELECT * FROM user WHERE isAnonymous = 0 OR isAnonymous IS NULL").all();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch OAuth users"
    });
  }
});

// Get user statistics
usersRouter.get("/users/stats", (req: Request, res: Response) => {
  try {
    const stats = UserService.getUserStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user statistics"
    });
  }
});

// Get validated users only
usersRouter.get("/users/validated", (req: Request, res: Response) => {
  try {
    const validatedUsers = UserService.getValidatedUsers();
    res.json({
      success: true,
      data: validatedUsers,
      count: validatedUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch validated users"
    });
  }
});

// Check user validation status by email
usersRouter.get("/users/validation-status/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = UserService.findByEmail(email);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    res.json({
      success: true,
      data: {
        email: user.email,
        isValid: user.isValid,
        emailVerified: user.emailVerified,
        userId: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to check validation status"
    });
  }
});

// Manually validate a user (admin function)
usersRouter.post("/users/validate", (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }
    
    const validatedUser = UserService.markAsValidated(email);
    
    if (validatedUser) {
      res.json({
        success: true,
        message: "User validated successfully",
        data: {
          email: validatedUser.email,
          isValid: validatedUser.isValid,
          userId: validatedUser.id
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: "User not found or validation failed"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to validate user"
    });
  }
});

// Get user by ID
usersRouter.get("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user"
    });
  }
});

// Update user
usersRouter.put("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, image } = req.body;
    
    const user = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (name !== undefined) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email !== undefined) {
      updates.push("email = ?");
      values.push(email);
    }
    if (image !== undefined) {
      updates.push("image = ?");
      values.push(image);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No fields to update"
      });
    }
    
    updates.push("updatedAt = CURRENT_TIMESTAMP");
    values.push(id);
    
    const updateQuery = `UPDATE user SET ${updates.join(", ")} WHERE id = ?`;
    db.prepare(updateQuery).run(...values);
    
    const updatedUser = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    
    res.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update user"
    });
  }
});

// Delete user (withdrawal)
usersRouter.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    // Delete related sessions first
    db.prepare("DELETE FROM session WHERE userId = ?").run(id);
    
    // Delete related accounts (OAuth connections)
    db.prepare("DELETE FROM account WHERE userId = ?").run(id);
    
    // Delete the user
    const result = db.prepare("DELETE FROM user WHERE id = ?").run(id);
    
    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUserId: id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete user"
    });
  }
});

// Delete all anonymous users (cleanup)
usersRouter.delete("/users/cleanup/anonymous", (req: Request, res: Response) => {
  try {
    // Get all anonymous user IDs
    const anonymousUsers = db.prepare("SELECT id FROM user WHERE isAnonymous = 1").all() as { id: string }[];
    
    let deletedCount = 0;
    
    // Delete each anonymous user and their related data
    for (const user of anonymousUsers) {
      db.prepare("DELETE FROM session WHERE userId = ?").run(user.id);
      db.prepare("DELETE FROM account WHERE userId = ?").run(user.id);
      const result = db.prepare("DELETE FROM user WHERE id = ?").run(user.id);
      if (result.changes > 0) {
        deletedCount++;
      }
    }
    
    res.json({
      success: true,
      message: `Deleted ${deletedCount} anonymous users`,
      deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to cleanup anonymous users"
    });
  }
});

export default usersRouter;