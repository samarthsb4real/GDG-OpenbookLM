"use client";
import { AcmeLogo } from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from "@heroui/navbar";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

export default function BackgroundBeamsDemo() {
  return (
    <div>
    <Navbar isBordered className="p-2 px-4">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"> 
      <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit" href="/">SpyderWeb</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/Dashboard">Get Started</Link>
        </NavbarItem>
      </NavbarContent>

      </Navbar>
      
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-2xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          SpyderWeb
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-md text-center relative z-10">
          SpyderWeb is a educational platform which learns on what you want to. just provide us the resources and we will provide you the best learning experience.
        </p>
      </div>
      <BackgroundBeams />
    </div>
    </div>
  );
}