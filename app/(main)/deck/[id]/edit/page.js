'use client'
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "@/app/contexts/AuthProvider";
import DeckHeader from "@/app/components/DeckHeader";
import EditQuestion from "@/app/components/EditQuestion";
import CustomButton from "@/app/components/CustomButton";
import Tabs from '@/app/components/Tabs.jsx'
import {
    Sparkles,
    LoaderCircle
} from "lucide-react";

export default function DeckEdit({ params, children }) {
    // params has the id of the deck passed through the url
    // data is the data on the deck, the sections and correpsonding questions
    const [deckInfo, setDeckInfo] = useState({});
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(null);
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
                // console.log(`Deck info and modules retrieved: `, deck)

                if (deck.modules.length > 0) {
                    setActive(deck.modules[0].title);
                }
            } catch (error) {
                console.error('Failed fetching deck: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchDeckModules();
    }, [authFetch])

    const tabsObj = modules.reduce((accumulator, module) => {
        accumulator[module.title] = <Module module={module} loading={loading} />;
        return accumulator;
    }, {})

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
            { loading || !active ? (
                <div className="flex flex-col items-center gap-4 animate-spin">
                    <LoaderCircle size={24} className='text-accent animate-spin' />
                    <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Loading Content...
                    </p>
                </div>
            ) : (
                <Tabs 
                    tabsObj={tabsObj} 
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
                    {tabsObj[active]}
                </Tabs>
            )}
        </div>
    )
}

export function Module({ module, loading }) {

return (
    <div>
        {module.content.subtopics.map((subtopic) => {
            return (
                <div key={subtopic.title}>
                    <div className="flex flex-col gap-4 py-16 border-b border-divider-light dark:border-divider-dark">
                        <p className="font-medium text-xl text-text-primary-light dark:text-text-primary-dark ">
                            {loading ? 'Loading...' : subtopic.title}
                        </p>
                        <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            {loading ? 'Loading...' : subtopic.description}
                        </p>
                    </div>
                    <QuestionSection  
                        loading={loading}
                        mcq={subtopic.questions.mcq} 
                        trueFalse={subtopic.questions['true/false']} 
                        text={subtopic.questions.text}
                    />
                </div>
            )
        })}
    </div>
)
}

export function QuestionSection({ loading, mcq, trueFalse, text }) {

    return (
        <div>
            {loading ? ('Loading Multiple Choice...') : (
                mcq.map((question) => {
                    return (
                        <EditQuestion 
                            key={question.id} 
                            id={question.id} 
                            question={question.questionText} 
                            type={question.questionType}
                            answers={question.options}
                        />
                    )
                })
            )}
            {loading ? ('Loading True/False...') : (
                trueFalse.map((question) => {
                    return (
                        <EditQuestion
                            key={question.questionText} 
                            id={question.questionText} 
                            question={question.questionText} 
                            type={question.questionType}
                            answers={question.options}
                        />
                    )
                })
            )}
            {loading ? ('Loading Open Questions...') : (
                text.map((question) => {
                    return (
                        <EditQuestion
                            key={question.questionText} 
                            id={question.questionText} 
                            question={question.questionText} 
                            type={question.questionType}
                            answers={question.sampleAnswers}
                        />
                    )
                })
            )}
        </div>
    )
}