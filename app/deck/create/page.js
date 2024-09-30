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
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">What do you want to learn about?<span className="text-accent">*</span></label>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">This will be the main information provided to the model as part of the request and context to generate the cards for the deck.</p>
                                </div>
                                <textarea 
                                    id="deckDescription" 
                                    className="placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light text-sm border border-stroke-light-gray dark:border-stroke-dark-gray focus:outline-none focus:border-accent dark:focus:border-accent bg-background-light focus:bg-background-card-light dark:bg-background-dark dark:focus:bg-background-card-dark  rounded-lg p-2 transition-all" 
                                    placeholder="I'd like to create a deck about the evolution of the Homo lineage, basically how we got from early human ancestors to modern Homo sapiens. I'm interested in exploring topics like different species in the Homo genus, how they lived, their tools, and how they interacted with the environment..."
                                    rows={'6'}
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">Key Words<span className="text-accent">*</span></label>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">These will be used to guide the generation of the decks.</p>
                                </div>
                                <input 
                                    id="deckKeyWords" 
                                    className="placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light text-sm border border-stroke-light-gray dark:border-stroke-dark-gray focus:outline-none focus:border-accent dark:focus:border-accent bg-background-light focus:bg-background-card-light dark:bg-background-dark dark:focus:bg-background-card-dark  rounded-lg p-2 transition-all" 
                                    rows="4" 
                                    placeholder="Homo sapiens, evolution, philosophy..."
                                ></input>
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