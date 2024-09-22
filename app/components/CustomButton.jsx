import React from "react";

export default function CustomButton({ variant = "solid", children }) {

    return (
        <button>{children}</button>
    )
}