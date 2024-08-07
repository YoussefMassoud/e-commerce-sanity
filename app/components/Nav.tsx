/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartProduct from "./CartProduct";
import { useCart } from "@/context/cartContext";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "@/context/searchContext";

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
  const [cartOpen, setCartOpen] = useState(false);
  const { setSearch } = useSearch();

  return (
    <div className="flex flex-col z-50 lg:px-[40px] px-[24px] relative">
      <div className="border-b-2 border-gray-200 z-50">
        <div className="flex w-full justify-between text-xl py-2">
          <div className="lg:flex  lg:gap-3 lg:w-full hidden sm:hidden  ">
            <img src="/instagram.svg" alt="insta" className="w-4 " />
            <img className="w-4" src="/phone.svg" alt="insta" />
          </div>

          <Link href="/">
            <img
              src="/Logo.svg"
              width={"100px"}
              height={"100px"}
              className="lg:w-[100px]  sm:w-[80px] w-[55px] "
              alt="Logo"
            />
          </Link>
          <div className="flex w-full justify-end gap-5 items-center">
            <div className="flex items-center px-2">
              <CartProduct cartOpen={cartOpen} setCartOpen={setCartOpen} />
            </div>
            {/* Search start */}
            <div>
              <div className="input-wrapper ">
                <button className="icon">
                  <Search className="h-5 w-5 text-black" />
                </button>
                <input
                  placeholder=" Search.."
                  className="input"
                  name="text"
                  type="text"
                  onChange={(val) => setSearch(val.currentTarget.value)}
                />
              </div>
            </div>
            {/* Search start */}
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
