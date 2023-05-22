import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID || "",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "",
    })
  ],
  callbacks: {
    async jwt({ token }: any) {
      token.userRole = "admin"
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/newUser'
  }
}

export default NextAuth(authOptions)