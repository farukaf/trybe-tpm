import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import authEvent from "../../../services/auth-event-service"

export const authOptions: NextAuthOptions = {  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      authEvent.register(token, "login");
      return token
    },
  },
}

export default NextAuth(authOptions)
