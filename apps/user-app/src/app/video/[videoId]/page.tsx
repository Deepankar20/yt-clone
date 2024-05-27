"use client";
import { useSearchParams } from "next/navigation";

export default function page({ params }: { params: { videoId: Number } }) {
  const videoId = params.videoId;
  console.log(videoId);

  return <div></div>;
}
