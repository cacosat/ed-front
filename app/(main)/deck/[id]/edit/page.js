'use client'
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "@/app/contexts/AuthProvider";
import DeckHeader from "@/app/components/DeckHeader";
import EditQuestion from "@/app/components/EditQuestion";
import CustomButton from "@/app/components/CustomButton";
import Tabs from '@/app/components/Tabs.jsx'
import { Sparkles } from "lucide-react";

export default function DeckEdit({ params, children }) {
    // params has the id of the deck passed through the url
    // data is the data on the deck, the sections and correpsonding questions
    const [deckInfo, setDeckInfo] = useState({});
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, initializingAuth, authFetch } = useContext(AuthContext);
    const deckId = params.id;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    

    useEffect(() => {
        const fetchDeckModules = async () => {
            try {
                const modulesResponse = await authFetch(`${API_BASE_URL}/decks/${deckId}`)
                
                if (!modulesResponse.ok) {
                    throw new Error(`Failed to fetch deck (id: ${deckId}) from GET /api/decks/:deckId endpoint`);
                }
                
                const deck = await modulesResponse.json();
                setDeckInfo(deck.deckInfo);
                setModules(deck.modules);
                console.log(`Deck info and modules retrieved: `, deck)
            } catch (error) {
                console.error('Failed fetching deck: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchDeckModules();
    }, [authFetch])

    let tab = {};
    const tabsObj = modules.map((module) => {

    })

    const tabs = {
        'Understanding the Football Industry Landscape': (
            <div>
                {/* map over the deck data questions to generate questions */}
                <div className="flex flex-col gap-4 py-12 border-b border-divider-light dark:border-divider-dark">
                    <p className="font-medium text-xl text-text-primary-light dark:text-text-primary-dark ">
                        {loading ? 'Section 1' : modules[0].content.subtopics[0].title}
                    </p>
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {loading ? 'Section 1' : modules[0].content.subtopics[0].description}
                    </p>
                </div>
                <EditQuestion /> {/* TODO: add prop deck={data} */}
                <EditQuestion /> {/* modules[0].content.subtopics[0].description.questions.mcq||text||true/false gives an array of questions */}
                <EditQuestion /> 
                <EditQuestion />
                <EditQuestion />
                <div className="flex flex-col gap-4 py-12 border-b border-divider-light dark:border-divider-dark">
                    <p className="font-medium text-xl text-text-primary-light dark:text-text-primary-dark ">
                        {loading ? 'Section 2' : modules[0].content.subtopics[1].title}
                    </p>
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {loading ? 'Section 2' : modules[0].content.subtopics[1].description}
                    </p>
                </div>
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
                <EditQuestion />
            </div>
        ), 
        'Football Economics and Finance': (
            <div>
                second
            </div>
        ), 
        'Branding and Marketing in Football': (
            <div>
                third
            </div>
        )
    }
    const [active, setActive] = useState(Object.keys(tabs)[0]);

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
            <DeckHeader 
                title={deckInfo.title}
                description={deckInfo.description}
                loading={loading}
                // className={'md:max-w-[75%]'}
            />
            <Tabs 
                tabsObj={tabs} 
                active={active}
                setActive={setActive}
            >
                <div className="w-full px-8 ">
                    {/* <CustomButton
                        variant="soft"
                        frontIcon={<Sparkles size={16} />}
                        className='w-full'
                        // onClick={handleAddQuestion()}
                    >
                        Add Question
                    </CustomButton> */}
                </div>
                {tabs[active]}
            </Tabs>
        </div>
    )
}