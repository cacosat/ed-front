'use client'
import React from "react";
import { useState, useEffect, useRef } from "react";
import DeckHubHeader from "@/app/components/DeckHubHeader";
import EditQuestion from "@/app/components/EditQuestion";
import CustomButton from "@/app/components/CustomButton";
import Tabs from '@/app/components/Tabs.jsx'
import { Sparkles } from "lucide-react";

export default function DeckEdit({ params, data, children }) {
    // params has the id of the deck passed through the url
    // data is the data on the deck, the sections and correpsonding questions

    const tabs = {
        'First': (
            <div>
                {/* map over the deck data questions to generate questions */}
                <EditQuestion /> {/* TODO: add prop deck={data} */}
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
            </div>
        ), 
        'Second': (
            <div>
                second
            </div>
        ), 
        'Third': (
            <div>
                third
            </div>
        )
    }
    const [active, setActive] = useState(Object.keys(tabs)[0]);

    function renderTabContent(activeTab) {
        /*
        fetchDeck to get the user cards within the deck and render the tabs accordingly.
        Tabs will be correspondig to the "units" or "lessons" defined for the topic in the 
        construction of the deck, each containing a handful of questions.

        Map over the sections from the data fetched on the decks api endpoint for constructing
        the sections and then, inside of them, map over the questions each section has 
        producing the components for the specific questions.

        The flow is: 
        deck creation -> 'syllabus' like preview -> Save deck (button) -> cards generation
        */
        
        let tab = null;
        const data = {}; // object containing deck data

        // for (let tab in tabs) {
        //     tab 
        // }

        switch(activeTab){
            case 'first':
                tab = (
                    <div>
                        {/* map over the deck data questions to generate questions */}
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                        <EditQuestion deck={data} />
                    </div>
                )
                break;
            case 'second':
                tab = <div>
                    second
                </div>
                break;
            case 'third':
                tab = (
                    <div>
                        third
                    </div>
                )
                break;
            default:
                tab = (
                    <div>
                        error
                    </div>
                )
        }

        return tab
    }

    function handleAddQuestion(numOfQuestionsAdded) {
        /*
        Handling these means to Add a question to the deck, this will be allowed
        a limited number of times and will do a request to an AI API to generate 
        a new question based on the 'syllabus' like document, produced as a preview
        in the creation step, and the other questions/cards in the deck.
        */
       return null;
    }

    return (
        <div>
            <DeckHubHeader />
            <Tabs 
                tabsObj={tabs} 
                active={active}
                setActive={setActive}
            >
                <div className="w-full px-8 py-8 border-b border-divider-light dark:border-divider-dark">
                    <CustomButton
                        variant="soft"
                        frontIcon={<Sparkles size={16} />}
                        className='w-full'
                        // onClick={handleAddQuestion()}
                    >
                        Add Question
                    </CustomButton>
                </div>
                {renderTabContent(active)}
            </Tabs>
        </div>
    )
}