"use client";
import React, { useRef } from "react";

interface InputProps {
    name:         string;
    placeholder?:  string;
    type:         string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?:    boolean;
    value:        string | number;
    Icon?:        React.ElementType;
    handleIconClick?:   ()=> null;
    error?: string | null;
    visible?: boolean;
}


const Input: React.FC<InputProps> = ({
    Icon,
    handleIconClick,
    name,
    placeholder,
    type,
    value,
    handleChange,
    disabled=false,
    error,
    visible,
    ...otherProps
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (inputRef.current && !inputRef.current.classList.contains("active-input")) {
            inputRef.current.classList.add("active-input");
        }
    };

    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.classList.remove("active-input");
        }
    };

    return (
        <div className="form-input relative">
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`w-full text-sm px-4 py-3 border text-sm font-chivo-regular font-normal uppercase leading-[100%] text-white placeholder:text-white border-primary/10 rounded-full ${error && visible ? 'border-red-500' : 'border-[#D2D2D2]'}`}
                disabled={disabled}
                ref={inputRef}
                {...otherProps}
            />

            {Icon && (
                <div className="absolute right-[18px] top-0 bottom-0 z-50 flex items-center justify-center" onClick={handleIconClick}>
                    <Icon className="text-lg text-primary cursor-pointer" />
                </div>
            )}
        </div>
    )
}

export default Input;