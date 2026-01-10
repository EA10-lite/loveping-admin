import { Trash2, X } from "lucide-react";
import { ActionModal, Text } from "../../../components";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";


const DeleteIssue = ({ onSuccess, open, onOpenChange }: { onSuccess?: () => void, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Issue deleted successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                        <Trash2 className="size-4 text-primary" />
                    </div>
                )
            })
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.log("error:", error);
            toast.error("Failed to delete issue", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <X className="size-4 text-primary" />
                    </div>
                )
            })
        } finally {
            setDeleting(false);
        }
    }
    return (
        <ActionModal
            buttonTitle="Delete Issue"
            buttonType="ghost"
            buttonclass="h-fit p-0 text-destructive w-fit justify-start hover:bg-transparent hover:text-destructive"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="space-y-6">
                <div className="">
                    <div className="hexagon flex items-center justify-center bg-[#252116] mx-auto">
                        <Trash2 color="#ED1500" className="size-6" />
                    </div>
                </div>


                <div className="text-center space-y-2">
                    <Text
                        title="Delete Issue"
                        type="h4"
                    />
                    <Text
                        title="This issue and its associated data will be permanently removed. This action cannot be undone."
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
                            <span>Delete Issue</span>
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        className="rounded-full h-12 w-full"
                        disabled={deleting}
                        onClick={() => onOpenChange(false)}
                    >
                        <span>Close</span>
                    </Button>
                </div>
            </div>
        </ActionModal>
    )
}

export default DeleteIssue;
