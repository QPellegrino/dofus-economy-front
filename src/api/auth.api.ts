import {
    LoginDto,
    RegisterDto,
    AuthResponse,
  } from "../types/auth.types";
  
  const API = "http://localhost:3000/auth";
  
  export async function login(
    data: LoginDto
  ): Promise<AuthResponse> {
    const res = await fetch(`${API}/login`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Login failed");
    }
  
    return res.json();
  }
  
  export async function register(
    data: RegisterDto
  ): Promise<AuthResponse> {
    const res = await fetch(`${API}/register`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Register failed");
    }
  
    return res.json();
  }