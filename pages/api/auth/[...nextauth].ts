import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from 'next-auth'
import { User } from "@prisma/client"

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
        
        if(!user) {
          throw new Error("Usuário e/ou senha incorretos!")
        }

        if(!user?.active) {
          throw new Error("Usuário não está ativo!")
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
    }
  }
}
export default NextAuth(authOptions)