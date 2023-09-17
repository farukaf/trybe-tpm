import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import authEvent from "../../../services/auth-event-service";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, session }) {   
      token.login = (profile as any)?.login || token.login || "";
      token.access_token = account?.access_token || token.access_token || "";  
      console.log({token})
      await authEvent.register(token, "login");
      return token;
    },
  },
};

export default NextAuth(authOptions);
