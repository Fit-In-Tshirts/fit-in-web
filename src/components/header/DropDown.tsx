'use client';

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import shirtIcon from '../../icons/shirt.svg'
import TshirtIcon from '../../icons/t-shirt.svg'
import ShortIcon from '../../icons/short.svg'
import TrouserIcon from '../../icons/trouser.svg'
import Ellipsis from '../../icons/ellipsis.svg'
import Image from "next/image";
import chevronDownIcon from '../../icons/chevron-down.svg'
import { useEffect, useState } from "react";

export default function DropDown() {
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null)

  const handleCategorySelection = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedCategory(e.currentTarget.id)
  }

  const clearCategorySelection = () => {
    setSelectedCategory(null);
  }

  useEffect(() => {
    console.log("selected: ", selectedCategory)
  }, [selectedCategory])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="border rounded-full border-neutral-300 hover:border-neutral-400">
          Select Category
          <Image src={chevronDownIcon} width={20} alt={"drop-down"} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem id="tshirt" onClick={handleCategorySelection}>
                <DropdownMenuShortcut>
                  <Image src={TshirtIcon} alt={"T-Shirt"} width={30}/>
                </DropdownMenuShortcut>
                T-Shirt
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem id="tshirt-design-1" onClick={handleCategorySelection}>Design 1</DropdownMenuItem>
                <DropdownMenuItem id="tshirt-design-2" onClick={handleCategorySelection}>Design 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem id="shirt" onClick={handleCategorySelection}>
                <DropdownMenuShortcut>
                  <Image src={shirtIcon} alt={"Shirt"} width={30} />
                </DropdownMenuShortcut>
                Shirt
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem id="shirt-design-1" onClick={handleCategorySelection}>Design 1</DropdownMenuItem>
                <DropdownMenuItem id="shirt-design-2" onClick={handleCategorySelection}>Design 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem id="short" onClick={handleCategorySelection}>
                <DropdownMenuShortcut>
                  <Image src={ShortIcon} alt={"Short"} width={30} />
                </DropdownMenuShortcut>
                Shorts
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem id="short-design-1" onClick={handleCategorySelection}>Design 1</DropdownMenuItem>
                <DropdownMenuItem id="short-design-1" onClick={handleCategorySelection}>Design 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem id="trouser" onClick={handleCategorySelection}>
                <DropdownMenuShortcut>
                  <Image src={TrouserIcon} alt={"Trousers"} width={30}/>
                </DropdownMenuShortcut>
                Trousers
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem id="trouser-design-1" onClick={handleCategorySelection}>Design 1</DropdownMenuItem>
                <DropdownMenuItem id="trouser-design-2" onClick={handleCategorySelection}>Design 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuItem id="other" onClick={handleCategorySelection}>
                <DropdownMenuShortcut>
                  <Image src={Ellipsis} alt={"More"} width={30} />
                </DropdownMenuShortcut>
                Others
              </DropdownMenuItem>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem id="other-design-1" onClick={handleCategorySelection}>Design 1</DropdownMenuItem>
                <DropdownMenuItem id="other-design-2" onClick={handleCategorySelection}>Design 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem className="flex justify-center items-center hover:bg-blue-100 focus:bg-blue-100" onClick={clearCategorySelection}>
            Clear selection
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}