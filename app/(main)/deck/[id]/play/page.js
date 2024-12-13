'use client'
import { useState, useEffect } from "react";
import Header from "@/app/components/play/Header";
import Progress from "@/app/components/play/Progress";
import Question from "@/app/components/play/Question";
import CustomButton from "@/app/components/CustomButton";

export default function Play({ params }) {
    const [progress, setProgress] = useState(0);
    const deckId = params.deckId; 
    const deckTitle = 'Deck title';

    return (
        <div className="flex flex-col gap-12 py-12">
            <div className="flex flex-col gap-8">
                <Header title={deckTitle} />
                <Progress state={[1, 1, 1, 1, 0, 0, 0, 0, 0, 0]} />
            </div>
            <Question />
            <div className="flex justify-between">
                <CustomButton>Back</CustomButton>
                <CustomButton>Explanation</CustomButton>
                <CustomButton>Next / Check</CustomButton>
            </div>
        </div>
    )
}