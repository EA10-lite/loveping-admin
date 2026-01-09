import { Trash2 } from "lucide-react";
import { ActionModal, Text } from "../../../components";
import { Button } from "../../../components/ui/button";
import { SheetClose } from "../../../components/ui/sheet";
import { toast } from "sonner";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";


const DeleteFeedback = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const handleDelete = async () => {
        try {
            setDeleting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast("Event has been created", {
                description: "Report deleted successfully",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        } catch (error) {
            console.log("error:", error);
            toast("Event has been created", {
                description: "Report deleted successfully",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        } finally {
            setDeleting(false);
            setOpen(false);
        }
    }
    return (
        <ActionModal
            buttonTitle="Delete Feedback"
            buttonType="destructive"
            open={open}
            openModal={()=> setOpen(true)}
        >
            <div className="space-y-6">
                <div className="">
                    <div className="hexagon flex items-center justify-center bg-[#252116] mx-auto">
                        <Trash2 color="#ED1500" className="size-6" />
                    </div>
                </div>


                <div className="text-center space-y-2">
                    <Text
                        title="Delete Bug Report"
                        type="h4"
                    />
                    <Text
                        title="This rating and its associated feedback will be permanently removed. This action cannot be undone."
                        type="p"
                        className="text-grey"
                    />
                </div>

                <div className="space-y-3">
                    <Button
                        variant="destructive"
                        className="rounded-full h-12 w-full"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <LuLoaderCircle className="animate-spin text-white" />
                        ) : (
                            <span>Delete Bug Report</span>
                        )}
                    </Button>
                    <SheetClose className="w-full">
                        <Button
                            variant="secondary"
                            className="rounded-full h-12 w-full"
                            disabled={deleting}
                            onClick={()=> setOpen(false)}
                        >
                            <span>Close</span>
                        </Button>
                    </SheetClose>
                </div>
            </div>
        </ActionModal>
    )
}

export default DeleteFeedback;