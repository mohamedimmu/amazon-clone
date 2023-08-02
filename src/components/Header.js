import Image from "next/image";
import React from "react";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header>
      {/* Top Nav */}
      <div className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
        {/* Logo */}
        <div className="mt-2 flex items-center flex-grow md:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={112}
            height={50}
            alt="Amazon Logo"
            style={{ objectFit: "contain" }}
            className="cursor-pointer p-2"
          />
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center justify-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink flex rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 object-contain p-2.5" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>Hello Imran</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="link relative flex items-center">
            <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">3</span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2 ">Cart</p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm overflow-x-auto no-scrollbar">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link whitespace-nowrap">Prime Video</p>
        <p className="link whitespace-nowrap">Today&apos;s Deals</p>
        <p className="link whitespace-nowrap">Customer Service</p>
        <p className="link whitespace-nowrap">Registry</p>
        <p className="link whitespace-nowrap">Gift cards</p>
        <p className="link whitespace-nowrap">Sell</p>
        <p className="link whitespace-nowrap">Best Sellers</p>
        <p className="link whitespace-nowrap">Electronics</p>
        <p className="link whitespace-nowrap">New Releases</p>
      </div>
    </header>
  );
}
