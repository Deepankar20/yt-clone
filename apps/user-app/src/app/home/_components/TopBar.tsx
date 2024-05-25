import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {FaSearch} from "react-icons/fa"

export default function TopBar() {
  return (
    <div className="flex w-full max-w-sm items-center bg-black">
      <Input type="text" placeholder="Search" className="dark h-7 rounded-xl rounded-r-none active:border-none w-screen"/>
      <Button type="submit" className="dark h-7 bg-gray-700 rounded-xl rounded-l-none  text-white hover:bg-gray-600 "><FaSearch></FaSearch></Button>
    </div>
  )
}
