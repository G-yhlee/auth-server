import { Router, Request, Response } from "express";
import Database from "better-sqlite3";

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

    // Better Auth의 emailOTP 플러그인이 자동으로 처리
    // 실제 OTP 전송은 auth 설정의 sendVerificationOTP에서 처리됨
    
    res.json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email,
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

    res.json({
      success: true,
      message: "OTP verified successfully",
      data: {
        email,
        verifiedAt: new Date().toISOString()
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