'use client'
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import DeckHeader from "@/app/components/DeckHeader";
import EditQuestion from "@/app/components/EditQuestion";
import CustomButton from "@/app/components/CustomButton";
import Tabs from '@/app/components/Tabs.jsx'
import { Sparkles } from "lucide-react";

export default function DeckEdit({ params, children }) {
    // params has the id of the deck passed through the url
    // data is the data on the deck, the sections and correpsonding questions
    const [deck, setDeck] = useState({});
    const [loading, setLoading] = useState(true);
    const { authFetch } = useContext(AuthContext)
    const deckId = params.id;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await authFetch(`${API_BASE_URL}/decks/${deckId}`)
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch deck (id: ${deckId}) from GET /api/decks/:deckId endpoint`);
                }

                const deck = await response.json();
                setDeck(deck);
                console.log(`Deck retrieved: `, deck.modules)
            } catch (error) {
                console.error('Failed fetching deck: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchDeck();
    }, [authFetch])

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
                title={'🌐 Deck Title'}
                description={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui dolore ipsa ipsam assumenda tempore quisquam ratione perferendis odio, quibusdam incidunt repellendus vero vel laudantium, nemo asperiores delectus obcaecati esse! Facere!'}
                className={'md:max-w-[75%]'}
            />
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
                {tabs[active]}
            </Tabs>
        </div>
    )
}