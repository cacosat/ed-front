import React from "react";
import { 
    FileQuestion,
    Heart
 } from "lucide-react";

export default function DeckHeader({ title, description, className }){
    const numOfQuestions = 10;

    return (
        <div className={`flex flex-col gap-4 py-12 ${className}`}>
            <div className="flex gap-4 justify-start items-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {/* icons: questions and heart */}
                <div className="flex gap-[2px] items-center">
                    <FileQuestion className="" size={16} strokeWidth={2} />
                    {numOfQuestions}
                </div>
                <div className="flex gap-[2px] items-center">
                    <Heart className="" size={16} strokeWidth={2} />
                </div>    
            </div>
            <div className={`flex flex-col gap-2`}>
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                    {title}
                </p>
                <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {description}
                </p>
            </div>
        </div>
    )
}