import { useState } from "react";

export default function page() {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="grid grid-cols-4">
      {arr.map(() => {
        return (
          <VideoCard
            videoTitle={
              "We Are BLOCKED!❌ KALKI Looks EPIC! || Men of Culture 130"
            }
            channelName={"Harkirat Singh"}
            views={"40k"}
            time={"4 hours"}
            thumbnailUrl={
              "https://i.ytimg.com/vi/_Eg9cqOvPV8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDqVcxYceMG-kjH15hsdu9RYI3Kpw"
            }
            channelUrl={
              "https://yt3.ggpht.com/ytc/AIdro_k7J8-LWCa5QLDnY3x9kaArgJoSSMory4hgkYSBOFgvEg=s68-c-k-c0x00ffffff-no-rj"
            }
          />
        );
      })}
    </div>
  );
}

const VideoCard = (props: any) => {
  const { videoTitle, channelName, thumbnailUrl, channelUrl, views, time } =
    props;
  return (
    <div>
      <div className="flex h-[15vw] w-[23vw] flex-col p-8 m-7">
        <img src={thumbnailUrl} alt="" className="rounded-sm" />
        <div className="relative bottom-5 left-2 text-xs">28:20</div>
        <div className="flex items-center gap-3">
          <img
            src={channelUrl}
            alt=""
            className="h-5 w-5 rounded-full"
          />
          <div className="flex flex-col">
            <div className="text-sm">{videoTitle}</div>
            <div className="text-xs text-gray-400">{channelName}</div>
            <div className="flex gap-2">
              <span className="text-xs text-gray-400">{views} views</span>
              <span className="text-xs text-gray-400">{time} ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
