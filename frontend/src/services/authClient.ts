/**
 * Authentication service client
 */

export interface User {
  id: number;
  email: string;
  username: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  username?: string;
  password: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

/**
 * Register a new user account
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }

  return response.json();
}

/**
 * Sign in with email/username and password
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return response.json();
}

/**
 * Sign out (client discards token)
 */
export async function logout(): Promise<void> {
  await fetch("/auth/logout", {
    method: "POST",
  });

  // Clear token from localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

/**
 * Get stored token
 */
export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Get stored user
 */
export function getUser(): User | null {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Store auth data
 */
export function storeAuth(authResponse: AuthResponse): void {
  localStorage.setItem("access_token", authResponse.access_token);
  localStorage.setItem("user", JSON.stringify(authResponse.user));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
