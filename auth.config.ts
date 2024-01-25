import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        console.log(credentials, "credentials");
        const user = {
          email: "john@gmail.com",
          password: "123456",
        };
        // if (validatedFields.success) {
        //   const { email, password } = validatedFields.data;

        //   const user = await getUserByEmail(email);
        //   if (!user || !user.password) return null;

        //   const passwordsMatch = await bcrypt.compare(password, user.password);

        //   if (passwordsMatch) return user;
        // }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
