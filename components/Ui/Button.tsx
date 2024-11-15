// Button.tsx
import React from "react";

interface ButtonProps {
    color: string;
    text: string;
    onClick?: () => void;
}

export default function Button({ color, text, onClick }: ButtonProps) {
    return (
        <button
            className={`rounded-full px-4 py-2 ${color} text-white focus:outline-none`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
