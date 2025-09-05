import { Router, Request, Response } from "express";
import Database from "better-sqlite3";

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

export default usersRouter;