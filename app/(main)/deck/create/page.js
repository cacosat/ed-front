'use client'

import React from "react";
import { useState, useEffect, useContext } from "react";
import { InfoCard, DifficultyCard } from "@/app/components/Card";
import { AuthContext } from "@/app/contexts/AuthProvider";
import Tabs from "@/app/components/Tabs";
import CustomButton from "@/app/components/CustomButton";
import DeckHeader from "@/app/components/DeckHeader";
import { BaseCard } from "@/app/components/Card";

export default function DeckCreate({ children }) {
    const [loading, setLoading] = useState('false');
    const [activeTab, setActiveTab] = useState('Description')
    const [keywords, setKeywords] = useState('');
    const [description, setDescription] = useState('');
    const [activeDifficulty, setActiveDifficulty] = useState('medium');
    const [previewData, setPreviewData] = useState(null);
    const [previewEnabled, setIsPreviewEnabled] = useState(false);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { authFetch } = useContext(AuthContext);

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

            console.log('Body for the request: ', reqBody)

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
            console.log('Success: ', data);

            setPreviewData(data);
            setIsPreviewEnabled(true);
            setActiveTab('Preview')
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
        /* 
        POST req to /api/decks/syllabus with body:
        {
            "description": "...",
            "keywords": ["", "", ""],
            "difficulty": "medium"
        }
        */
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
                <InfoCard>
                    <p>The following is a brief overview of how the deck will be structured, <span className="text-accent font-medium">review the different topics and subtopics to be covered, and then accept or discard the deck</span>.</p>
                </InfoCard>
                <div>
                    {loading ? (
                        <div className="flex justify-center items-center p-12">
                            <p>Loading preview...</p>
                        </div>
                    ) : previewData ? (
                        <div className="border-b border-divider-light dark:border-divider-dark">
                            <DeckHeader
                                title={previewData.preview.content.title || '🌐 Deck Title'}
                                description={previewData.preview.content.explanation || 'Description'}
                                className={'pt-0'}
                            />
                            {previewData.preview.content.content.breakdown.map((module) => {
                                return (
                                    <div className="flex flex-col gap-2 py-8 border-t border-divider-light dark:border-divider-dark">
                                        <div className="flex flex-col gap-4 py-8 ">
                                            <p className="font-medium text-xl text-text-primary-light dark:text-text-primary-dark ">
                                                {module.module.title}
                                            </p>
                                            <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                {module.module.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2 pb-8 ">
                                            {module.subtopics.map((subtopic) => {
                                                return (
                                                    <BaseCard className={`flex flex-col gap-2`}>
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