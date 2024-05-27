import React from "react";

export default function Page() {

  return (
    <div className="flex text-white">
      <img
        src="https://yt3.googleusercontent.com/H3djB_hVq1Ka1auGf5eCi-wUfwI-kctMW-skVqrXnJwAvqQxI8XSw_ErmyUMNEQmMIxcQgNhNGU=s160-c-k-c0x00ffffff-no-rj"
        alt=""
        className="rounded-full"
      />
      <div className="flex flex-col gap-2 ml-5">
        <div className="text-3xl font-bold">Piyush Garg</div>
        <div className="flex gap-2 text-xs text-gray-500">
          <div>130K Subscribers</div>
          <div>308 Videos</div>
        </div>
        <div>
          <button className="bg-white text-black rounded-xl p-1 text-sm">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
