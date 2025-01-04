import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: 'user' | 'admin';
    }
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'admin';
  }
}

export interface SignupCredentials {
  email: string;
  password: string;
}

export interface ApiResponse {
  message: string;
  userId?: string;
  errors?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}