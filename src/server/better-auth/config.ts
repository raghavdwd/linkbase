import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

import { env } from "~/env";
import * as schema from "~/server/db/schema";
import { db } from "../db";

const resend = new Resend(env.RESEND_API_KEY);

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
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.AUTH_URL}/api/auth/callback/github`,
    },
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET ?? "",
      redirectURI: `${env.AUTH_URL}/api/auth/callback/google`,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours (refresh token behavior)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // user console log as fallback if RESEND_API_KEY is not set
        console.log(`[AUTH] ${type} OTP for ${email}: ${otp}`);

        if (env.RESEND_API_KEY) {
          try {
            await resend.emails.send({
              from: "Linkbase <onboarding@resend.dev>",
              to: email,
              subject: `Verification Code: ${otp}`,
              html: `Your verification code is <strong>${otp}</strong>. It will expire in 5 minutes.`,
            });
          } catch (error) {
            console.error("failed to send otp email via resend", error);
          }
        }
      },
      overrideDefaultEmailVerification: true,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
