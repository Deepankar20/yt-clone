import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function TopBar() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Explore..." className="dark"/>
      <Button type="submit" className="dark">search</Button>
    </div>
  )
}
