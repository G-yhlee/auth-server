import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface OTPEmailData {
  email: string;
  otp: string;
  type: 'sign-in' | 'email-verification' | 'password-reset';
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      const config: EmailConfig = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER || '',
          pass: process.env.EMAIL_PASS || '',
        },
      };

      if (!config.auth.user || !config.auth.pass) {
        console.warn('[Email] Email credentials not configured. Emails will be logged only.');
        return;
      }

      this.transporter = nodemailer.createTransport(config);
      
      // 연결 테스트
      if (this.transporter) {
        this.transporter.verify((error, success) => {
          if (error) {
            console.error('[Email] SMTP connection failed:', error.message);
            this.transporter = null;
          } else {
            console.log('[Email] SMTP connection successful');
          }
        });
      }
    } catch (error) {
      console.error('[Email] Failed to initialize email transporter:', error);
    }
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      if (!this.transporter) {
        console.log(`[Email] Mock send - To: ${emailData.to}, Subject: ${emailData.subject}`);
        console.log(`[Email] Content: ${emailData.text || 'HTML content'}`);
        return true;
      }

      const mailOptions = {
        from: {
          name: process.env.EMAIL_FROM_NAME || 'Auth Server',
          address: process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER || '',
        },
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`[Email] Successfully sent to ${emailData.to}:`, result.messageId);
      return true;
    } catch (error) {
      console.error(`[Email] Failed to send email to ${emailData.to}:`, error);
      return false;
    }
  }

  async sendOTPEmail({ email, otp, type }: OTPEmailData): Promise<boolean> {
    const subjects = {
      'sign-in': '로그인 인증 코드',
      'email-verification': '이메일 인증 코드', 
      'password-reset': '비밀번호 재설정 코드',
    };

    const typeDescriptions = {
      'sign-in': '로그인',
      'email-verification': '이메일 인증',
      'password-reset': '비밀번호 재설정',
    };

    const subject = subjects[type];
    const typeDesc = typeDescriptions[type];

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #f0f0f0;
              margin-bottom: 30px;
            }
            .otp-container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              letter-spacing: 8px;
              margin: 20px 0;
              padding: 15px;
              background: rgba(255,255,255,0.2);
              border-radius: 8px;
              border: 2px dashed rgba(255,255,255,0.5);
            }
            .info {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #007bff;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
              text-align: center;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 5px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔐 ${subject}</h1>
            <p>안전한 ${typeDesc}을 위한 인증 코드입니다</p>
          </div>
          
          <div class="otp-container">
            <h2>인증 코드</h2>
            <div class="otp-code">${otp}</div>
            <p>위 코드를 입력하여 ${typeDesc} 과정을 완료하세요</p>
          </div>
          
          <div class="info">
            <h3>📋 유의사항</h3>
            <ul>
              <li><strong>유효시간:</strong> 5분 (${new Date(Date.now() + 5 * 60 * 1000).toLocaleString('ko-KR')}까지)</li>
              <li><strong>입력 기회:</strong> 최대 3번</li>
              <li>코드는 한 번만 사용할 수 있습니다</li>
            </ul>
          </div>
          
          <div class="warning">
            <strong>⚠️ 보안 알림:</strong><br>
            이 코드를 다른 사람과 공유하지 마세요. 
            본인이 요청하지 않은 코드라면 무시하고 계정 보안을 확인해주세요.
          </div>
          
          <div class="footer">
            <p>이 이메일은 자동으로 발송되었습니다.</p>
            <p>문의사항이 있으시면 고객지원팀에 연락해주세요.</p>
            <small>Auth Server by Better Auth</small>
          </div>
        </body>
      </html>
    `;

    const text = `
      ${subject}
      
      안녕하세요!
      
      ${typeDesc}을 위한 인증 코드: ${otp}
      
      이 코드는 5분간 유효하며, 최대 3번까지 입력할 수 있습니다.
      코드를 다른 사람과 공유하지 마세요.
      
      본인이 요청하지 않은 코드라면 이 이메일을 무시하고 계정 보안을 확인해주세요.
      
      Auth Server
    `;

    return await this.sendEmail({
      to: email,
      subject,
      html,
      text,
    });
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.transporter !== null;
  }

  // 재연결 시도
  async reconnect(): Promise<boolean> {
    this.initializeTransporter();
    return this.isConnected();
  }
}

// 싱글톤 인스턴스
export const emailService = new EmailService();
export default emailService;