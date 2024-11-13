'use client'

import Image from "next/image";
import { LoaderCircle, Play, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomButton from "../components/CustomButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeckList, DeckListEntry } from "../components/DeckList";
import {
  useContext,
  useEffect,
  useState
} from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useContext(AuthContext);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchUserDecks = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/decks/`); // options isn't specified because default method is GET

        if (!response.ok) {
          throw new Error('Failed the request to the GET /api/decks/ endpoint')
        }

        const data = await response.json();
        setDecks(data.decks);
        console.log('Data in decks: ', data);
      } catch (error) {
        console.error('Failed fetching user decks data: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDecks();
  }, [authFetch])


  return (
    <main className="flex flex-col gap-12">
      <section className="pt-12 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl">Decks / Library</h1>
          {/* <FilterButton /> */}
        </div>
        <section className="border-t border-divider-light dark:border-divider-dark">
          {/* Deck library */}
          {decks ? ( 
            decks.map((deck) => {
              return <DeckListEntry key={deck.id} deckInfo={deck} />
            })
          ) : (
            <div>
              {/* <DeckList /> */}
              {loading && ( 
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <div className="flex flex-col items-center gap-4">
                    <LoaderCircle size={24} className='text-accent animate-spin' />
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Loading Decks...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </section>
      </section>
      <footer className="flex items-center justify-center">
        <p>Footer</p>
      </footer>
    </main>
  );
}

// function FilterButton({props}) {

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <CustomButton
//           variant="soft"
//           text={false}
//           frontIcon={<SlidersHorizontal className="w-4 text-orange-600" />}
//         />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="">
//         <DropdownMenuLabel>Filters</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Tag #1</DropdownMenuItem>
//         <DropdownMenuItem>Tag #2</DropdownMenuItem>
//         <DropdownMenuItem>Tag #3</DropdownMenuItem>
//         <DropdownMenuItem>...</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
