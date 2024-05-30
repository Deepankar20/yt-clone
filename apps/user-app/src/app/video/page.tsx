"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import NavBar from "~/app/_components/NavBar";
import Sidebar from "./_components/Sidebar";
import Video from "./_components/Video";
import dynamic from "next/dynamic";

const DynamicVideo = dynamic(() => import("./_components/Video"), {
  ssr: false,
});

export default function page() {
  const videoId = useSearchParams().get("videoId");

  

  return (
    <div className="bg-black text-white">
      <NavBar />

      <div className="flex">
        <div className="w-5/6">
          <DynamicVideo />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
