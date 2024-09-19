import React from "react";
import { Badge } from "@/components/ui/badge";

export default function DeckList({props, children}){

    return(
        <DeckListEntry />
    )
}

function DeckListEntry({ props }){

    return (
        <div className="flex justify-between items-center p-4 gap-16">
            {/* General Container */}
            <div className="max-w-[450px] flex flex-col gap-3">
                <p className="font-medium text-base text-gray-200">
                    🌐 Deck Title
                </p>
                <p className="font-light text-sm text-gray-400">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui dolore ipsa ipsam assumenda tempore quisquam ratione perferendis odio, quibusdam incidunt repellendus vero vel laudantium, nemo asperiores delectus obcaecati esse! Facere!
                </p>
                <div className="flex gap-2">
                    <Badge variant="outline" className='w-fit text-xxs font-normal'>Tag</Badge>
                    <Badge variant="outline" className='w-fit text-xxs font-normal'>Tag</Badge>
                </div>
            </div>
            <div>
                Deck buttons
            </div>
        </div>
    )
}