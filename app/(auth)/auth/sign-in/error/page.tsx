import { ReturnButton } from "@/components/return-button";
import { AUTH_DIR } from "@/lib/constants";
import { CircleAlert } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <div className="container mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center space-y-8 px-8 py-16 text-center">
      <ReturnButton
        href={AUTH_DIR + "/sign-in"}
        label="Sign in"
        btnVariant={"link"}
      />

      <div className="flex flex-col items-center space-y-4">
        <CircleAlert className="stroke-destructive size-30" />

        <h1 className="text-destructive text-2xl font-bold">Login Error</h1>

        <p className="text-muted-foreground">
          {sp.error === "account_not_linked"
            ? "This account is already linked to another sign-in method."
            : "Oops! Something went wrong. Please try again."}
        </p>
      </div>
    </div>
  );
}
