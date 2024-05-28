import React, { useState } from "react";

export default function Page() {
  const arr = ["Home", "Videos", "Live Stream", "Playlists"];
  const [selected, setSelected] = useState("Home");
  return (
    <div>
      <div className="flex gap-4 text-sm font-semibold text-gray-500">
        {arr.map((el, i) => {
          return (
            <button
              className={`${selected === el ? "text-white" : ""}`}
              key={i}
              onClick={() => setSelected(el)}
            >
              {el}
            </button>
          );
        })}
      </div>
      <br />
      <hr />

      <h1 className="text-xl mt-1">For You</h1>
    </div>
  );
}
