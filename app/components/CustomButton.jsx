import React from "react";

export default function CustomButton({
    variant = "solid", 
    type,
    frontIcon, 
    text = true,
    endIcon,
    className, 
    onClick,
    disabled = false,
    children
}) {
    const baseClasses = `${className} min-h-[40px] px-4 py-2 gap-2 rounded-lg flex items-center justify-center  transition-all active:scale-[0.97]`;
    const variantClasses = {
        soft: "bg-button-soft-light dark:bg-button-soft-dark text-accent hover:bg-button-soft-light-hover dark:hover:bg-button-soft-dark-hover ",
        softError: 'bg-button-soft-red text-text-red hover:bg-button-soft-red-hover',
        softDisabled: 'bg-button-soft-light dark:bg-button-soft-dark text-accent cursor-default active:scale-[1]',
        solid: "bg-button-solid hover:bg-button-solid-hover text-text-primary-dark shadow-[inset_0_2px_5px_rgba(0255,0255,0255,0.3),inset_0_-2px_5px_rgba(0,0,0,0.2)] ",
        link: "text-text-primary-light dark:text-text-primary-dark hover:text-accent dark:hover:text-accent font-medium",
        // Unstyled variants (Ai suggestion):
        outline: "border border-stroke-light-gray dark:border-stroke-dark-gray text-text-secondary-light dark:text-text-secondary-dark active:scale-[1]",
    };
    const actualVariant = disabled ? 'outline' : variant;

    return (
        <button 
            onClick={onClick} 
            type={type} 
            className={`${baseClasses} ${variantClasses[actualVariant]}`} 
            disabled={disabled}
        >
            {frontIcon && (
                <div className="">
                    {frontIcon}
                </div>
            )}
            {text && (
                <div>
                    {children}
                </div>
            )}
            {endIcon && (
                <div>
                    {endIcon}
                </div>
            )}
        </button>
    );
}