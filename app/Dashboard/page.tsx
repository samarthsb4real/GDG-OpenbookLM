"use client"
import { cn } from "@/lib/utils";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import NavbarMain from "@/components/Navbar";


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Track Progress",
    description: "See how far you've come and how far you have to go.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "/Track-Progress"
  },
  {
    title: "View Leaderboard",
    description: "Compete with others and see where you stand.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    link: "/Leaderboard"
  },
  {
    title: "Prepare for Quizzes",
    description: "Get ready to test your knowledge and skills.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    link: "/Quiz"
  },
  {
    title: "My Resources",
    description: "Access all your resources in one place.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    link: "/My-Resources"
  },
  {
    title: "Manage Profile",
    description: "Update your profile and preferences.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    link: "/Track-Progress" 
  }
];

export default function BentoGridDemo() {
  return (
    <div>
      <NavbarMain/>
    <div className="p-16">
      <span>
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
        Dashboard
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        A responsive grid layout for showcasing content in a clean and organized
        manner.
      </p>
      </span>
    <BentoGrid className="max-w-4xl mx-auto p-8">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          link={item.link}
        />
      ))}
    </BentoGrid>
    </div>
    </div>
  );
}