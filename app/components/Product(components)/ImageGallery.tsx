/* eslint-disable @next/next/no-img-element */
"use client";
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);
  const [active, setActive] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
    setActive(image);
  };

  // useEffect to automatically image on page load
  useEffect(() => {
    setActive(images[0]);
  }, [images]); // Run this effect whenever  images array changes

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any, index: number) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-lg bg-2 ${
              active === image
                ? "ring-4 ring-blue-400"
                : index === 0 && "ring-4 ring-blue-400"
            }`}
          >
            <img
              src={urlFor(image).url()}
              width={500}
              height={500}
              alt="photo"
              className="max-h-[120px] w-full object-cover object-center cursor-pointer lg:max-w-[350px]  max-w-[150px] "
              onClick={() => handleSmallImageClick(image)}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-2 lg:col-span-4">
        <img
          src={urlFor(bigImage).url()}
          alt="Photo"
          width={500}
          height={500}
          className="lg:max-h-[620px] 
          max-h-[500px] max-w-[350px] object-cover object-center"
          loading="lazy"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
