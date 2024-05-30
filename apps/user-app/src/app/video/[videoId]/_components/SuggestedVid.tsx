import React from "react";

export default function Page(props: any) {
  const { title, channelName, views, time, thumbnailUrl } = props;

  return (
    <div className="p-2 flex gap-2">
      <img src={thumbnailUrl} alt="" className="w-2/6 rounded-lg"/>
      <div className="flex flex-col gap-1 w-2/3 ">
        <p>{title}</p>
        <p className="text-sm text-gray-400">{channelName}</p>
        <div className="flex gap-2 text-xs text-gray-400">
          <p>{views} views</p>
          <p>{time} ago</p>
        </div>
      </div>
    </div>
  );
}
