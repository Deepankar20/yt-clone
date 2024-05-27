"use client";

import NavBar from "../_components/NavBar";
import LeftSideBar from "../_components/LeftSideBar";
import TagBar from "./_components/TagBar";
import VideoSection from "./_components/VideoSection";

export default function page() {
  return (
    <div className="flex flex-col bg-black text-white">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <div>
          <TagBar />
          <div className="max-h-[20px]">
            <VideoSection />
          </div>
        </div>
      </div>
    </div>
  );
}
