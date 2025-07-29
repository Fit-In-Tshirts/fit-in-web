import { SearchBar } from "../SearchBar/SearchBar";
import logo from "../../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import DropDown from "./DropDown";
import { Button } from "../ui/button";
import OrderTrackingIcon from '../../icons/tracking.png'
import CartIcon from '../../icons/shopping-cart.png'
import UserIcon from '../../icons/user.svg'

export default function Header() {
  return (
    <div  className="h-14 flex flex-row justify-between items-center bg-[#f6f6f8]">
      <div className="flex flex-row items-center pr-5 grow-1">
        <Link href={"/"} className="pl-5 pr-5"> <Image alt="Fit-In-Tshirt" width={50} src={logo} /></Link>
        <div className="flex flex-row gap-3">
          <DropDown />
          <Button variant="secondary" className="px-4 border rounded-full border-neutral-300 hover:border-neutral-400">
            Track order
            <Image src={OrderTrackingIcon} alt={"order-tracking"} width={20} />
          </Button>
        </div>
      </div>
      <div className="px-5 grow-2">
        <SearchBar />
      </div>
      <div className="flex felx-row items-center justify-around w-auto px-5 grow-1">
        <Button variant='secondary' className="border border-neutral-300 hover:border-neutral-400"> Cart <Image src={CartIcon} alt={"Shopping cart"} width={25} /> </Button>
        <Button variant="link"> About Us </Button>
        <Button variant="secondary" size='lg' className="border border-neutral-400 hover:bg-neutral-300 hover:border-neutral-300 rounded-full p-2"> <Image src={UserIcon} alt={"User"} /> </Button>
      </div>
    </div>
  )
}