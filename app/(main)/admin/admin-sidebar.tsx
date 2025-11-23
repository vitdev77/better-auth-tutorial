import Link from "next/link";
import * as React from "react";

const navItems = [
  { label: "Brands", link: "/admin/brands", icon: "" },
  { label: "Series", link: "/admin/series", icon: "" },
  { label: "Models", link: "/admin/models", icon: "" },
];

export default function AdminSidebar() {
  return (
    <div className="bg-card rounded-xl p-2">
      <ul className="flex flex-col gap-1">
        {navItems.map((item, key) => (
          <li key={key}>
            <Link
              className="hover:bg-muted flex w-full items-center gap-2 rounded-md p-2 text-left"
              href={item.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
