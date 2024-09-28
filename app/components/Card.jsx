import React from "react";
import { 
    CircleCheckBig,
    Flag,
    CircleX
 } from "lucide-react";
import CustomButton from "./CustomButton";

export default function Card({
    extraClasses,
    status = 'neutral', // determines card status ('acitve', 'error', 'neutral')
    // data
}){
    const baseClasses = `p-4 bg-background-card-light dark:bg-background-card-dark text-text-primary-light dark:text-text-primary-second rounded-lg`
    const statusClasses = {
        neutral: 'border border-stroke-light-light dark:border-stroke-dark-light text-accent',
        active: 'border-2 border-accent',
        error: 'border-2 border-text-red'
    }
    const data = { // placeholder for data prop
        type: 'mcq', // mcq = multiple choice; tf = true or false; text = text response
        answer: 'Answer',
        explanation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, nemo quidem delectus rem exercitationem autem asperiores debitis corrupti et recusandae! Dolores repellendus soluta mollitia distinctio perspiciatis minima modi quis quas.',
        status: status, // 'acitve', 'error', 'neutral'
    } 

    return (
        <div className={`${extraClasses} ${baseClasses} ${statusClasses[status]}`}
        >
            {/* 
            Icon / Title / Answer (MCQ and True/False)
            Explanation
            Report error button
            */}
            <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center font-medium">
                    <div className={`text-base text-text-primary-light dark:text-text-primary-dark ${status === 'active' ? '!text-accent ' : status === 'error' ? '!text-text-red' : ''}`}>
                        {data.answer}
                    </div>
                    <div className={``}>
                        {data.status === 'active' ? (
                            <CircleCheckBig size={18} strokeWidth={2} className="text-accent"/>
                        ) : (
                            data.status === 'error' ? <CircleX size={18} className="text-text-red" /> : null
                        )}
                    </div>
                </div>
                <div className="text-text-secondary-light dark:text-text-secondary-dark font-light p-4 border-l-2 border-accent bg-background-accent-soft rounded-r-lg">
                    <span className="font-medium text-accent">Explanation: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptate laudantium, nostrum voluptatum numquam eum error iusto, facilis ratione ullam officia nihil sit rem adipisci voluptas laborum reprehenderit commodi voluptatibus!
                </div>
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