"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Sale",
    href: "/sale",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-center  mx-14  lg:max-24 border-b border-gray-400 items-center ">
        <div className="flex text-center  text-xl py-4">
          <img src="/Logo.svg" width={"60px"} height={"60px"} />
        </div>
      </div>
      <div className="flex flex-row gap-4 py-4 border-b border-gray-400 justify-center items-center ">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              link.href === pathname
                ? "text-foreground  "
                : " text-muted-foreground hover:text-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
