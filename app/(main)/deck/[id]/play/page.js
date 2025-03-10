'use client'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthProvider";
import Header from "@/app/components/play/Header";
import Progress from "@/app/components/play/Progress";
import Question from "@/app/components/play/Question";
import CustomButton from "@/app/components/CustomButton";

export default function Play({ params }) {
    const [progress, setProgress] = useState({
        currentQuestion: 0,
        currentModule: 0,
        currentSubmodule: 0
    });
    const [deckInfo, setDeckInfo] = useState(null);
    const [deckContent, setDeckContent] = useState(null);
    const [numOfQuestions, setNumOfQuestions] = useState(null);
    const [questions, setQuestions] = useState(null);
    const deckId = params.id;
    const { user, authFetch } = useContext(AuthContext);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchDeckInfo = async (id) => {
            try {
                const response = await authFetch(`${API_BASE_URL}/decks/${id}`)
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch deck ${deckId} from GET /api/decks/:deckId endpoint`)    
                }
                
                const deckInfo = await response.json();
                setDeckInfo(deckInfo);
                setDeckContent(deckInfo.modules);
                setNumOfQuestions(deckInfo.deckInfo.total_questions)
                console.log(`retrieved deck succesfully, with ${numOfQuestions} questions deck.deckInfo is: `, deckInfo.deckInfo)
                
                // Aggregate all questions
                const allQuestions = deckInfo.modules.flatMap(module => 
                    module.content.subtopics.flatMap(subtopic => {
                        const questions = [];
                        
                        // Add MCQ questions
                        if (subtopic.questions.mcq) {
                            questions.push(...subtopic.questions.mcq.map(q => ({
                                ...q,
                                moduleTitle: module.title,
                                subtopicTitle: subtopic.title,
                                questionType: 'mcq'
                            })));
                        }
                        
                        // Add True/False questions
                        if (subtopic.questions['true/false']) {
                            questions.push(...subtopic.questions['true/false'].map(q => ({
                                ...q,
                                moduleTitle: module.title,
                                subtopicTitle: subtopic.title,
                                questionType: 'true/false'
                            })));
                        }
                        
                        // Add Text questions
                        if (subtopic.questions.text) {
                            questions.push(...subtopic.questions.text.map(q => ({
                                ...q,
                                moduleTitle: module.title,
                                subtopicTitle: subtopic.title,
                                questionType: 'text'
                            })));
                        }
                        
                        return questions;
                    })
                );
                
                setQuestions(allQuestions);
                console.log('All questions:', allQuestions);
                
            } catch (error) {
                console.error(`Failed fetching deck ${deckId} with error: `, error)
            } finally {
                // change loading state
            }
        }
        fetchDeckInfo(deckId);
    }, [authFetch])

    

    return (
        <div className="flex flex-col gap-12 py-12 px-4">
            <div className="flex flex-col gap-8">
                <Header title={deckInfo ? deckInfo.deckInfo.title : 'Loading title...'} numOfQuestions={numOfQuestions ? numOfQuestions : 'Q'} />
                <Progress state={[1, 1, 1, 1, 0, 0, 0, 0, 0, 0]} />
            </div>
            <Question deck={deckInfo} />
            <div className="flex justify-between">
                <CustomButton>Back</CustomButton>
                <CustomButton>Next / Check</CustomButton>
            </div>
        </div>
    )
}