import { SidebarTrigger } from "../ui/sidebar";

export default function AdminHeader() {
  return (
    <div className="flex flex-row w-full h-10 justify-start items-center bg-neutral-100">
      <SidebarTrigger className="m-2" />
      <h1>Current page {'>'} Sub section </h1>
    </div>
  )
}