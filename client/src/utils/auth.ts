import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // This decodes the token and returns the payload
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;    
  }

// This checks if a valid token exists
  loggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // This checks if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

// This retrieves the token from local storage
  getToken(): string | null{
    return localStorage.getItem('id_token');
  }

// This stores the token in local storage and redirects to the home page
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // This removes the token from local storage and redirects to the login page
  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
