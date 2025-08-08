"use client";

import { Check, Sparkle, Sparkles } from "lucide-react";
import { useCallback } from "react";
import { LearningMaterial } from "./LearningMaterialLinker";

interface GenerateQuestionsUsingAIProps {
    activeItem?: Object; 
    taskId: string;
}

const GenerateQuestionsUsingAI = ({
    activeItem,
    taskId
}: GenerateQuestionsUsingAIProps) => {

    const handleClickGenerateQuestions = async (taskId: string) => {
        console.log("Generating questions using AI for:", taskId);

        try {
            const learningMaterialContent = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!learningMaterialContent.ok) {
                throw new Error("Failed to fetch learning material content");
            }

            const learningMaterialData: LearningMaterial[] = await learningMaterialContent.json();

            // Send data to be preprocessed and have an AI agent run on it
            const generateQuestionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/generate-questions`, {
                method: 'POST',      
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(learningMaterialData)})
            
            if (!generateQuestionsResponse.ok) {
                throw new Error("Failed to generate questions");
            }

            const questionsData = await generateQuestionsResponse.json();

            console.log(`Generated questions for task ${taskId}:`, questionsData);
        } catch (error) {
            console.error("Error fetching learning material content:", error);
        }   

        // try {

        //     // Fetch course content from DB first

        //     const response_type = await fetch('/api/ai/generate-questions', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },   
        //         body: JSON.stringify({
        //             content: activeItemContent,
        //         }),
        //     }); 
        // } catch (error) {   
        //     // console.error("Error generating questions:", error);
        // }
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    handleClickGenerateQuestions(taskId)
                }}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Generate Quiz using AI"
            >
                <Sparkle size={16} />
            </button>
        </div>
    );
}

export default GenerateQuestionsUsingAI;