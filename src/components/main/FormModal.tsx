import type { PropsWithChildren } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { FaEdit } from "react-icons/fa";

type DetailsModalProps = PropsWithChildren<{
  title: string;
  ActionButton: React.ReactNode;
  TriggerButton?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>

const FormModal = ({
  title,
  ActionButton,
  TriggerButton,
  children,
  open,
  onOpenChange
}: DetailsModalProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="hover:bg-transparent p-0 bg-transparent w-fit">
        {TriggerButton ? TriggerButton : (
            <Button
                className="bg-transparent hover:bg-[#143C2B] text-primary rounded-xs w-full justify-start p-1.5"
            >
                <FaEdit className="text-primary" />
                <span>Edit</span>
            </Button>
        )}
      </SheetTrigger>
      <SheetContent className="min-w-[404px] bg-secondary border-[0.5px] border-primary/8 right-10 rounded-xl h-fit max-h-[90vh] overflow-auto top-1/2 -translate-y-1/2 p-0 [&>button.absolute]:hidden">
        <SheetHeader className="border-b border-primary/10 text-white flex flex-row items-center justify-between">
          <SheetTitle className="text-white">{title}</SheetTitle>

          <SheetClose className="rounded-full text-primary bg-primary/8 size-6 flex items-center justify-center">
            <X className="size-4" />
          </SheetClose>
        </SheetHeader>

        {children}

        <SheetFooter>
          {ActionButton}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FormModal;