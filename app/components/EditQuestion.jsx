import React from "react";
import { useState, useEffect } from "react";
import { 
    ChevronDown,
    Sparkles,
    Trash2
 } from "lucide-react";
import CustomButton from "./CustomButton";
import {AnswerCard} from "./Card";
import { Badge } from "@/components/ui/badge";

export default function EditQuestion({ props }){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const question = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsa debitis ratione neque nostrum, assumenda repellat, quibusdam eligendi at minus vitae accusamus voluptatum quas quod consectetur distinctio aliquam consequuntur porro?';
    const badges = ['tag1', 'tag2', 'tag3'];

    return (
        <div className="flex flex-col border-b border-divider-light dark:border-divider-dark text-text-primary-light dark:text-text-primary-dark">

            <div onClick={handleOpen} className="flex justify-between items-center py-4 px-8 hover:cursor-pointer">
                {/* Question container */}
                <div className="flex flex-col gap-4">
                    <p>
                        {question}
                    </p>
                    <div>
                        {badges.map((tag, index) => <Badge key={tag} variant={'oultine'}>{tag}</Badge>)}
                    </div>
                </div>
                <div className={``}>
                    <CustomButton
                        onClick={handleOpen}
                        variant={'link'}
                        className={`!text-accent transition-transform ${ open ? 'rotate-180' : '' }`}
                        text={false}
                        frontIcon={<ChevronDown size={16} />}
                    />
                </div>
            </div>

            <div 
                className={`overflow-hidden duration-300 ease-in-out 
                    text-text-primary-light dark:text-text-primary-dark
                    ${open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="flex gap-2 py-8 px-6">
                    <CustomButton
                        className={'w-full'}
                        variant="soft"
                        frontIcon={<Sparkles size={16} />}
                    >
                        Regenarate Question
                    </CustomButton>
                    <CustomButton
                        className={'w-full'}
                        variant="softError"
                        frontIcon={<Trash2 size={16} />}
                    >
                        Delete Question
                    </CustomButton>
                </div>
                {/* Open container */}
                <div className={`py-4 px-12 transform transition-transform flex flex-col gap-4`}>
                    {/* Answers container */}
                    <p className="font-light text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        The following are the choices that will be presented with the question, and their explanation.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
                        <AnswerCard 
                            extraClasses='' 
                            status='active'
                            type='mcq'
                            answer='Answer'
                            explanation='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate laudantium, nostrum voluptatum numquam eum error iusto, facilis ratione ullam officia nihil sit rem adipisci voluptas laborum reprehenderit commodi voluptatibus!'
                        />
                        <AnswerCard 
                            extraClasses='' 
                            status='neutral'
                            type='mcq'
                            answer='Answer'
                            explanation='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate laudantium, nostrum voluptatum numquam eum error iusto, facilis ratione ullam officia nihil sit rem adipisci voluptas laborum reprehenderit commodi voluptatibus!'
                        />
                        <AnswerCard 
                            extraClasses='' 
                            status='neutral'
                            type='mcq'
                            answer='Answer'
                            explanation='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate laudantium, nostrum voluptatum numquam eum error iusto, facilis ratione ullam officia nihil sit rem adipisci voluptas laborum reprehenderit commodi voluptatibus!'
                        />
                        <AnswerCard 
                            extraClasses='' 
                            status='neutral'
                            type='mcq'
                            answer='Answer'
                            explanation='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate laudantium, nostrum voluptatum numquam eum error iusto, facilis ratione ullam officia nihil sit rem adipisci voluptas laborum reprehenderit commodi voluptatibus!'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}