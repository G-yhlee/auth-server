import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

async function testBetterAuthEndpoints() {
  console.log('🔍 Better Auth Endpoints Discovery...\n');

  const commonEndpoints = [
    // Authentication endpoints
    '/auth/sign-in',
    '/auth/sign-up', 
    '/auth/sign-out',
    '/auth/session',
    
    // OAuth endpoints
    '/auth/google/signin',
    '/auth/google/callback',
    '/auth/github/signin',
    '/auth/github/callback',
    
    // Email OTP endpoints  
    '/auth/email-otp/send-otp',
    '/auth/email-otp/verify-otp',
    '/auth/email-otp/sign-in',
    '/auth/send-otp',
    '/auth/verify-otp',
    '/auth/otp/send',
    '/auth/otp/verify',
    
    // Anonymous endpoints
    '/auth/anonymous/sign-in',
  ];

  console.log('Testing Better Auth endpoints...\n');

  for (const endpoint of commonEndpoints) {
    try {
      // Try GET request first
      const getResponse = await axios.get(`${BASE_URL}${endpoint}`);
      console.log(`✅ GET ${endpoint}: ${getResponse.status} - ${JSON.stringify(getResponse.data).slice(0, 100)}...`);
    } catch (getError: any) {
      // If GET fails, try POST
      try {
        const postResponse = await axios.post(`${BASE_URL}${endpoint}`, {
          email: 'test@example.com'
        });
        console.log(`✅ POST ${endpoint}: ${postResponse.status} - ${JSON.stringify(postResponse.data).slice(0, 100)}...`);
      } catch (postError: any) {
        const status = postError.response?.status || 'NO_RESPONSE';
        const message = postError.response?.data?.message || postError.message;
        
        if (status === 404) {
          console.log(`❌ ${endpoint}: Not Found`);
        } else if (status === 400 || status === 401) {
          console.log(`🔸 ${endpoint}: Available but requires proper data (${status})`);
        } else {
          console.log(`⚠️ ${endpoint}: ${status} - ${message.slice(0, 50)}...`);
        }
      }
    }
  }

  // Test actual OTP send with email
  console.log('\n📧 Testing actual OTP send with different methods...\n');

  const testEmail = 'test@example.com';
  const otpMethods = [
    {
      endpoint: '/auth/email-otp/send-otp',
      payload: { email: testEmail, type: 'sign-in' }
    },
    {
      endpoint: '/auth/send-otp',
      payload: { email: testEmail }
    },
    {
      endpoint: '/auth/otp/send',
      payload: { email: testEmail }
    }
  ];

  for (const method of otpMethods) {
    try {
      const response = await axios.post(`${BASE_URL}${method.endpoint}`, method.payload);
      console.log(`✅ SUCCESS ${method.endpoint}:`, response.data);
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.log(`❌ ${method.endpoint} (${status}):`, data || error.message);
    }
  }

  console.log('\n🎯 Test completed!');
}

async function checkServerHealth() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('✅ Server is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server is not accessible');
    return false;
  }
}

async function main() {
  console.log('🚀 Better Auth Endpoints Testing...\n');
  
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    process.exit(1);
  }
  
  await testBetterAuthEndpoints();
}

main();