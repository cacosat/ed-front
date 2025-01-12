'use client'
import CustomButton from "../CustomButton"
import {
    ArrowLeft,
    FileQuestion
} from "lucide-react"

export default function Header({ title, numOfQuestions = 'X' }) {

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <CustomButton
                    variant={'link'}
                    frontIcon={<ArrowLeft size={16} className="text-accent" />}
                />
                <p className="text-xl font-medium">{title}</p>
            </div>
            <div className="px-4 flex gap-[2px] items-center text-text-secondary-light dark:text-text-secondary-dark">
                <FileQuestion className="" size={16} strokeWidth={2} />
                {numOfQuestions}
            </div>
        </div>
    )
}