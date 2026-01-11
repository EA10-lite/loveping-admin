import { type FormikValues, useFormikContext } from "formik";
import { Label } from "../ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "../ui/radio-group"

interface FormRadioProps {
    name: string;
    options: {
        label: string;
        value: string;
    }[];
}

const FormRadio = ({ name, options }: FormRadioProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    return (
        <RadioGroup
            defaultValue={values[name]}
            onValueChange={(value) => setFieldValue(name, value)}
            className="flex items-center gap-3"
        >
            {options?.map((option, index) => (
                <div key={index} className="flex items-center gap-1.5">
                    <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="border-primary"
                    />
                    <Label
                        htmlFor={option.value}
                        className="text-white text-sm whitespace-nowrap"
                    >
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export default FormRadio;
