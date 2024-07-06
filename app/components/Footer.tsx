/* eslint-disable @next/next/no-img-element */
import React from "react";

const Footer = () => {
  return (
    <div className="mt-16">
      <div className="flex w-full flex-col justify-center items-center border-y border-gray-300 gap-6 px-6 py-5">
        <div className="flex gap-4 justify-center items-center">
          <a href="tel:0111111111">
            <img className="w-4 h-4" src="/phone.svg" alt="phone" />
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <img className="w-4 h-4" src="/instagram.svg" alt="instagram" />
          </a>
        </div>
        <div className="text-[15px] ">
          Delivery within 2–4 working days •
          <span className="font-bold cursor-pointer border-b p-0 border-black hover:border-0 hover:text-gray-500 ">
            {" "}
            More info
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full py-3 px-6">
        <div className="flex gap-2 w-full">
          <img className="w-[34px] h-6" src="/visa.svg" alt="visa" />
          <img className="w-[34px] h-6" src="/mastercard.svg" alt="visa" />
          <img className="w-[34px] h-6" src="/miza.svg" alt="visa" />
          <img className="w-[34px] h-6" src="/valu.svg" alt="visa" />
        </div>
        <div className="w-full flex justify-center">
          <img src="/footerlogo.svg" className="w-[116px]" alt="logo" />
        </div>
        <div className="w-full flex justify-end">
          <h1 className="text-[14px]  font-sans">© 2024, Allure_eg</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
