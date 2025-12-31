"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "~/server/better-auth/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

/**
 * handling OTP verification logic and UI
 * @returns OTP input form component
 */
function VerifyEmailContent() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (error) {
        toast.error(error.message ?? "Invalid or expired OTP");
      } else {
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return;
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      toast.success("A new verification code has been sent!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-muted/50 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            Verify your email
          </CardTitle>
          <CardDescription>
            We&apos;ve sent a verification code to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleVerify} className="grid gap-4">
            <div className="grid gap-2 text-center">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                className="text-center text-2xl tracking-[1em]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-destructive text-center text-sm">{error}</p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
          <div className="text-muted-foreground text-center text-sm">
            Didn&apos;t receive a code?{" "}
            <button
              onClick={resendOtp}
              className="text-primary hover:cursor-pointer hover:underline"
            >
              Resend code
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * rendering verify email page with OTP input and suspense boundary
 * @returns verify email page component
 */
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
