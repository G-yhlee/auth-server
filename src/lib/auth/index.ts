import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    anonymous(),
  ],
  trustedOrigins: ["http://localhost:3333"],
});