import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// @ts-ignore
import jsonwebtoken from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "./database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in with credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "John Doe",
        },
        surname: {
          label: "Surname",
          type: "text",
          placeholder: "John Doe",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
        country: {
          label: "Country",
          type: "text",
          placeholder: "",
        },
        birthday: {
          label: "Birthday",
          type: "text",
          placeholder: "",
        },
        image: {
          label: "Image",
          type: "image",
          placeholder: "",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials.email || !credentials.password) {
            return false;
          }

          const foundUser = await db.User.findOne({
            email: credentials.email,
            password: credentials.password,
          });

          if (foundUser) {
            // Any object returned will be saved in `user` property of the JWT
            return foundUser;
          } else {
            const newUser = await db.User.create({
              email: credentials.email,
              password: credentials.password,
              name: credentials.name,
              surname: credentials.surname,
              country: credentials.country,
              birthday: credentials.birthday,
              image: credentials.image,
            });
            return newUser;
          }
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 1000,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token, secret);
      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email;

      try {
        const data = await db.User.findOne({ email });

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...(data?.toJSON() || {}),
          },
        };

        return newSession;
      } catch (error) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        // Create user in database if it doesn't exist, or load it if it does.
        if (!user.email) return false;

        const userExists = await db.User.findOne({ email: user.email });

        if (!userExists) {
          await db.User.create({
            name: user?.name,
            surname: user?.surname,
            email: user?.email,
            image: user?.image,
            password: user?.password,
            country: user?.country,
            birthday: user?.birthday,
            image: user?.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session;
}
