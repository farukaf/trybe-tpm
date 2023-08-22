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
      let userObj: any;
      userObj = token;
      console.log({
        token,
        user,
        profile,
        session
      });
      userObj.login = (profile as any)?.login || "";
      userObj.access_token = account?.access_token || "";
      authEvent.register(userObj, "login");
      return token;
    },
  },
};

export default NextAuth(authOptions);
