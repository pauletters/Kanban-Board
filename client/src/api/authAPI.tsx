import { UserLogin } from "../interfaces/UserLogin";

// Login function that sends a POST request to the /api/auth/login endpoint.
// It returns the token if the request is successful.
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    
    if (!response.ok) {
      throw new Error('Login Failed');
    }

    const data = await response.json();
    return data.token;
} catch (error) {
  console.error('Login error:', error);
  throw error;
  }
};

export { login };
