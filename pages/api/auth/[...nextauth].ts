import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await fetch(`${process.env.API_URL}/api/users/signin`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        }).then(res => res.json())
  
        if(!user || !user?.active) {
          return null
        }
        
        return user
      },
    })
  ],
  secret: process.env.SECRET,
  jwt: {
    // maxAge: 60 * 60 * 24 * 30,
    secret: process.env.JWT_SECRET
  },
  callbacks: {
    async signIn({ user }: any) {
      if(user.email) return user
      
      return false
    },
    async jwt({ token, user }: any) {
      if(user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }: any) {
      if(token) {
        session.id = token.id
      }

      return session
    }
  },
}
export default NextAuth(authOptions)