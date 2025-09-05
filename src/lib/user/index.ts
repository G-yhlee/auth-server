import Database from "better-sqlite3";

const db = new Database("./auth.db");

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  isAnonymous: number | null;
  isValid: boolean;
}

export class UserService {
  
  // 이메일로 사용자 찾기
  static findByEmail(email: string): User | undefined {
    try {
      const user = db.prepare(`
        SELECT * FROM user WHERE email = ?
      `).get(email) as User | undefined;
      
      return user;
    } catch (error) {
      console.error('[UserService] Error finding user by email:', error);
      return undefined;
    }
  }

  // 사용자 ID로 찾기
  static findById(id: string): User | undefined {
    try {
      const user = db.prepare(`
        SELECT * FROM user WHERE id = ?
      `).get(id) as User | undefined;
      
      return user;
    } catch (error) {
      console.error('[UserService] Error finding user by id:', error);
      return undefined;
    }
  }

  // 사용자의 isValid 상태 업데이트
  static updateValidStatus(email: string, isValid: boolean = true): boolean {
    try {
      const result = db.prepare(`
        UPDATE user 
        SET isValid = ?, updatedAt = CURRENT_TIMESTAMP 
        WHERE email = ?
      `).run(isValid ? 1 : 0, email);

      if (result.changes > 0) {
        console.log(`[UserService] ✅ Updated isValid=${isValid} for user: ${email}`);
        return true;
      } else {
        console.log(`[UserService] ⚠️ No user found with email: ${email}`);
        return false;
      }
    } catch (error) {
      console.error('[UserService] Error updating isValid status:', error);
      return false;
    }
  }

  // 사용자 생성 또는 업데이트 (OTP 인증용)
  static createOrUpdateForOTP(email: string): User {
    try {
      // 먼저 기존 사용자 찾기
      let user = this.findByEmail(email);
      
      if (user) {
        // 기존 사용자가 있으면 isValid만 업데이트
        this.updateValidStatus(email, false); // OTP 전송 시에는 false로 리셋
        return user;
      } else {
        // 새 사용자 생성
        const userId = this.generateUserId();
        const result = db.prepare(`
          INSERT INTO user (id, email, emailVerified, name, isValid, createdAt, updatedAt) 
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `).run(userId, email, 0, null, 0);

        if (result.changes > 0) {
          console.log(`[UserService] ✅ Created new user for OTP: ${email}`);
          return this.findById(userId)!;
        } else {
          throw new Error('Failed to create user');
        }
      }
    } catch (error) {
      console.error('[UserService] Error creating/updating user for OTP:', error);
      throw error;
    }
  }

  // OTP 인증 완료 처리
  static markAsValidated(email: string): User | null {
    try {
      const updated = this.updateValidStatus(email, true);
      if (updated) {
        const user = this.findByEmail(email);
        console.log(`[UserService] 🎉 User validated successfully: ${email}`);
        return user || null;
      }
      return null;
    } catch (error) {
      console.error('[UserService] Error marking user as validated:', error);
      return null;
    }
  }

  // 검증된 사용자 목록 조회
  static getValidatedUsers(): User[] {
    try {
      const users = db.prepare(`
        SELECT * FROM user 
        WHERE isValid = 1 
        ORDER BY updatedAt DESC
      `).all() as User[];
      
      return users;
    } catch (error) {
      console.error('[UserService] Error getting validated users:', error);
      return [];
    }
  }

  // 사용자 통계
  static getUserStats() {
    try {
      const total = db.prepare("SELECT COUNT(*) as count FROM user").get() as { count: number };
      const validated = db.prepare("SELECT COUNT(*) as count FROM user WHERE isValid = 1").get() as { count: number };
      const emailVerified = db.prepare("SELECT COUNT(*) as count FROM user WHERE emailVerified = 1").get() as { count: number };
      const anonymous = db.prepare("SELECT COUNT(*) as count FROM user WHERE isAnonymous = 1").get() as { count: number };
      
      return {
        total: total.count,
        validated: validated.count,
        emailVerified: emailVerified.count,
        anonymous: anonymous.count,
        regular: total.count - anonymous.count
      };
    } catch (error) {
      console.error('[UserService] Error getting user stats:', error);
      return {
        total: 0,
        validated: 0,
        emailVerified: 0,
        anonymous: 0,
        regular: 0
      };
    }
  }

  // 간단한 사용자 ID 생성기
  private static generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
  }
}

export default UserService;