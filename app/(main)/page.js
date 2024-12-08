'use client'

import Image from "next/image";
import Link from "next/link";
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
  useState,
  useMemo
} from "react";
import { AuthContext } from "../contexts/AuthProvider";

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
        // console.log('Data in decks: ', data);
      } catch (error) {
        console.error('Failed fetching user decks data: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDecks();
  }, [authFetch])

  const groupedDecks = useMemo(() => {
    const sorted = decks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
      generating: sorted.filter((deck) => deck.status === 'generating'),
      preview: sorted.filter((deck) => deck.status === 'preview'),
      complete: sorted.filter((deck) => deck.status === 'complete')
    }
  }, [decks]);

  useEffect(() => {
    console.log('All Decks:', decks);
    console.log('Generating Decks:', groupedDecks.generating);
    console.log('Preview Decks:', groupedDecks.preview);
    console.log('Complete Decks:', groupedDecks.complete);
  }, [decks, groupedDecks]);

  const renderDeckList = () => {
    if (decks.length === 0) {
      return loading ? ( 
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <LoaderCircle size={24} className='text-accent animate-spin' />
            <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Loading Decks...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
              No decks available, create a new deck to start.
            </p>
            <Link href={'/deck/create'}>
              <CustomButton>
                New Deck
              </CustomButton>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div>
        {groupedDecks.generating.length > 0 && (
          <div>
            {groupedDecks.generating.map((deck) => (
              <DeckListEntry key={deck.id} deckInfo={deck} status={deck.status} />
            ))}
          </div>
        )}
        {groupedDecks.complete.length > 0 && (
          <div>
            {groupedDecks.complete.map((deck) => (
              <DeckListEntry key={deck.id} deckInfo={deck} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="flex flex-col gap-12">
      <section className="pt-12 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl">Decks / Library</h1>
          {/* <FilterButton /> */}
        </div>
        <section className="border-t border-divider-light dark:border-divider-dark">
          {/* Deck library */}
          {renderDeckList()}
          {/* {decks.length !== 0 ? ( 
            <div>
              <div>
                {
                  decks
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // sorts newest to oldest, descending
                  .filter((deck) => deck.status === 'generating')
                  .map((deck) => {
                    return <DeckListEntry key={deck.id} deckInfo={deck} status={deck.status} />
                  })
                }
              </div>
              <div>
                {
                  decks
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // sorts newest to oldest, descending
                  .filter((deck) => deck.status === 'complete')
                  .map((deck) => {
                    return <DeckListEntry key={deck.id} deckInfo={deck} />
                  })
                }
              </div>
            </div>
          ) : (
            <div>
              {loading ? ( 
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <div className="flex flex-col items-center gap-4">
                    <LoaderCircle size={24} className='text-accent animate-spin' />
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Loading Decks...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <div className="flex flex-col items-center gap-4">
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      No decks available, create a new deck to start.
                    </p>
                    <Link href={'/deck/create'}>
                      <CustomButton>
                        New Deck
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )} */}

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
