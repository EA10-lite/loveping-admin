import { useFormikContext, type FormikValues} from "formik";
import { LuLoaderCircle } from "react-icons/lu";
import { mergeClasses } from "../../lib/mergeclasses";

type SubmitProps = {
    title:  string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: "submit" | "button" | "reset";
}

const Submit = ({ title, className, disabled, loading, type="submit" }: SubmitProps) => {
    const { handleSubmit } = useFormikContext<FormikValues>();

    return (
        <button
            className={mergeClasses("bg-primary rounded-full w-full text-secondary px-8 py-4 text-base leading-[100%] w-fit cursor-pointer flex items-center gap-2 justify-center", className)}
            disabled={disabled}
            onClick={()=> handleSubmit()}
            type={type}
            style={{
                opacity: loading ? 0.5 : 1,
                letterSpacing: "-2%",
            }}
        >

            {loading  && <LuLoaderCircle className="text-lg animate-spin" />}
            <span>{title}</span>
        </button>
    )
}

export default Submit;