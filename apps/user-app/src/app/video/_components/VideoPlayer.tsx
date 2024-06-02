import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src }: any) => {
  const videoRef = useRef(null);
  let hls = null;

  useEffect(() => {
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      //@ts-ignore
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //@ts-ignore
        videoRef.current.play();
      });
      //@ts-ignore
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      //@ts-ignore
      videoRef.current.src = src;
      //@ts-ignore
      videoRef.current.addEventListener("loadedmetadata", () => {

      });
    }
  }, [src]);

  return (
    <div className="h-full w-full">
      <video ref={videoRef} controls className="video-js vjs-default-skin w-full h-full"  />
    </div>
  );
};

export default VideoPlayer;
