import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
const API_BASE = `${BASE_URL}/api`;

async function testOTPAuthentication() {
  console.log('🔐 OTP Authentication Test Starting...\n');

  try {
    // 1. 활성 OTP 목록 조회
    console.log('1️⃣ Checking active OTPs...');
    const activeOTPs = await axios.get(`${API_BASE}/otp/active`);
    console.log('Active OTPs:', activeOTPs.data);
    console.log('✅ Active OTPs check completed\n');

    // 2. 만료된 OTP 정리
    console.log('2️⃣ Cleaning up expired OTPs...');
    const cleanup = await axios.delete(`${API_BASE}/otp/cleanup`);
    console.log('Cleanup result:', cleanup.data);
    console.log('✅ OTP cleanup completed\n');

    // 3. Better Auth OTP 전송 테스트 (실제 Better Auth 엔드포인트 사용)
    console.log('3️⃣ Testing Better Auth OTP send...');
    const testEmail = process.env.TEST_EMAIL || 'test@example.com';
    
    try {
      // Better Auth의 실제 OTP 전송 엔드포인트 사용
      const otpSend = await axios.post(`${BASE_URL}/auth/email-otp/send-otp`, {
        email: testEmail,
        type: 'sign-in'
      });
      console.log('OTP send result:', otpSend.data);
      console.log('✅ Better Auth OTP send completed\n');
    } catch (error: any) {
      console.log('Better Auth OTP endpoint response:', error.response?.data || error.message);
      
      // 더 자세한 엔드포인트 확인을 위해 다른 경로들도 시도
      console.log('🔍 Trying alternative Better Auth OTP endpoints...');
      
      const endpoints = [
        '/auth/send-otp',
        '/auth/otp/send',
        '/auth/email/send-otp',
      ];
      
      for (const endpoint of endpoints) {
        try {
          const response = await axios.post(`${BASE_URL}${endpoint}`, {
            email: testEmail
          });
          console.log(`✅ Found working endpoint ${endpoint}:`, response.data);
          break;
        } catch (endpointError: any) {
          console.log(`❌ ${endpoint}: ${endpointError.response?.status || endpointError.message}`);
        }
      }
      console.log('');
    }

    // 4. 커스텀 OTP 전송 테스트
    console.log('4️⃣ Testing custom OTP send endpoint...');
    try {
      const customOtpSend = await axios.post(`${API_BASE}/otp/send`, {
        email: testEmail
      });
      console.log('Custom OTP send result:', customOtpSend.data);
      console.log('✅ Custom OTP send completed\n');
    } catch (error: any) {
      console.log('Custom OTP send error:', error.response?.data || error.message);
    }

    // 5. 잘못된 OTP 검증 테스트
    console.log('5️⃣ Testing invalid OTP verification...');
    try {
      const invalidOtpVerify = await axios.post(`${API_BASE}/otp/verify`, {
        email: testEmail,
        otp: '123456'
      });
      console.log('Invalid OTP verification result:', invalidOtpVerify.data);
    } catch (error: any) {
      console.log('Expected error for invalid OTP:', error.response?.data);
      console.log('✅ Invalid OTP verification test completed\n');
    }

    // 6. 최종 활성 OTP 목록 확인
    console.log('6️⃣ Final active OTPs check...');
    const finalActiveOTPs = await axios.get(`${API_BASE}/otp/active`);
    console.log('Final active OTPs:', finalActiveOTPs.data);
    console.log('✅ Final OTP check completed\n');

    console.log('🎉 OTP Authentication Test Completed Successfully!');
    
  } catch (error: any) {
    console.error('❌ OTP Test Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
}

// 서버가 실행 중인지 확인
async function checkServerStatus() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('✅ Server is running:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server is not running. Please start the server with: npm start');
    return false;
  }
}

// 메인 실행
async function main() {
  console.log('🚀 Starting OTP Authentication Tests...\n');
  
  const serverRunning = await checkServerStatus();
  if (!serverRunning) {
    process.exit(1);
  }
  
  await testOTPAuthentication();
}

main();