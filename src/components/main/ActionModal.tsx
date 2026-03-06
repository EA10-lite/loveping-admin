import { Button } from "../ui/button"
import { type PropsWithChildren } from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog"
import { cn } from "../../lib/utils";

type ActionModalProps = PropsWithChildren<{
    buttonType?: "destructive" | "outline" | "default" | "ghost";
    buttonTitle?: string;
    buttonclass?: string;
    TriggerButton?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}>

const ActionModal = ({
    buttonType = "default",
    buttonTitle = "Open",
    buttonclass = "",
    TriggerButton,
    open,
    onOpenChange,
    children
}: ActionModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild className="bg-secondary-muted hover:bg-secondary-muted">
                {TriggerButton ? TriggerButton : (
                    <Button
                        variant={buttonType}
                        className={cn("outline w-full rounded-full h-12", buttonclass)}
                    >
                        {buttonTitle}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-secondary border border-primary/10 rounded-xl [&>button.absolute]:hidden">
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default ActionModal;