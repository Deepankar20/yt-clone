import { useState } from "react";

export default function page() {
  const arr = [
    { name: "All" },
    { name: "New to you" },
    { name: "live" },
    { name: "Ai" },
    { name: "APIs" },
    { name: "Computer Programming" },
  ];
  const [selected, setSelected] = useState("All");
  return (
    <div>
      <div className="ml-9 flex gap-2 text-black">
        {arr.map((tag, i) => {
          return (
            <button
              className={`rounded-sm py-1 pl-2 pr-2 text-xs ${selected === tag.name ? "bg-white text-black " : "bg-gray-700 text-white"}`}
              onClick={() => setSelected(tag.name)}
              key={i}
            >
              <div>{tag.name}</div>
            </button>
          );
          
        })}
      </div>
    </div>
  );
}
