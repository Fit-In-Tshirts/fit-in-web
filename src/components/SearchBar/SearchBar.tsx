"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
// w-full max-w-md
  return (
    <div className="relative  w-full w-min-40 shrink">
      <Input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-4 pr-12 py-2 h-10 w-full rounded-full border border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm bg-[#efefef]"
      />
      <Button
        type="button"
        size="icon"
        className="absolute right-1 top-1 h-8 w-8 rounded-full hover:bg-gray-200 active:hover:bg-gray-300 text-muted-foreground bg-[#f6f6f8]"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
