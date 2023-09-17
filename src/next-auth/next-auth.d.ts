import "next-auth/jwt";
import { Session } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT { 
    login?: string | null | undefined; 
    access_token?: string | null | undefined;
  }
}
