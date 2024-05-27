import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FaCross, FaCut, FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function TopBar() {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full max-w-sm items-center bg-black">
      <Input
        type="text"
        placeholder="Search"
        className="dark h-7 w-screen rounded-xl rounded-r-none active:border-none"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      {value && (
        <Button
          type="submit"
          className="dark h-7 rounded-l-none rounded-r-none bg-gray-950 text-white hover:bg-gray-900"
          onClick={() => setValue("")}
        >
          X
        </Button>
      )}
      <Button
        type="submit"
        className="dark h-7 rounded-xl rounded-l-none bg-gray-700  text-white hover:bg-gray-600 "
      >
        <FaSearch />
      </Button>
    </div>
  );
}
