import React from "react";

export default function CustomButton({
    variant = "solid", 
    frontIcon, 
    text = true,
    endIcon, 
    children
}) {
    const baseClasses = "px-4 py-2 gap-2 rounded-lg flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all";
    const variantClasses = {
        soft: "bg-button-soft-light dark:bg-button-soft-dark text-orange-600 hover:bg-button-soft-light-hover dark:hover:bg-button-soft-dark-hover",
        solid: "bg-button-solid hover:bg-button-solid-hover text-text-primary-dark shadow-[inset_0_2px_5px_rgba(0255,0255,0255,0.3),inset_0_-2px_5px_rgba(0,0,0,0.2)]",
        // Unstyled variants (Ai suggestion):
        outline: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
        link: "text-red-500 underline hover:text-red-600"
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`}>
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