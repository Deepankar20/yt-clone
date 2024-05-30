import React from "react";
import SuggestedVid from "./SuggestedVid";
import dynamic from "next/dynamic";

export default function Page() {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <div className="w-2/5 flex flex-col gap-3">
      {arr.map((video, i) => {
        return (
          <div key={i}>
            <SuggestedVid
              title={"You're Wrong About Don Krieg (Let Me Explain)"}
              thumbnailUrl={
                "https://i.ytimg.com/vi/Xbh17zb5oOs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBw-7SCDkXkCWm9kRco-kToUE8lVA"
              }
              views={"14K"}
              time={"1 hour"}
              channelName={"GrandLineReview"}
            />
          </div>
        );
      })}
    </div>
  );
}
