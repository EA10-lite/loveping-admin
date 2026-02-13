import { Trash2, X } from "lucide-react";
import { ActionModal, Text } from "../../../components/main";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { deletePartner } from "../../../services/partner.service";
import { useQueryClient } from "@tanstack/react-query";


const DeletePartner = ({ onSuccess, hasTrigger, id }: { onSuccess?: () => void, hasTrigger?: boolean, id: string }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await deletePartner(id);
            toast.success("Partner deleted successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
                        <Trash2 className="size-4 text-primary" />
                    </div>
                )
            })
            queryClient.invalidateQueries({ queryKey: ["partners"] });
            onSuccess?.();
            setOpen(false);
        } catch (error) {
            console.log("error:", error);
            toast.error("Failed to delete partner", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
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
            buttonTitle="Delete Partner"
            buttonType="destructive"
            TriggerButton={hasTrigger && (
                <Button
                    className="hover:bg-[#143C2B] text-red-500 rounded-xs w-full justify-start p-1.5"
                >
                    <Trash2 className="text-red-500" />
                    <span>Delete</span>
                </Button>
            )}
            open={open}
            onOpenChange={setOpen}
        >
            <div className="space-y-6">
                <div className="">
                    <div className="hexagon flex items-center justify-center bg-[#252116] mx-auto">
                        <Trash2 color="#ED1500" className="size-6" />
                    </div>
                </div>


                <div className="text-center space-y-2">
                    <Text
                        title="Delete Partner"
                        type="h4"
                    />
                    <Text
                        title="This partner will be permanently removed. This action cannot be undone."
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
                            <span>Delete Partner</span>
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        className="rounded-full h-12 w-full"
                        disabled={deleting}
                        onClick={() => setOpen(false)}
                    >
                        <span>Close</span>
                    </Button>
                </div>
            </div>
        </ActionModal>
    )
}

export default DeletePartner;