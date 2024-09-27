import React from "react";

export default function CustomButton({
    variant = "solid", 
    frontIcon, 
    text = true,
    endIcon,
    className, 
    onClick,
    children
}) {
    const baseClasses = `${className} min-h-[40px] px-4 py-2 gap-2 rounded-lg flex items-center justify-center  transition-all`;
    const variantClasses = {
        soft: "bg-button-soft-light dark:bg-button-soft-dark text-orange-600 hover:bg-button-soft-light-hover dark:hover:bg-button-soft-dark-hover active:scale-95",
        solid: "bg-button-solid hover:bg-button-solid-hover text-text-primary-dark shadow-[inset_0_2px_5px_rgba(0255,0255,0255,0.3),inset_0_-2px_5px_rgba(0,0,0,0.2)] active:scale-95",
        link: "text-text-primary-light dark:text-text-primary-dark hover:text-accent dark:hover:text-accent font-medium",
        // Unstyled variants (Ai suggestion):
        outline: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:scale-95",
    };

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>
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