import { type FormikValues, useFormikContext } from "formik";
import {
    Field,
    FieldError,
    FieldLabel,
} from "../ui/field"
import FormInput from "./FormInput";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    isMandatory?: boolean;
    className?: string;
}

const FormField = ({
    label,
    name,
    type = "text",
    placeholder,
    isMandatory=false,
    className,
}: FormFieldProps) => {
    const { values, handleChange, errors, touched } = useFormikContext<FormikValues>();

    const hasError = touched[name] && errors[name];

    return (
        <div className="form-group">
            <Field className="gap-1">
                <FieldLabel className="text-white text-sm font-medium">
                    {label} {isMandatory && <span className="text-primary">*</span>}
                </FieldLabel>
                <FormInput
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={values[name]}
                    handleChange={handleChange}
                    styles={className}
                />

                <FieldError
                    errors={hasError ? [{ message: errors[name] as string }] : []}
                />
            </Field>
        </div>
    )
}

export default FormField;