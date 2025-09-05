import { auth } from "./lib/auth";

export async function testOAuthLogin() {
  console.log("OAuth providers available:");
  console.log("- Google: http://localhost:3333/auth/sign-in/social/google");
  console.log("- GitHub: http://localhost:3333/auth/sign-in/social/github");
  console.log("- Anonymous: http://localhost:3333/auth/sign-in/anonymous");

  console.log("\nCallback URLs (configure in OAuth providers):");
  console.log("- Google: http://localhost:3333/auth/callback/google");
  console.log("- GitHub: http://localhost:3333/auth/callback/github");

  console.log("\nTo sign in programmatically:");
  console.log(`
    // Example client-side usage:
    const response = await fetch('http://localhost:3333/auth/sign-in/social/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callbackURL: '/dashboard'
      })
    });
    
    const data = await response.json();
    // This will return a redirect URL to Google's OAuth consent screen
    window.location.href = data.url;
  `);
}

if (require.main === module) {
  testOAuthLogin();
}
