import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-1">
      <video
        controls
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="rounded-lg"
      ></video>

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
          <div className="flex items-center gap-2 rounded-xl bg-gray-800 p-2">
            <button>
              <FaRegThumbsUp />0
            </button>
            <button>
              <FaRegThumbsDown />0
            </button>
          </div>
          <div className="rounded-xl bg-gray-800 p-2">share</div>
          <div className="rounded-xl bg-gray-800 p-2">download</div>
        </div>
      </div>
    </div>
  );
}
