import * as React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect("/dashboard");

  return children;
}
