import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

async function testBetterAuthOTP() {
  console.log('🔐 Better Auth OTP Integration Test...\n');

  try {
    const testEmail = 'test@example.com';

    // 1. Better Auth가 제공하는 실제 OTP 엔드포인트 테스트
    console.log('1️⃣ Testing Better Auth Email OTP endpoints...');

    const otpEndpoints = [
      // Better Auth v1.3.8에서 제공하는 실제 엔드포인트들
      '/auth/email-otp/send-verification-otp',
      '/auth/email-otp/send-otp', 
      '/auth/email-otp/verify-otp',
      '/auth/send-verification-otp',
      '/auth/sign-in/email-otp',
    ];

    let workingEndpoint = null;
    
    for (const endpoint of otpEndpoints) {
      try {
        console.log(`\n🔍 Trying ${endpoint}...`);
        
        const response = await axios.post(`${BASE_URL}${endpoint}`, {
          email: testEmail,
          type: 'sign-in'
        });
        
        console.log(`✅ SUCCESS: ${endpoint}`, response.data);
        workingEndpoint = endpoint;
        break;
        
      } catch (error: any) {
        const status = error.response?.status;
        const data = error.response?.data;
        
        console.log(`❌ ${endpoint} (${status}): ${JSON.stringify(data || error.message).slice(0, 100)}...`);
      }
    }

    // 2. 만약 Better Auth 엔드포인트가 작동한다면 실제 OTP 검증까지 테스트
    if (workingEndpoint) {
      console.log(`\n2️⃣ Testing OTP verification with working endpoint: ${workingEndpoint}`);
      
      // 잘못된 OTP로 검증 테스트
      try {
        const verifyResponse = await axios.post(`${BASE_URL}${workingEndpoint.replace('send', 'verify')}`, {
          email: testEmail,
          otp: '123456'
        });
        console.log('✅ OTP verification response:', verifyResponse.data);
      } catch (verifyError: any) {
        console.log('❌ OTP verification (expected error):', verifyError.response?.data);
      }
    }

    // 3. 커스텀 OTP API도 함께 테스트
    console.log('\n3️⃣ Testing custom OTP API...');
    
    try {
      const customSend = await axios.post(`${BASE_URL}/api/otp/send`, {
        email: testEmail
      });
      console.log('✅ Custom OTP send:', customSend.data);
      
      // 잘못된 OTP 검증
      const customVerify = await axios.post(`${BASE_URL}/api/otp/verify`, {
        email: testEmail,
        otp: '999999'
      });
      console.log('✅ Custom OTP verify:', customVerify.data);
      
    } catch (customError: any) {
      console.log('❌ Custom OTP error:', customError.response?.data);
    }

    // 4. 활성 OTP 확인
    console.log('\n4️⃣ Checking active OTPs...');
    
    try {
      const activeOTPs = await axios.get(`${BASE_URL}/api/otp/active`);
      console.log('✅ Active OTPs:', activeOTPs.data);
    } catch (activeError: any) {
      console.log('❌ Active OTPs error:', activeError.response?.data);
    }

    console.log('\n🎉 Better Auth OTP Integration Test Complete!');

  } catch (error: any) {
    console.error('❌ Test Error:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting Better Auth OTP Integration Test...\n');
  
  // 서버 상태 확인
  try {
    const response = await axios.get(BASE_URL);
    console.log('✅ Server is running:', response.data);
  } catch (error) {
    console.error('❌ Server is not running. Please start with: npm start');
    process.exit(1);
  }
  
  await testBetterAuthOTP();
}

main();