import { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
    type,
    label, 
    description, 
    msg,
    value, 
    passwordVisibility = false,
    onChange, 
    placeholder = 'Placeholder',
    required
}) {
    const [passVisible, setPassVisible] = useState(false);
    const passVisibilityToggle = () => setPassVisible(!passVisible);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                { label ? (
                    <label htmlFor="deckDescription" className="text-base text-text-primary-light dark:text-text-primary-dark">{label}{required ? (<span className="text-accent">*</span>) : null}</label>
                ) : (null)}
                {description ? (
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{description}</p>
                ) : (null)}
            </div>
            {passwordVisibility ? (
                <div className="flex gap-2">
                    <input
                        type={passVisible ? 'text' : 'password'}
                        id={`label-${label}`}
                        className={` w-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light
                            text-sm border ${value ? 'border-accent' : 'border-stroke-light-gray dark:border-stroke-dark-gray'} outline-none focus:border-accent dark:focus:border-accent ${value ? 'bg-background-card-light dark:bg-background-card-dark' : 'bg-background-light dark:bg-background-dark'} dark:focus:bg-background-card-dark rounded-lg p-2 transition-all`}
                        rows="4"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    ></input>
                    <CustomButton
                        type={'button'}
                        variant="soft"
                        frontIcon={passVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                        text={false}
                        onClick={passVisibilityToggle}
                        className={'h-fit'}
                    ></CustomButton>
                </div>
            ) : (
                <input
                    type={type}
                    id={`label-${label}`}
                    className={`placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark placeholder:italic placeholder:font-light
                        text-sm border ${value ? 'border-accent' : 'border-stroke-light-gray dark:border-stroke-dark-gray'} outline-none focus:border-accent dark:focus:border-accent ${value ? 'bg-background-card-light dark:bg-background-card-dark' : 'bg-background-light dark:bg-background-dark'} dark:focus:bg-background-card-dark rounded-lg p-2 transition-all`}
                    rows="4"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                ></input>
            )}
            {msg ? (
                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {msg}
                </div>
            ) : null}
        </div>
    )
}