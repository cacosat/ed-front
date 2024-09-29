'use client'

import React from "react";
import { useState, useEffect } from "react";
import { InfoCard } from "@/app/components/Card";
import Tabs from "@/app/components/Tabs";
import CustomButton from "@/app/components/CustomButton";

export default function DeckCreate({ children }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted', event.target)
        // handle submit of deck creation form
    }
    const tabs = {
        'Description': (
            <div className="flex flex-col gap-16 py-16">
                <InfoCard>
                    <p>Provide a <span className="text-accent font-medium">detailed description of what you want to be the deck's main topic</span>. This should be primarily focused on the topic you want, but for better results try and also describe the broader field or area in which it is placed.</p>
                </InfoCard>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-16">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="deckDescription" className="text-sm font-medium text-gray-700">Deck Description</label>
                                <textarea id="deckDescription" type="text" className="border rounded-md p-2" placeholder="Enter deck description"></textarea>
                            </div>
                            <div className="flex flex-col gap-4 mt-4">
                                <label htmlFor="deckKeyWords" className="text-sm font-medium text-gray-700">Deck KeyWords</label>
                                <input id="deckKeyWords" className="border rounded-md p-2" rows="4" placeholder="Enter deck key words"></input>
                            </div>
                            <input />
                            <input />
                            <CustomButton className={'w-fit'}>
                                Submit
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        ), 
        'Preview': (
            <div>
                preview
            </div>
        ), 
    }
    const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0])

    return (
        <div>
            
            <Tabs
                tabsObj={tabs}
                active={activeTab}
                setActive={setActiveTab}
            >
                {tabs[activeTab]}
            </Tabs>
        </div>
    )
}