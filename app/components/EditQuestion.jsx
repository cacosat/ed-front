import React from "react";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CustomButton from "./CustomButton";

export default function EditQuestion({ props }){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <div className="flex flex-col border-b border-divider-light dark:border-divider-dark">
            <div onClick={handleOpen} className="flex justify-between items-center py-4 px-8 hover:cursor-pointer">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsa debitis ratione neque nostrum, assumenda repellat, quibusdam eligendi at minus vitae accusamus voluptatum quas quod consectetur distinctio aliquam consequuntur porro?</p>
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
                className={`overflow-hidden transition-all ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className={`py-4 px-11 transform transition-transform`}>
                    Open question content
                </div>
            </div>
        </div>
    )
}