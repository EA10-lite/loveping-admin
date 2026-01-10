
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip"

const Truncate = ({ text, maxLength=10 } : { text: string, maxLength?: number }) => {
    const truncate = (text: string) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };
    return (
        <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
                <span>{truncate(text)}</span>
            </TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    )
}


export default Truncate;