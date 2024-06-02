import React, { useRef } from "react";
import {
  FaDownload,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaShare,
} from "react-icons/fa";

import VideoPlayer from "./VideoPlayer";
import videojs from "video.js";

export default function Page() {
  const playerRef = useRef(null);
  const videoLink =
    "https://d9bskl3ph7fg2.cloudfront.net/hls/BB_7df87ab2-b553-4c30-a78b-901d3e4c7300_preview.mp4/index.m3u8";
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <div className="flex flex-col gap-2 p-1">
      <VideoPlayer src={videoLink} />

      <p>Title</p>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/ITw9rjMp4Mmw0PJ02aXnuKWsjgZp78cztKZQq0WcarYO1SbmXqXgOglQml-DwdV7Fs_Fv9O8pw=s160-c-k-c0x00ffffff-no-rj"
            alt=""
            className="w-10 rounded-full"
          />
          <div>
            <p>Channel Name</p>
            <p className="text-xs text-gray-500">subscribers</p>
          </div>
          <button className="rounded-xl bg-gray-800 p-2">Subscribe</button>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-5 rounded-xl bg-gray-800 p-2">
            <button className="flex items-center gap-1">
              <FaRegThumbsUp />0
            </button>
            <button className="flex items-center gap-1">
              <FaRegThumbsDown />0
            </button>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-gray-800 p-2">
            Share
            <FaShare />
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-gray-800 p-2">
            Download <FaDownload />
          </div>
        </div>
      </div>
    </div>
  );
}
