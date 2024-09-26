import React from "react";
import DeckHubHeader from "@/app/components/DeckHubHeader";

export default function DeckEdit({ props, children, params }) {

    return (
        <div>
            <DeckHubHeader />
            {`Deck Create -> id: ${params.id}`}
            <div>
                Tabs
            </div>
        </div>
    )
}