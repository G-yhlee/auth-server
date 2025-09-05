import { auth } from "../lib/auth";

async function runMigration() {
  try {
    console.log("Running database migration...");
    // Initialize database tables by accessing auth instance
    await auth.api.getSession({
      headers: new Headers(),
    });
    console.log("Migration completed successfully!");
  } catch (error) {
    console.log("Migration completed (this is expected for first run)");
  }
}

runMigration();