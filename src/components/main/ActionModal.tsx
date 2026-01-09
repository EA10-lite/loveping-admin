import { Button } from "../ui/button"
import React, { type PropsWithChildren } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog"

type ActionModalProps = PropsWithChildren<{
    buttonType?: "destructive" | "outline" | "default";
    buttonTitle?: string;
}>

const ActionModal = ({
    buttonType = "default",
    buttonTitle = "Open",
    children
}: ActionModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={buttonType}
                    className="outline w-full rounded-full h-12"
                >
                    {buttonTitle}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-secondary border border-primary/10 rounded-xl [&>button.absolute]:hidden">
                {children}
            </DialogContent>
        </Dialog>
    )
}


export default ActionModal;