import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { FormField, FormModal, FormSelect, Textbox } from "../../../components";
import type { Partner } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { addPartnerValidation } from "../../../utils/validation";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { addPartner, editPartner } from "../../../services/partner.service";
import { useQueryClient } from "@tanstack/react-query";


interface ManagePartnerProps {
    partner?: Partner
    type: "add" | "edit" | "edit-alt";
    onSuccess?: () => void;
}

const ManagePartner = ({
    partner,
    type,
}: ManagePartnerProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (type === "add") {
                await addPartner(values);
                toast.success("Partner added successfully", {
                    icon: (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                            <Check className="size-4 text-primary" />
                        </div>
                    )
                });
            } else {
                if (partner?._id) {
                    await editPartner(partner._id, values);
                    toast.success("Partner updated successfully", {
                        icon: (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                                <Check className="size-4 text-primary" />
                            </div>
                        )
                    });
                }
            }

            queryClient.invalidateQueries({ queryKey: ["partners"] });
            setOpen(false);
        } catch (error: any) {
            console.log("error: ", error);
            toast.error(error.response?.data?.message || "Failed to save Partner", {
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
        <Formik
            initialValues={{
                name: partner?.name || "",
                status: partner?.status ? partner.status.toLowerCase() : "",
                category: partner?.category ? partner.category.toLowerCase() : "",
                internal_note: partner?.internal_note || "",
                url: partner?.url || "",
            }}
            onSubmit={handleSubmit}
            validationSchema={addPartnerValidation}
        >
            {({ submitForm, dirty }) => (
                <FormModal
                    title={type === "add" ? "Add Partner" : "Edit Partner"}
                    open={open}
                    onOpenChange={setOpen}
                    TriggerButton={
                        type === "add" ? (
                            <div
                                className="rounded-sm px-4 gap-1.5 w-full flex items-center cursor-pointer"
                            >
                                <Plus />
                                <span className="text-sm font-medium">Add Partner</span>
                            </div>
                        ) : type === "edit-alt" && (
                            <Button
                                variant="default"
                                className="bg-primary text-secondary rounded-full h-12 w-full hover:bg-primary"
                            >
                                <span>Edit Partner</span>
                            </Button>
                        )
                    }
                    ActionButton={(
                        <Button
                            className="rounded-full w-full h-12"
                            variant={type === "add" ? "default" : dirty ? "default" : "muted"}
                            onClick={submitForm}
                            disabled={loading}
                        >
                            {loading ? (
                                <LuLoaderCircle className="animate-spin text-white" />
                            ) : (
                                <span>{type === "add" ? "Add Partner" : "Save Changes"}</span>
                            )}
                        </Button>
                    )}
                >
                    <div className="p-4 space-y-6">
                        <div className="form space-y-6">
                            <FormField
                                name="name"
                                label="Partner's Name"
                                className="h-12"
                                isMandatory={true}
                            />
                            <FormSelect
                                name="category"
                                label="Category"
                                isMandatory={true}
                                options={[
                                    { label: "Florist", value: "florist" },
                                    { label: "Gift", value: "gift" },
                                    { label: "Experience", value: "experience" },
                                    { label: "Tech", value: "tech" },
                                ]}
                            />
                            <FormSelect
                                name="status"
                                label="Status"
                                isMandatory={true}
                                options={[
                                    { label: "Active", value: "active" },
                                    { label: "Inactive", value: "inactive" },
                                ]}
                            />
                            <FormField
                                name="url"
                                label="Website Url"
                                className="h-12"
                                isMandatory={true}
                            />

                            <Textbox
                                name="internal_note"
                                label="Internal note"
                                isOptional={true}
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default ManagePartner;