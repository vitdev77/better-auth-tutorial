import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
  btnVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const ReturnButton = ({
  href,
  label,
  btnVariant,
}: ReturnButtonProps) => {
  return (
    <Button size="sm" variant={btnVariant} asChild tabIndex={-1}>
      <Link href={href}>
        <ArrowLeftIcon /> {label}
      </Link>
    </Button>
  );
};
