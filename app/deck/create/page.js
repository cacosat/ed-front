'use client'

import React from "react";
import { useState, useEffect } from "react";
import { InfoCard, DifficultyCard } from "@/app/components/Card";
import Tabs from "@/app/components/Tabs";
import CustomButton from "@/app/components/CustomButton";
import DeckHeader from "@/app/components/DeckHeader";

export default function DeckCreate({ children }) {
    const [keyWords, setKeyWords] = useState('');
    const [description, setDescription] = useState('');
    const [activeDifficulty, setActiveDifficulty] = useState('medium');

    const handleKeyWordsChange = (e) => {
        console.log(keyWords)
        setKeyWords(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        console.log(description)
        setDescription(e.target.value)
    }

    const handleDifficultyChange = (difficulty) => {
        console.log(difficulty);
        setActiveDifficulty(difficulty);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted', event.target)
        // handle submit of deck creation form
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
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">These will be used to guide the generation of the deck.</p>
                                </div>
                                <input 
                                    id="deckKeyWords" 
                                    className={`placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light 
                                        text-sm border ${keyWords ? 'border-accent' : 'border-stroke-light-gray dark:border-stroke-dark-gray'} outline-none focus:border-accent dark:focus:border-accent ${keyWords ? 'bg-background-card-light dark:bg-background-card-dark' : 'bg-background-light dark:bg-background-dark'} dark:focus:bg-background-card-dark rounded-lg p-2 transition-all`}
                                    rows="4" 
                                    value={keyWords}
                                    onChange={handleKeyWordsChange}
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
                    <p>The following is a brief overview of how the deck will be structured, <span className="text-accent font-medium">review the different topics to be covered, adjust them if needed and then accept or discard the deck</span>. You'll only be able to request up to 3 regeneration of the sections shown below.</p>
                </InfoCard>
                <div>
                    <DeckHeader 
                        title={'🌐 Deck Title'}
                        description={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui dolore ipsa ipsam assumenda tempore quisquam ratione perferendis odio, quibusdam incidunt repellendus vero vel laudantium, nemo asperiores delectus obcaecati esse! Facere!'}
                        className={'md:max-w-[75%] !p-0'}
                    />
                </div>
            </div>
        ), 
    }
    const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0])

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
                setActive={setActiveTab}
            >
                {tabs[activeTab]}
            </Tabs>
        </div>
    )
}