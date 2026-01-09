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
    open?: boolean;
    openModal?: ()=> void;
}>

const ActionModal = ({
    buttonType = "default",
    buttonTitle = "Open",
    open=false,
    openModal,
    children
}: ActionModalProps) => {
    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button
                    variant={buttonType}
                    className="outline w-full rounded-full h-12"
                    onClick={openModal}
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