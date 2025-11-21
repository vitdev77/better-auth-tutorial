import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getServerSession = cache(async () => {
  console.log("getServerSession");

  return await auth.api.getSession({
    headers: await headers(),
  });
});
