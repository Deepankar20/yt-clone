"use client";

import LeftSideBar from "./_components/LeftSideBar";
import NavBar from "./_components/NavBar";
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
          <VideoSection />
        </div>
      </div>
    </div>
  );
}
