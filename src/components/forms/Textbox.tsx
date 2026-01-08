"use client";
import React, { useRef } from "react";
import { type FormikValues, useFormikContext } from "formik";
import Error from "./Error";
import Label from "./Label";

interface InputProps {
    name:         string;
    label:         string;
    placeholder?:  string;
    disabled?:    boolean;
}


const Textbox: React.FC<InputProps> = ({ name, label, placeholder, disabled }) => {
    const { errors, touched, handleChange, values } = useFormikContext<FormikValues>();

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
        <div className="mb-5 form-textbox">
            <Label
                name={name}
                label={label}
            />

            <textarea
                name={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full text-left text-sm font-chivo-regular font-normal uppercase leading-base font-[500] px-4 py-3 border border-[#D2D2D2] min-h-[94px] ${errors?.[name] && touched?.[name] ? 'border-red-500' : 'border-[#D2D2D2]'}`}
                disabled={disabled}
            />

            <Error
                error={errors?.[name] as string | undefined}
                visible={!!touched?.[name]}
            />
        </div>
    )
}

export default Textbox;