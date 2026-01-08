import { useFormikContext, type FormikValues } from "formik";
import { LuLoaderCircle } from "react-icons/lu";
import { mergeClasses } from "../../lib/mergeclasses";
import { Button } from "../ui/button";

type SubmitProps = {
    title: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: "submit" | "button" | "reset";
}

const Submit = ({
    title,
    className,
    disabled,
    loading,
    type = "submit"
}: SubmitProps) => {
    const { handleSubmit } = useFormikContext<FormikValues>();

    const onClick = () => {
        handleSubmit();
    }

    return (
        <Button
            className={mergeClasses("bg-primary rounded-full w-full h-11 cursor-pointer", className)}
            disabled={disabled || loading}
            type={type}
            onClick={onClick}
        >
            {loading ? (
                <LuLoaderCircle className="animate-spin text-secondary" />
            ) : (
                <span className="text-sm font-semibold text-secondary">
                    {title}
                </span>
            )}
        </Button>
    )
}

export default Submit;