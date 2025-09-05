import dotenv from 'dotenv';
dotenv.config();

import emailService from './lib/email';

async function testEmailService() {
  console.log('📧 Email Service Test Starting...\n');

  try {
    // 1. 이메일 서비스 연결 상태 확인
    console.log('1️⃣ Checking email service connection...');
    const isConnected = emailService.isConnected();
    console.log(`Email service connected: ${isConnected ? '✅ Yes' : '⚠️ No (Mock mode)'}`);
    console.log('');

    // 2. 환경변수 확인 (민감정보는 마스킹)
    console.log('2️⃣ Checking email configuration...');
    console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST || 'Not set'}`);
    console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT || 'Not set'}`);
    console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? process.env.EMAIL_USER.replace(/(.{3}).*(@.*)/, '$1***$2') : 'Not set'}`);
    console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-3) : 'Not set'}`);
    console.log(`EMAIL_FROM_NAME: ${process.env.EMAIL_FROM_NAME || 'Not set'}`);
    console.log('');

    // 3. OTP 이메일 전송 테스트 (여러 타입)
    const testEmail = process.env.TEST_EMAIL || 'test@example.com';
    
    console.log('3️⃣ Testing OTP email sending...');
    console.log(`Target email: ${testEmail}\n`);

    // Sign-in OTP 테스트
    console.log('📨 Testing sign-in OTP...');
    const signInResult = await emailService.sendOTPEmail({
      email: testEmail,
      otp: '123456',
      type: 'sign-in'
    });
    console.log(`Sign-in OTP result: ${signInResult ? '✅ Success' : '❌ Failed'}\n`);

    // Email verification OTP 테스트
    console.log('📨 Testing email verification OTP...');
    const verificationResult = await emailService.sendOTPEmail({
      email: testEmail,
      otp: '789012',
      type: 'email-verification'
    });
    console.log(`Email verification OTP result: ${verificationResult ? '✅ Success' : '❌ Failed'}\n`);

    // Password reset OTP 테스트
    console.log('📨 Testing password reset OTP...');
    const resetResult = await emailService.sendOTPEmail({
      email: testEmail,
      otp: '345678',
      type: 'password-reset'
    });
    console.log(`Password reset OTP result: ${resetResult ? '✅ Success' : '❌ Failed'}\n`);

    // 4. 재연결 테스트
    console.log('4️⃣ Testing reconnection...');
    const reconnectResult = await emailService.reconnect();
    console.log(`Reconnection result: ${reconnectResult ? '✅ Success' : '⚠️ Mock mode'}\n`);

    console.log('🎉 Email Service Test Completed!');
    
    if (!isConnected) {
      console.log('\n💡 설정 안내:');
      console.log('실제 이메일을 전송하려면 .env 파일에 다음 설정을 추가하세요:');
      console.log('');
      console.log('EMAIL_HOST=smtp.gmail.com');
      console.log('EMAIL_PORT=587');
      console.log('EMAIL_SECURE=false');
      console.log('EMAIL_USER=your_email@gmail.com');
      console.log('EMAIL_PASS=your_app_password_here');
      console.log('EMAIL_FROM_NAME=Auth Server');
      console.log('EMAIL_FROM_ADDRESS=your_email@gmail.com');
      console.log('TEST_EMAIL=test@example.com # 테스트용 이메일');
      console.log('');
      console.log('Gmail App Password 생성 방법:');
      console.log('1. Google 계정 > 보안 > 2단계 인증 활성화');
      console.log('2. 보안 > 앱 비밀번호 생성');
      console.log('3. 생성된 16자리 비밀번호를 EMAIL_PASS에 설정');
    }
    
  } catch (error: any) {
    console.error('❌ Email Service Test Error:', {
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    });
  }
}

// 메인 실행
testEmailService();