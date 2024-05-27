"use client";

import LeftSideBar from "~/app/_components/LeftSideBar";
import NavBar from "~/app/_components/NavBar";
import ChannelBanner from "../_components/ChannelBanner";
import ChannelDetails from "../_components/ChannelDetails";
import ChannelMain from "../_components/ChannelMain";

export default function page({ params }: { params: { channelId: Number } }) {
  const channelId = params.channelId;

  return (
    <div className="flex flex-col bg-black text-white">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <div className="ml-[10rem] flex flex-col gap-3">
          <ChannelBanner />
          <ChannelDetails />
          <ChannelMain />
        </div>
      </div>
    </div>
  );
}
