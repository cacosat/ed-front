import React from "react";
import { 
    FileQuestion,
    Heart
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"


export default function DeckHeader({ title, description, loading, className }){
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
            <div className={`flex flex-col gap-4`}>
                <p className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
                    {loading ? (
                        <Skeleton className="w-[75%] h-[32px] rounded-full" />
                    ) : (
                        title
                    )}
                </p>
                <p className="font-normal text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-[100%] h-[14px] rounded-full" />
                            <Skeleton className="w-[100%] h-[14px] rounded-full" />
                            <Skeleton className="w-[90%] h-[14px] rounded-full" />
                        </div>
                    ) : (
                        description
                    )}
                </p>
            </div>
        </div>
    )
}