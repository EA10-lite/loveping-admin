import type { PropsWithChildren } from "react";
import { Eye, X } from "lucide-react";
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

type DetailsModalProps = PropsWithChildren<{
  title: string;
  buttonType?: "ghost" | "default" | "destructive",
  buttonTitle?: string;
  ActionButton?: React.ReactNode;
}>

const DetailsModal = ({
  title,
  buttonType = "default",
  buttonTitle = "Close",
  ActionButton,
  children,
}: DetailsModalProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-transparent hover:bg-[#143C2B] text-primary rounded-xs w-full justify-start"
        >
          <Eye className="text-primary" />
          <span>View</span>
        </Button>
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
          {ActionButton ? (
            ActionButton
          ) : (
            <SheetClose asChild>
              <Button
                className="rounded-full w-full h-12"
                variant={buttonType}
              >
                <span>{buttonTitle}</span>
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DetailsModal;