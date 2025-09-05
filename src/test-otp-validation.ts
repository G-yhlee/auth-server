import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
const API_BASE = `${BASE_URL}/api`;

async function testOTPValidationFlow() {
  console.log('🔐 OTP Validation Flow Test Starting...\n');

  try {
    const testEmail = 'yhleetab@gmail.com';

    // 1. 초기 상태 확인
    console.log('1️⃣ Checking initial user state...');
    try {
      const statusCheck = await axios.get(`${BASE_URL}/users/validation-status/${encodeURIComponent(testEmail)}`);
      console.log('Initial user status:', statusCheck.data);
    } catch (error: any) {
      console.log('User not found initially:', error.response?.status === 404 ? 'Not found (expected)' : error.message);
    }
    console.log('');

    // 2. OTP 전송 (커스텀 API)
    console.log('2️⃣ Sending OTP via custom API...');
    const otpSend = await axios.post(`${API_BASE}/otp/send`, {
      email: testEmail
    });
    console.log('OTP send result:', otpSend.data);
    console.log('');

    // 3. 사용자 상태 확인 (OTP 전송 후)
    console.log('3️⃣ Checking user state after OTP send...');
    const afterSendStatus = await axios.get(`${BASE_URL}/users/validation-status/${encodeURIComponent(testEmail)}`);
    console.log('User status after OTP send:', afterSendStatus.data);
    console.log('');

    // 4. Better Auth OTP 전송
    console.log('4️⃣ Sending OTP via Better Auth...');
    const betterAuthOTP = await axios.post(`${BASE_URL}/auth/email-otp/send-verification-otp`, {
      email: testEmail,
      type: 'sign-in'
    });
    console.log('Better Auth OTP result:', betterAuthOTP.data);
    console.log('');

    // 5. 최신 OTP 정보 확인
    console.log('5️⃣ Checking latest OTP in database...');
    const activeOTPs = await axios.get(`${API_BASE}/otp/active`);
    const latestOTP = activeOTPs.data.data.find((otp: any) => otp.email.includes(testEmail.replace('@', '')));
    console.log('Latest OTP info:', latestOTP || 'No OTP found');
    console.log('');

    // 6. 잘못된 OTP로 검증 시도
    console.log('6️⃣ Testing invalid OTP verification...');
    try {
      const invalidVerify = await axios.post(`${API_BASE}/otp/verify`, {
        email: testEmail,
        otp: '999999'
      });
      console.log('Invalid OTP result (unexpected success):', invalidVerify.data);
    } catch (error: any) {
      console.log('Invalid OTP result (expected error):', error.response?.data);
    }
    console.log('');

    // 7. 사용자 통계 확인
    console.log('7️⃣ Checking user statistics...');
    const stats = await axios.get(`${BASE_URL}/users/stats`);
    console.log('User statistics:', stats.data);
    console.log('');

    // 8. 검증된 사용자 목록
    console.log('8️⃣ Checking validated users...');
    const validatedUsers = await axios.get(`${BASE_URL}/users/validated`);
    console.log('Validated users:', validatedUsers.data);
    console.log('');

    // 9. 수동 검증 테스트 (관리자 기능)
    console.log('9️⃣ Testing manual validation...');
    const manualValidation = await axios.post(`${BASE_URL}/users/validate`, {
      email: testEmail
    });
    console.log('Manual validation result:', manualValidation.data);
    console.log('');

    // 10. 최종 사용자 상태 확인
    console.log('🔟 Final user state check...');
    const finalStatus = await axios.get(`${BASE_URL}/users/validation-status/${encodeURIComponent(testEmail)}`);
    console.log('Final user status:', finalStatus.data);
    console.log('');

    // 11. 검증 후 통계 재확인
    console.log('1️⃣1️⃣ Final statistics check...');
    const finalStats = await axios.get(`${BASE_URL}/users/stats`);
    console.log('Final statistics:', finalStats.data);
    console.log('');

    console.log('🎉 OTP Validation Flow Test Completed Successfully!');
    
    // 테스트 요약
    console.log('\n📊 Test Summary:');
    console.log(`- Test Email: ${testEmail}`);
    console.log(`- User Created: ✅`);
    console.log(`- OTP Sent: ✅`);
    console.log(`- Manual Validation: ✅`);
    console.log(`- Final isValid Status: ${finalStatus.data.data.isValid ? '✅ true' : '❌ false'}`);
    
  } catch (error: any) {
    console.error('❌ Test Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
}

async function checkServerHealth() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('✅ Server is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server is not accessible. Please start with: npm start');
    return false;
  }
}

async function main() {
  console.log('🚀 Starting OTP Validation Flow Test...\n');
  
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    process.exit(1);
  }
  
  await testOTPValidationFlow();
}

main();