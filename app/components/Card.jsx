import React from "react";
import { 
    CircleCheckBig,
    Flag,
    CircleX,
    Info
 } from "lucide-react";
import CustomButton from "./CustomButton";

export function AnswerCard({
    extraClasses = '',
    type,
    status = 'neutral', // determines card status ('acitve', 'error', 'neutral')
    isCorrect = false,
    answer,
    explanation,
}){
    const baseClasses = `flex flex-col justify-center p-4 bg-background-card-light dark:bg-background-card-dark text-text-primary-light dark:text-text-primary-second rounded-lg`
    const statusClasses = {
        neutral: 'border border-stroke-light-light dark:border-stroke-dark-light text-accent',
        active: 'border-2 border-accent',
        error: 'border-2 border-text-red'
    }

    return (
        <div className={`${extraClasses} ${baseClasses} ${statusClasses[status]}`}
        >
            {/* 
            Icon / Title / Answer (MCQ and True/False)
            Explanation
            Report error button
            */}
            <div className="flex flex-col justify-between h-full gap-4 text-sm">
                <div className={`flex gap-8 justify-between items-center ${type === 'text' ? ' font-normal text-sm' : 'font-medium text-base'}`}>
                    <div className={` text-text-primary-light dark:text-text-primary-dark ${status === 'active' ? '!text-accent ' : status === 'error' ? '!text-text-red' : ''}`}>
                        {answer}
                    </div>
                    { type !== 'text' ? (
                        <div className={``}>
                            {isCorrect ? (
                                <CircleCheckBig size={18} strokeWidth={2} className="text-accent"/>
                            ) : (
                                status === 'error' ? <CircleX size={18} className="text-text-red" /> : null
                            )}
                        </div>
                    ) : (null)}
                </div>
                {type === 'text' ? (null) : (
                    <div className="text-text-secondary-light dark:text-text-secondary-dark font-light p-4 border-l-2 border-accent bg-background-accent-soft rounded-r-lg">
                        <p><span className="font-medium text-accent">Explanation: </span>{explanation}</p>
                    </div>
                )}
                <div className="flex justify-end">
                    <CustomButton 
                        variant="softError"
                        className={``}
                        frontIcon={<Flag size={16} />}
                    >
                        Report
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export function BaseCard({ className, children }){

    return (
        <div className={`p-4 bg-background-card-light dark:bg-background-card-dark 
        text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-second 
        rounded-lg 
        border border-stroke-light-light dark:border-stroke-dark-light
        ${className}`}>
            {children}
        </div>
    )
}

export function InfoCard({ className, children }){

    return (
        <BaseCard className={`flex gap-4 items-center text-sm ${className}`}>
            <CustomButton
                variant="softDisabled"
                text={false}
                frontIcon={<Info size={16} />}
            ></CustomButton>
            <div className="text-text-secondary-light dark:text-text-secondary-dark font-light flex items-center">
                {children}
            </div>
        </BaseCard>
    )
}

export function DifficultyCard({
    extraClasses,
    active = false, 
    difficulty,
    description,
    onClick,
}){
    const baseClasses = `p-8 bg-background-card-light dark:bg-background-card-dark text-text-primary-light dark:text-text-primary-second rounded-lg cursor-pointer`
    const borderClasses = active 
        ? 'border-2 border-accent' 
        : 'border-2 border-transparent'
    const transitionClasses = 'transition-colors'

    const difficultyIcon = {
        Easy: (
            active ? (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.59961 38.4V36M19.1996 38.4V28.8" stroke="#E8490C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.93262 38.4V36M19.5326 38.4V28.8" stroke="#61646B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        ),
        Medium: (
            active ? (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.59961 38.4V36M19.1996 38.4V28.8M28.7996 38.4V19.2" stroke="#E8490C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.59961 38.4V36M19.1996 38.4V28.8M28.7996 38.4V19.2" stroke="#61646B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        ),
        Hard: (
            active ? (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.59961 38.4001V36.0001M19.1996 38.4001V28.8001M28.7996 38.4001V19.2001M38.3996 38.4001V9.6001" stroke="#E8490C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2656 38.4001V36.0001M19.8656 38.4001V28.8001M29.4656 38.4001V19.2001M39.0656 38.4001V9.6001" stroke="#61646B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        )
    }

    return (
        <div 
            className={`${extraClasses} ${baseClasses} ${borderClasses} ${transitionClasses}`}
            onClick={onClick}
        >
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className={`w-full flex justify-end transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
                    <CircleCheckBig size={18} strokeWidth={2} className="text-accent"/>
                </div>
                {difficultyIcon[difficulty]}
                <div className="flex flex-col items-center gap-1">
                    <div className={`text-base transition-colors duration-300 ${active ? 'text-accent' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
                        {difficulty}
                    </div>
                    <div className={`text-center text-xs font-light transition-colors duration-300 ${active ? 'text-accent-light' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}