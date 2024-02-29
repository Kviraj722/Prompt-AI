import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { custom } from "openid-client";

custom.setHttpOptionsDefaults({
  timeout: 10000,
});
export const maxDuration = 10000
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (e) {
        console.log("Error while signIn", e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
