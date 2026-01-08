import { useFormikContext, type FormikValues } from "formik";
import { Text } from "../main";
import { BsCheck2 } from "react-icons/bs";

type CheckboxProps = {
    name: string;
    label: string;
}
const Checkbox = ({ name, label }: CheckboxProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();
    return (
        <div
            className="form-checkbox mb-5 flex items-center gap-1 cursor-pointer"
            onClick={() => setFieldValue(name, !values[name])}
        >
            <div className="form-checkbox-outer w-4 h-4 border border-black flex items-center justify-center">
                {values[name] ? <BsCheck2 size={14} /> : ""}
            </div>

            <Text
                title={label}
                className="font-[300]"
                letterSpacing={"-2%"}
                type="p"
            />
        </div>
    )
}

export default Checkbox;