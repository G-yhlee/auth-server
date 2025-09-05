import axios from "axios";

const API_URL = "http://localhost:3333/api";

async function testAnonymousAuth() {
  try {
    console.log("Testing Anonymous Authentication...");
    
    const signInResponse = await axios.post(`${API_URL}/auth/sign-in/anonymous`, {});
    
    console.log("Anonymous sign-in successful!");
    console.log("Response:", signInResponse.data);
    
    const { session, user } = signInResponse.data;
    console.log("User ID:", user?.id);
    console.log("Session Token:", session?.token);
    
    const sessionResponse = await axios.get(`${API_URL}/auth/session`, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });
    
    console.log("Session verification successful!");
    console.log("Session data:", sessionResponse.data);
    
  } catch (error: any) {
    console.error("Error testing anonymous auth:", error.response?.data || error.message);
  }
}

testAnonymousAuth();