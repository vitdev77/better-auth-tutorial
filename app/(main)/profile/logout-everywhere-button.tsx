"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    // TODO: Handle logout everywhere
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
