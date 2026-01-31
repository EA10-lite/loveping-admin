
import React from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

interface InputProps {
    name:         string;
    placeholder?:  string;
    type:         string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?:    boolean;
    value:        string | number;
    styles?: string;
}

const FormInput: React.FC<InputProps> = ({
    name,
    placeholder,
    type,
    value,
    handleChange,
    disabled=false,
    styles,
    ...otherProps
}) => {
    return (
        <div className="form-input relative">
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className={
                    cn(
                        "rounded-full w-full px-4 border border-primary/10 focus:ring-primary h-11 focus:outline-none focus-visible:ring-[#1dc071] focus-visible:ring-[1px] transition-all text-white text-sm font-normal",
                        styles
                    )
                }
                {...otherProps}
            />
        </div>
    )
}

export default FormInput;