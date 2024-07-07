"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function Studio() {
  return (
    <div className="z-[1000] fixed top-0 w-full h-full">
      <NextStudio config={config} />
    </div>
  );
}
