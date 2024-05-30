"use client";

import { useRouter } from "next/navigation";
import TopBar from "./TopBar";

export default function page() {
  const router = useRouter();
  return (
    <div className="bg-black text-white">
      <div className="m-5 flex items-center justify-between">
        <div className="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzdG75dz4wRYlq4xBDciPhO7xgpuYyfDRVRuTZNUUEuQ&s"
            alt=""
            className="h-16 w-28 hover:cursor-pointer"
            onClick={() => router.push("/home")}
          />
        </div>
        <TopBar />
        <div>
          <button>
            <img
              src="https://us.123rf.com/450wm/tifani1/tifani11801/tifani1180100032/93016694-user-icon-vector-illustration-on-black-background.jpg"
              alt=""
              className="h-12 w-12 "
            />
          </button>
        </div>
      </div>
    </div>
  );
}
