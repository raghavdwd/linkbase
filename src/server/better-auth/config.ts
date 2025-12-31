import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  // Use the actual site origin to keep OAuth state cookies scoped to the same host
  baseURL: env.AUTH_URL,
  // Explicitly set the API base path so callbacks match the configured GitHub URL
  basePath: "/api/auth",
  // Enable library logging to surface debug information in server logs
  logger: console,
  // Keep OAuth state in DB and relax cookie matching locally to avoid host/port mismatches
  account: {
    storeStateStrategy: "database",
    skipStateCookieCheck: env.NODE_ENV !== "production",
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.AUTH_URL}/api/auth/callback/github`,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
