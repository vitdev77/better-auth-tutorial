"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";
import { revokeSessions } from "@/lib/auth-client";
import { toast } from "sonner";
import { AUTH_DIR } from "@/lib/constants";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);

    const { error } = await revokeSessions();

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to log out eweryewere");
    } else {
      toast.success("Logged out from all devices");
      router.push(AUTH_DIR + "/sign-in");
    }
  }

  return (
    <LoadingButton
      variant="destructive"
      onClick={handleLogoutEverywhere}
      loading={loading}
      className="w-full"
    >
      Log out everywhere
    </LoadingButton>
  );
}
