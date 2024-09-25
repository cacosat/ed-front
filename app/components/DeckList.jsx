import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomButton from "./CustomButton.jsx"
import { 
    Play,
    Trash2
 } from "lucide-react";

export default function DeckList({props, children}){

    return(
        <>
            <DeckListEntry />
            <DeckListEntry />
            <DeckListEntry />
        </>
    )
}

function DeckListEntry({ deckInfo }){
    // Prop deck info should contain: title, description, tags.

    return (
        <div className="flex justify-between items-center p-4 gap-16 border-b border-divider-light dark:border-divider-dark">
            {/* General Container */}
            <div className="flex flex-col gap-3">
                <p className="font-medium text-base text-text-primary-light dark:text-text-primary-dark">
                    🌐 Deck Title
                </p>
                <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui dolore ipsa ipsam assumenda tempore quisquam ratione perferendis odio, quibusdam incidunt repellendus vero vel laudantium, nemo asperiores delectus obcaecati esse! Facere!
                </p>
                <div className="flex gap-2">
                    <Badge variant="outline" className='w-fit text-xxs font-normal'>Tag</Badge>
                    <Badge variant="outline" className='w-fit text-xxs font-normal'>Tag</Badge>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 justify-end">
                    {/* icons info */}
                </div>
                <div className="flex flex-col gap-2">
                    {/* button container */}
                    <div className="flex gap-2">
                        <CustomButton 
                            variant="soft"
                            frontIcon={<Trash2 size={16} strokeWidth={2} />}
                            text={false}
                        >
                        </CustomButton>
                        <CustomButton 
                            variant="soft"
                        >
                            Edit
                        </CustomButton>
                    </div>
                    <CustomButton 
                        variant={'solid'} 
                        frontIcon={<Play size={16} strokeWidth={2} />}
                    >
                        Test
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}