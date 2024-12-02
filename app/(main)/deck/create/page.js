'use client'

import React from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { InfoCard, DifficultyCard } from "@/app/components/Card";
import { AuthContext } from "@/app/contexts/AuthProvider";
import {
    CircleCheck,
    Trash2,
    LoaderCircle
} from "lucide-react";
import Tabs from "@/app/components/Tabs";
import CustomButton from "@/app/components/CustomButton";
import DeckHeader from "@/app/components/DeckHeader";
import { BaseCard } from "@/app/components/Card";

export default function DeckCreate({ children }) {
    const [loading, setLoading] = useState('false');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState({});
    const [activeTab, setActiveTab] = useState('Description');
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [activeDifficulty, setActiveDifficulty] = useState('medium');
    const [previewData, setPreviewData] = useState(null);
    const [deckId, setDeckId] = useState(null);
    const [created, setCreated] = useState(false);
    const [previewEnabled, setIsPreviewEnabled] = useState(false);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { authFetch } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (created) {
            router.push('/')
        }
    }, [created])

    useEffect(() => {
        // handle loading timer
        let intervalId;
        if (loading === true) {
            intervalId = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 100); // Update every 100ms instead of 1000ms
        } else {
            setElapsedTime(0);
        }
        
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [loading]);

    const handlekeywordsChange = (e) => {
        setKeywords(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDifficultyChange = (difficulty) => {
        setActiveDifficulty(difficulty);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!keywords || !description) {
            alert('Description and keywords are required, please fill all necessary fields.')
            return;
        }

        setLoading(true);
        
        try {
            const keywordsArray = keywords.split(',').map((word) => word.trim()).filter((word) => word === '');

            const reqBody = {
                description: description,
                keywords: keywords,
                difficulty: activeDifficulty
            }
            
            // change tab
            setIsPreviewEnabled(true);
            setActiveTab('Preview');

            const response = await authFetch(`${API_BASE_URL}/decks/syllabus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            });

            if (!response.ok) { 
                throw new Error(`Request error, status: ${response.status}`)
            }

            const data = await response.json();

            setPreviewData(data);
            setDeckId(data.deckId);
        } catch (error) {
            console.error('Failed form submition to create syllabus: ', {
                error: error,
                keywords: keywords,
                description: description
            })
            alert(`Failed form submission with error: ${error}`)
        } finally {
            setLoading(false);
        }
    }

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        
        if (!deckId) {
            alert("Can't create deck right now, the full preview must be available first.")
            return;
        }

        try {
            const response = await authFetch(`${API_BASE_URL}/decks/${deckId}/create`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Request failed to create deck with status: ${response.status}`)
            }

            const data = response.json();

            if (data.ok) {
                setCreated(true);
            }

            alert("Deck created succesfully, now you'll be redirected to the home page.")
        } catch (error) {
            console.error('Failed request to create deck from frontend: ', error)
        }
    }

    const tabs = {
        'Description': (
            <div className="flex flex-col gap-12 py-12">
                <InfoCard>
                    <p>Provide a <span className="text-accent font-medium">detailed description of what you want to be the deck's main topic</span>. This should be primarily focused on the topic you want, but for better results try and also describe the broader field or area in which it is placed.</p>
                </InfoCard>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-12">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">What do you want to learn about?<span className="text-accent">*</span></label>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Here you should provide the main focus and context to be considered for the cards in the deck.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <textarea
                                        id="deckDescription"
                                        className={`placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light 
                                        text-sm border ${description ? 'border-accent' : 'border-stroke-light-gray dark:border-stroke-dark-gray'} outline-none focus:border-accent dark:focus:border-accent ${description ? 'bg-background-card-light dark:bg-background-card-dark' : 'bg-background-light dark:bg-background-dark'} dark:focus:bg-background-card-dark rounded-lg p-2 transition-all`}
                                        placeholder="I'd like to create a deck about the evolution of the Homo lineage, basically how we got from early human ancestors to modern Homo sapiens. I'm interested in exploring topics like different species in the Homo genus, how they lived, their tools, and how they interacted with the environment..."
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        rows={'6'}
                                    ></textarea>
                                    <p className="self-end text-text-secondary-light dark:text-text-secondary-dark text-xs font-extralight">{`${description.length}/3000`}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">Key Words<span className="text-accent">*</span></label>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">These will be used to guide the contents of the deck. Write words separated by commas as shown in the example.</p>
                                </div>
                                <input 
                                    id="deckkeywords" 
                                    className={`placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light 
                                        text-sm border ${keywords ? 'border-accent' : 'border-stroke-light-gray dark:border-stroke-dark-gray'} outline-none focus:border-accent dark:focus:border-accent ${keywords ? 'bg-background-card-light dark:bg-background-card-dark' : 'bg-background-light dark:bg-background-dark'} dark:focus:bg-background-card-dark rounded-lg p-2 transition-all`}
                                    rows="4" 
                                    value={keywords}
                                    onChange={handlekeywordsChange}
                                    placeholder="Homo sapiens, evolution, philosophy..."
                                ></input>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">Select a difficulty</label>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">This will determine how hard is your deck.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-8">
                                    <DifficultyCard
                                        extraClasses={'w-full'}
                                        active={activeDifficulty === 'easy'}
                                        onClick={() => handleDifficultyChange('easy')}
                                        difficulty={'Easy'}
                                        description={'For Beginners'}
                                    />
                                    <DifficultyCard
                                        extraClasses={'w-full'}
                                        active={activeDifficulty === 'medium'}
                                        onClick={() => handleDifficultyChange('medium')}
                                        difficulty={'Medium'}
                                        description={'Recommended'}
                                    />
                                    <DifficultyCard
                                        extraClasses={'w-full'}
                                        active={activeDifficulty === 'hard'}
                                        onClick={() => handleDifficultyChange('hard')}
                                        difficulty={'Hard'}
                                        description={'Test your knowledge'}
                                    />
                                </div>
                            </div>
                            <CustomButton className={'w-fit'}>
                                Submit
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        ), 
        'Preview': (
            <div className="flex flex-col gap-12 py-12">
                {/* <InfoCard>
                    <p>The following is a brief overview of how the deck will be structured, <span className="text-accent font-medium">review the different topics and subtopics to be covered, and then accept or discard the deck</span>.</p>
                </InfoCard> */}
                <div>
                    {loading ? (
                        <div className="flex flex-col items-center gap-4">
                            <LoaderCircle size={24} className='text-accent animate-spin' />
                            <p className="font-normal text-sm text-center text-text-secondary-light dark:text-text-secondary-dark">
                                Creating deck preview, it can take up to a few minutes.
                                <br />
                                {Math.floor(elapsedTime / 600)}:{String(Math.floor((elapsedTime % 600) / 10)).padStart(2, '0')}.{String(elapsedTime % 10)}
                            </p>
                        </div>
                    ) : previewData ? (
                        <div className="flex flex-col gap-8">
                            <InfoCard>
                                <p>The following is a brief overview of how the deck will be structured, <span className="text-accent font-medium">review the different topics and subtopics to be covered, and then accept or discard the deck</span>.</p>
                            </InfoCard>
                            <DeckHeader
                                title={previewData.preview.content.title || '🌐 Deck Title'}
                                description={previewData.preview.content.explanation || 'Description'}
                                className={'pt-0'}
                            />
                            {previewData.preview.content.content.breakdown.map((module) => {
                                return (
                                    <div className="flex flex-col gap-2 py-8 border-t border-divider-light dark:border-divider-dark " key={module.module.title}>
                                        <div className="flex flex-col gap-4 py-8 ">
                                            <p className="font-medium text-xl text-text-primary-light dark:text-text-primary-dark ">
                                                {module.module.title}
                                            </p>
                                            <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                {module.module.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 pb-8 px-4 ">
                                            {module.subtopics.map((subtopic) => {
                                                return (
                                                    <BaseCard className={`flex flex-col gap-2`} key={subtopic.title}>
                                                        <p className="font-normal text-sm text-text-primary-light dark:text-text-primary-dark">
                                                            {subtopic.title}
                                                        </p>
                                                        <p className="font-light text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                            {subtopic.description}
                                                        </p>
                                                    </BaseCard>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <form onSubmit={handleCreateSubmit}> 
                                <div className="flex gap-2">
                                    <CustomButton
                                        className={'w-full'}
                                        variant="solid"
                                        frontIcon={<CircleCheck size={16} />}
                                    >
                                        Create Deck
                                    </CustomButton>
                                    <CustomButton
                                        className={'w-full'}
                                        variant="softError"
                                        frontIcon={<Trash2 size={16} />}
                                    >
                                        Delete preview
                                    </CustomButton>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <p>Submit the form to see the preview</p>
                    )}
                </div>
            </div>
        ), 
    }

    return (
        <div>
            <div className="flex flex-col gap-4 py-12">
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                    Create your own deck
                </p>
                <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui dolore ipsa ipsam assumenda tempore quisquam ratione perferendis odio, quibusdam incidunt repellendus vero vel laudantium, nemo asperiores delectus obcaecati esse! Facere!
                </p>
            </div>
            <Tabs
                tabsObj={tabs}
                active={activeTab}
                setActive={(tab) => {
                    if (tab === 'Preview' && !previewEnabled) {
                        return; // Prevent switching to Preview if not enabled
                    }
                    setActiveTab(tab);
                }}
                disabledTabs={previewEnabled ? [] : ['Preview']}
            >
                {tabs[activeTab]}
            </Tabs>
        </div>
    )
}