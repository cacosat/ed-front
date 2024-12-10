'use client'
import Header from "@/app/components/play/Header";
import Progress from "@/app/components/play/Progress";
import Question from "@/app/components/play/Question";
import CustomButton from "@/app/components/CustomButton";

export default function Play({ params }) {
    const deckId = params.deckId;

    return (
        <div>
            <Header />
            <Progress />
            <Question />
            <div className="flex justify-between">
                <CustomButton>Back</CustomButton>
                <CustomButton>Explanation</CustomButton>
                <CustomButton>Next / Check</CustomButton>
            </div>
        </div>
    )
}