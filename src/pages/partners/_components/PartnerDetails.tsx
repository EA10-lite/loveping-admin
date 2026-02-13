import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import { formatDateString } from "../../../utils/formatter";
import type { Partner } from "../../../utils/types";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import ManagePartner from "./ManagePartners";
import { Check, X } from "lucide-react";
import { editPartner } from "../../../services/partner.service";
import { useQueryClient } from "@tanstack/react-query";

const PartnerDetails = ({ partner }: { partner: Partner }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const updateStatus = async () => {
        try {
            setLoading(true);
            const newStatus = partner.status.toLowerCase() === "active" ? "inactive" : "active";
            await editPartner(partner._id, { status: newStatus });

            toast.success("Status updated successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            })
            queryClient.invalidateQueries({ queryKey: ["partners"] });
            setOpen(false);
        } catch (error) {
            console.log("error:", error);
            toast.error("Failed to update status", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <X className="size-4 text-primary" />
                    </div>
                )
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <DetailsModal
            title="Partner Details"
            open={open}
            onOpenChange={setOpen}
            ActionButton={(
                <div className="flex flex-col gap-3">
                    <ManagePartner
                        type="edit-alt"
                        partner={partner}
                    />
                    <Button
                        variant="secondary"
                        className="h-12 rounded-full w-full"
                        onClick={updateStatus}
                        disabled={loading}
                    >
                        {loading ? (
                            <LuLoaderCircle className="animate-spin text-white" />
                        ) : (
                            <span>Set as {" "}
                                {
                                    partner.status.toLowerCase() === "active" ?
                                        "Inactive" : "Active"
                                }
                            </span>
                        )}
                    </Button>
                </div>
            )}
        >
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Partner name:"
                            value={partner.name}
                            className="flex-row"
                        />
                        <ModalFieldItem
                            label="Category:"
                            value={partner.category}
                            className="flex-row"
                        />
                        <ModalFieldItem
                            label="Status:"
                            value={partner.status}
                            className="flex-row text-primary capitalize"
                        />
                        <ModalFieldItem
                            label="Website:"
                            value={partner.url}
                            className="flex-row underline"
                        />
                        <ModalFieldItem
                            label="Last Updated Date:"
                            value={formatDateString(partner.createdAt)}
                            className="flex-row whitespace-nowrap"
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default PartnerDetails;