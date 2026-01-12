import { type FormikValues, useFormikContext } from "formik";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";


interface TextboxProps {
    name: string;
    label: string;
    isOptional?: boolean;
    isMandatory?: boolean;
}

const Textbox = ({
    label,
    name,
    isOptional,
    isMandatory,
}: TextboxProps) => {
    const { values, handleChange } = useFormikContext<FormikValues>();
    return (
        <div className="">
            <div className="space-y-1.5">
                <Label className="text-white text-sm font-medium mb-2">
                    {label}
                    {isMandatory && (
                        <span className="text-primary">*</span>
                    )}
                    {isOptional && (
                        <span className="text-primary rounded-full px-2 bg-[#FFFFFF05] text-xs inline py-1">Optional</span>
                    )}
                </Label>
                <Textarea
                    name={name}
                    className="min-h-[109px] border border-[#48D9621A] resize-none text-white focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all"
                    value={values[name]}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Textbox;