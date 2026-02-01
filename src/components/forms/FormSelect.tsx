import { type FormikValues, useFormikContext } from "formik";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { cn } from "../../lib/utils";

interface FormSelectProps {
    name: string;
    label: string;
    isMandatory?: boolean;
    placeholder?: string;
    styles?: string;
    options: {
        label: string;
        value: string;
    }[];
    disabled?: boolean;
}

const FormSelect = ({
    name,
    label,
    isMandatory,
    options,
    placeholder,
    styles,
    disabled,
}: FormSelectProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    const handleChange = (value: string) => {
        setFieldValue(name, value);
    }
    return (
        <div className="space-y-1.5">
            <Label className="text-white text-sm font-medium mb-2">
                {label}
                {isMandatory && (
                    <span className="text-primary">*</span>
                )}
            </Label>

            <Select
                value={values[name]}
                onValueChange={handleChange}
                disabled={disabled}
            >
                <SelectTrigger
                    className={
                        cn(
                            "rounded-full w-full border border-primary/10 focus:ring-primary min-h-12 px-4 focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all text-white text-sm font-normal",
                            styles
                        )
                    }
                >
                    <SelectValue placeholder={placeholder || ""} />
                </SelectTrigger>
                <SelectContent className="bg-secondary border border-primary/10 text-white">
                    <SelectGroup>
                        <SelectLabel className="capitalize">{name}</SelectLabel>
                        {options.map((option, index) => (
                            <SelectItem
                                key={index}
                                value={option.value}
                                className="py-2.5"
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FormSelect;
