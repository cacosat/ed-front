'use client'
import React from "react";
import { useState, useEffect, useRef } from "react";
import DeckHubHeader from "@/app/components/DeckHubHeader";
import EditQuestion from "@/app/components/EditQuestion";
import CustomButton from "@/app/components/CustomButton";
import { Sparkles } from "lucide-react";

export default function DeckEdit({ props, children, params }) {

    return (
        <div>
            <DeckHubHeader />
            <Tabs />
        </div>
    )
}

function Tabs() {
    const [active, setActive] = useState('first');
    const activeTabClasses = 'text-accent font-bold';
    const unactiveTabClasses = 'text-text-secondary-light dark:text-text-secondary-dark font-light';
    const tabs = ['first', 'second', 'third'];
    const tabRefs = useRef(tabs.map(() => React.createRef()));
    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        const activeTab = tabRefs.current[tabs.indexOf(active)].current;
        if (activeTab) {
            setIndicatorStyle({
                left: `${activeTab.offsetLeft}px`,
                width: `${activeTab.offsetWidth}px`
            });
        }
    }, [active]);

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

        switch(activeTab){
            case 'first':
                tab = (
                    <div>
                        {/* map over the deck data questions to generate questions */}
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
            <div className="relative">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            ref={tabRefs.current[index]}
                            onClick={() => setActive(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
                                active === tab ? activeTabClasses : unactiveTabClasses
                            }`}
                        >
                            {['First Section', 'Second Section', 'Third Section'][index]}
                        </button>
                    ))}
                </div>
                <span
                    className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-in-out"
                    style={indicatorStyle}
                />
            </div>
            <div>
                <div className="w-full px-8 py-8">
                    <CustomButton
                        variant="soft"
                        frontIcon={<Sparkles size={16} />}
                        className='w-full'
                        onClick={handleAddQuestion()}
                    >
                        Add Question
                    </CustomButton>
                </div>
                <div className="border-t border-divider-light dark:border-divider-dark">
                    {renderTabContent(active)}
                </div>
            </div>
        </div>
    )
}