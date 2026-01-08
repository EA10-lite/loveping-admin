
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
}

const FormInput: React.FC<InputProps> = ({
    name,
    placeholder,
    type,
    value,
    handleChange,
    disabled=false,
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
                        "rounded-full w-full border border-primary/10 focus:ring-primary h-11 focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all text-white text-sm font-normal"
                    )
                }
                {...otherProps}
            />
        </div>
    )
}

export default FormInput;