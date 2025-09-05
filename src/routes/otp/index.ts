import { Router, Request, Response } from "express";
import Database from "better-sqlite3";
import UserService from "../../lib/user";
import emailService from "../../lib/email";

const otpRouter = Router();
const db = new Database("./auth.db");

// OTP 전송 요청 (이메일로 OTP 발송)
otpRouter.post("/otp/send", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }

    // 사용자 생성 또는 업데이트 (OTP 전송 시 isValid = false로 리셋)
    const user = UserService.createOrUpdateForOTP(email);
    console.log(`[OTP] Prepared user for OTP: ${email} (ID: ${user.id})`);

    // OTP 생성 및 저장
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5분 후 만료

    // verification 테이블에 OTP 저장
    const verificationId = `verification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    db.prepare(`
      INSERT INTO verification (id, identifier, value, expiresAt, createdAt) 
      VALUES (?, ?, ?, ?, datetime('now'))
    `).run(verificationId, email, otp, expiresAt);

    // 실제 이메일 전송
    const emailSent = await emailService.sendOTPEmail({
      email,
      otp,
      type: 'email-verification'
    });

    if (!emailSent) {
      console.error(`[OTP] Failed to send email to ${email}`);
    } else {
      console.log(`[OTP] ✅ Email sent successfully to ${email} with OTP: ${otp}`);
    }
    
    res.json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email,
        userId: user.id,
        expiresIn: 300 // 5분
      }
    });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send OTP"
    });
  }
});

// OTP 검증
otpRouter.post("/otp/verify", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required"
      });
    }

    // verification 테이블에서 OTP 확인
    const verification = db.prepare(`
      SELECT * FROM verification 
      WHERE identifier = ? AND value = ? AND expiresAt > datetime('now')
    `).get(email, otp) as { id: string; identifier: string; value: string; expiresAt: string } | undefined;

    if (!verification) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired OTP"
      });
    }

    // OTP 검증 성공 시 verification 레코드 삭제
    db.prepare("DELETE FROM verification WHERE id = ?").run(verification.id);

    // 🎉 사용자를 검증된 상태로 업데이트 (Better Auth 사용자 테이블에서도 업데이트)
    const validatedUser = UserService.markAsValidated(email);
    
    if (validatedUser) {
      console.log(`[OTP] 🎉 User ${email} has been validated successfully!`);
      
      // Better Auth 사용자 테이블에서도 isValid 업데이트
      try {
        db.prepare(`
          UPDATE user 
          SET isValid = 1, updatedAt = CURRENT_TIMESTAMP 
          WHERE email = ?
        `).run(email);
        console.log(`[OTP] ✅ Updated Better Auth user table for ${email}`);
      } catch (dbError) {
        console.error(`[OTP] ❌ Failed to update Better Auth user table:`, dbError);
      }
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
      data: {
        email,
        verifiedAt: new Date().toISOString(),
        isValid: validatedUser?.isValid || false,
        userId: validatedUser?.id
      }
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify OTP"
    });
  }
});

// 활성 OTP 목록 조회 (개발/관리자용)
otpRouter.get("/otp/active", (req: Request, res: Response) => {
  try {
    const activeOTPs = db.prepare(`
      SELECT identifier as email, createdAt, expiresAt, 
             datetime(expiresAt) > datetime('now') as isActive
      FROM verification 
      ORDER BY createdAt DESC
    `).all();

    res.json({
      success: true,
      data: activeOTPs,
      count: activeOTPs.length
    });
  } catch (error) {
    console.error("Get active OTPs error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch active OTPs"
    });
  }
});

// 만료된 OTP 정리
otpRouter.delete("/otp/cleanup", (req: Request, res: Response) => {
  try {
    const result = db.prepare(`
      DELETE FROM verification 
      WHERE expiresAt <= datetime('now')
    `).run();

    res.json({
      success: true,
      message: `Cleaned up ${result.changes} expired OTPs`,
      deletedCount: result.changes
    });
  } catch (error) {
    console.error("OTP cleanup error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to cleanup expired OTPs"
    });
  }
});

export default otpRouter;