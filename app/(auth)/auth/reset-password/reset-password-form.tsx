"use client";

import * as React from "react";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPassword } from "@/lib/auth-client";
import { AUTH_DIR } from "@/lib/constants";

const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  async function onSubmit({ newPassword }: ResetPasswordValues) {
    setSuccess(null);
    setError(null);

    const { error } = await resetPassword({
      newPassword,
      token,
    });

    if (error) {
      setError(error.message || "Something went wrong");
    } else {
      setSuccess("Password has been reset. You can sign in now.");
      setTimeout(() => router.push(AUTH_DIR + "/sign-in"), 3000);
      form.reset();
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {success && (
              <div role="status" className="text-sm text-green-600">
                {success}
              </div>
            )}
            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <LoadingButton type="submit" className="w-full" loading={loading}>
              Reset password
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
