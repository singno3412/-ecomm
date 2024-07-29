import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import connection from '@/utils/db';

const promise = connection.promise();

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.ClientID as string,
      clientSecret: process.env.ClientSecret as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('https://melivecode.com/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const response = await res.json();
        if (response.status === 'ok') {
          return response.user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) {
          console.error('No email found in user object:', user);
          return false;
        }

        // Check if user already exists in the database
        const [rows] = await promise.query(
          'SELECT * FROM users WHERE email = ?',
          [user.email]
        );
        if (rows.length > 0) {
          // User already exists
          user.id = rows[0].id; // Assign the user id
          return true;
        } else {
          // Create new user
          const name = user.name || 'Anonymous'; // Use 'Anonymous' if name is null or undefined
          const [result] = await promise.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, user.email]
          );
          user.id = result.insertId; // Assign the new user id
          return true;
        }
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Add user ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session
      if (token.id) {
        session.user.id = token.id;
      }
      // console.log('Current session:', session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
