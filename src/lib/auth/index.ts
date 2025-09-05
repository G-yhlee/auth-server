import { betterAuth } from "better-auth";
import { anonymous, emailOTP } from "better-auth/plugins";
import Database from "better-sqlite3";
import emailService from "../email";
import UserService from "../user";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  basePath: "/auth",
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    anonymous(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          console.log(`[OTP] Sending ${type} OTP to ${email}: ${otp}`);
          
          // OTP 전송 시 사용자 준비 (isValid = false로 리셋)
          UserService.createOrUpdateForOTP(email);
          
          // 실제 이메일 전송
          const success = await emailService.sendOTPEmail({
            email,
            otp,
            type: type as 'sign-in' | 'email-verification' | 'password-reset'
          });

          if (success) {
            console.log(`[OTP] ✅ Email sent successfully to ${email}`);
          } else {
            console.error(`[OTP] ❌ Failed to send email to ${email}`);
          }
        } catch (error) {
          console.error(`[OTP] ❌ Error sending email to ${email}:`, error);
        }
      },
      otpLength: 6,
      expiresIn: 300, // 5분
      allowedAttempts: 3,
    }),
  ],
  trustedOrigins: [
    "http://localhost:3333",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
});
