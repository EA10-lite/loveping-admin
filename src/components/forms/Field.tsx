import React from "react";
import { type FormikValues, useFormikContext } from "formik";

import Input from "./Input";
import Error from "./Error";
import Label from "./Label";
import { mergeClasses } from "../../lib/mergeclasses";

interface FieldProps {
    name:               string;
    type?:              string;
    label:              string;
    disabled?:          boolean,
    placeholder?:       string;
    isStringArr?:       boolean;
    parentName?:        string;
    index?:             number;
    customHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Field: React.FC<FieldProps> = ({
    name,
    parentName,
    isStringArr,
    index,
    type = "text",
    label,
    placeholder,
    customHandleChange,
    disabled=false,
    className,
    ...otherProps
}) => {
    const { errors, touched, handleChange, values } = useFormikContext<FormikValues>();

    return (
        <div className={mergeClasses("form-field mb-5", className)}>
            <Label
                name={name}
                label={label}
            />
            <Input
                name={name}
                type={type}
                placeholder={placeholder || ""}
                handleChange={customHandleChange ? customHandleChange : handleChange}
                disabled={disabled}
                value={(isStringArr && parentName) ? values[parentName][index || 0] : values[name] || ""}
                error={errors?.[name] as string | undefined}
                visible={!!touched?.[name]}
                {...otherProps}
            />

            <Error
                error={errors?.[name] as string | undefined}
                visible={!!touched?.[name]}
            />

        </div>
    )
}

export default Field;