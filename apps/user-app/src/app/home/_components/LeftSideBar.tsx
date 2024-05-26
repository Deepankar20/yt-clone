"use client";
import { useState } from "react";
import { FaClock, FaHome, FaThumbsUp, FaUser } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";

function SubCard(props: any) {
  const { imageUrl, channelName } = props;
  return (
    <button className="flex items-center justify-center gap-3 text-xs">
      <img src={imageUrl} alt="" className="h-5 w-5 rounded-full" />
      {channelName}
    </button>
  );
}

export default function Page() {
  const [selected, setSelected] = useState("Home");
  return (
    <div className="w-1/7 flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-sm">
        <button
          className={`flex items-center gap-2 rounded-lg p-2 ${selected === "Home" ? "bg-gray-900" : ""}  hover:bg-gray-900`}
          onClick={() => setSelected("Home")}
        >
          <FaHome /> Home
        </button>

        <button
          className={`flex items-center gap-2 ${selected === "Subscription" ? "bg-gray-900" : ""} rounded-lg p-2 hover:bg-gray-900`}
          onClick={() => setSelected("Subscription")}
        >
          <FaYoutubeSquare /> Subscription
        </button>

        <hr />
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <button className="flex items-center gap-1 rounded-lg p-2 hover:bg-gray-900">
          <FaUser /> Your Channel
        </button>
        <button className="flex items-center gap-2  rounded-lg p-2 hover:bg-gray-900">
          <FaClock /> History
        </button>
        <button className="flex items-center gap-2  rounded-lg p-2 hover:bg-gray-900">
          <FaThumbsUp /> liked videos
        </button>
        <hr />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <h1 className="text-lg">Subscription</h1>
        <SubCard
          imageUrl={
            "https://yt3.googleusercontent.com/ITw9rjMp4Mmw0PJ02aXnuKWsjgZp78cztKZQq0WcarYO1SbmXqXgOglQml-DwdV7Fs_Fv9O8pw=s160-c-k-c0x00ffffff-no-rj"
          }
          channelName={"GrandLineReview"}
        />
        <SubCard
          imageUrl={
            "https://yt3.googleusercontent.com/ITw9rjMp4Mmw0PJ02aXnuKWsjgZp78cztKZQq0WcarYO1SbmXqXgOglQml-DwdV7Fs_Fv9O8pw=s160-c-k-c0x00ffffff-no-rj"
          }
          channelName={"GrandLineReview"}
        />
        <SubCard
          imageUrl={
            "https://yt3.googleusercontent.com/ITw9rjMp4Mmw0PJ02aXnuKWsjgZp78cztKZQq0WcarYO1SbmXqXgOglQml-DwdV7Fs_Fv9O8pw=s160-c-k-c0x00ffffff-no-rj"
          }
          channelName={"GrandLineReview"}
        />
        <SubCard
          imageUrl={
            "https://yt3.googleusercontent.com/ITw9rjMp4Mmw0PJ02aXnuKWsjgZp78cztKZQq0WcarYO1SbmXqXgOglQml-DwdV7Fs_Fv9O8pw=s160-c-k-c0x00ffffff-no-rj"
          }
          channelName={"GrandLineReview"}
        />
      </div>

      <div>explore</div>
    </div>
  );
}
