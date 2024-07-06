/* eslint-disable @next/next/no-img-element */
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
    <div className="flex flex-col z-50 lg:px-[40px] px-[24px] relative">
      <div className="border-b-2 border-gray-200 z-50">
        <div className="flex w-full justify-between text-xl py-2">
          <div className="flex gap-3 w-full">
            <img src="/instagram.svg" alt="insta" className="w-4" />
            <img className="w-4" src="/phone.svg" alt="insta" />
          </div>

          <Link href="/">
            <img
              src="/Logo.svg"
              width={"100px"}
              height={"100px"}
              className="lg:!w-[100px] w-[100px]"
              alt="Logo"
            />
          </Link>
          <div className="flex w-full justify-end gap-5 items-center">
            <div className="flex items-center gap-1">
              <img className="w-[20px] h-[20px]" src="/cart.svg" alt="cart" />
              {/** Cart items number */}
              <h1 className="text-gray-400 text-[14px] font-normal">{"0"}</h1>
            </div>
            <img className="w-[20px]" src="/search.svg" alt="search" />
            <h1 className="text-[15px] font-semibold">عربي</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 py-4 justify-center items-center border-b-2 border-gray-200 z-50">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              link.href === pathname
                ? "text-foreground"
                : " text-muted-foreground hover:text-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
