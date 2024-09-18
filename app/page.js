import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <section className="pt-12">
        <div class="flex justify-between items-center">
          <h1 className="font-medium text-xl">Decks / Library</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-button-soft px-4 py-2 rounded-lg">
              <SlidersHorizontal className="w-4 text-orange-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Tag #1</DropdownMenuItem>
              <DropdownMenuItem>Tag #2</DropdownMenuItem>
              <DropdownMenuItem>Tag #3</DropdownMenuItem>
              <DropdownMenuItem>...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <footer className="flex items-center justify-center">
        <p>Footer</p>
      </footer>
    </main>
  );
}
