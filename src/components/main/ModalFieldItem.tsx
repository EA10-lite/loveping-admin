import { mergeClasses } from "../../lib/mergeclasses";
import Text from "./Text";


const ModalFieldItem = ({
    label,
    value,
    className,
    content,
} : {
    label?: string;
    value?: string;
    className?: string;
    content?: React.ReactNode;
}) => {
    return (
        <div className={mergeClasses(`flex flex-col gap-1.5`, className)}>
            {label && (
                <Text
                    title={label}
                    type="h4"
                    className="text-white"
                />
            )}


            {content && content}

            {value && !content && (
                <Text
                    title={value}
                    type="p"
                    className={mergeClasses("text-grey", className)}
                />
            )}
        </div>
    )
}

export default ModalFieldItem;