import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { FormField, FormModal, FormSelect, Textbox } from "../../../components";
import type { FAQ } from "../../../services/faq.service";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { addFAQValidation } from "../../../utils/validation";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { useQueryClient } from "@tanstack/react-query";
import { createFAQ, updateFAQ } from "../../../services/faq.service";


interface ManageFAQProps {
    faq?: FAQ
    type: "add" | "edit" | "edit-alt";
}

const CATEGORIES = [
    { label: "Getting Started", value: "getting_started" },
    { label: "Nudges & AI", value: "nudges_ai" },
    { label: "Notifications", value: "notifications" },
    { label: "Gifts & Waitlist", value: "gifts_waitlist" },
    { label: "Account Login", value: "account_login" },
    { label: "Privacy & Security", value: "privacy_security" },
];

const ManageFAQ = ({
    faq,
    type,
}: ManageFAQProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (type === "add") {
                await createFAQ(values);
                toast.success("FAQ added successfully", {
                    icon: (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                            <Check className="size-4 text-primary" />
                        </div>
                    )
                });
            } else {
                if (faq?._id) {
                    await updateFAQ(faq._id, values);
                    toast.success("FAQ updated successfully", {
                        icon: (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                                <Check className="size-4 text-primary" />
                            </div>
                        )
                    });
                }
            }

            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            setOpen(false);
        } catch (error: any) {
            console.log("error: ", error);
            toast.error(error.response?.data?.message || "Failed to save FAQ", {
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
                question: faq?.question || "",
                answer: faq?.answer || "",
                category: faq?.category || "",
                status: faq?.status || "unpublished",
            }}
            onSubmit={handleSubmit}
            validationSchema={addFAQValidation}
        >
            {({ submitForm, dirty }) => (
                <FormModal
                    title={type === "add" ? "Add FAQ" : "FAQ Review"}
                    open={open}
                    onOpenChange={setOpen}
                    TriggerButton={
                        type === "add" ? (
                            <div
                                className="rounded-sm px-4 gap-1.5 w-full flex items-center cursor-pointer"
                            >
                                <Plus />
                                <span className="text-sm font-medium">Add FAQ</span>
                            </div>
                        ) : type === "edit-alt" && (
                            <Button
                                variant="secondary"
                                className="rounded-full h-12 w-full bg-white/3 hover:bg-white/3"
                                asChild
                            >
                                <span>Edit FAQ</span>
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
                                <span>{type === "add" ? "Add FAQ" : "Save Changes"}</span>
                            )}
                        </Button>
                    )}
                >
                    <div className="p-4 space-y-6">
                        <div className="form space-y-6">
                            <FormField
                                name="question"
                                label="Question"
                                className="h-12"
                                isMandatory={true}
                                disabled={loading}
                            />
                            <FormSelect
                                name="category"
                                label="Category"
                                isMandatory={true}
                                options={CATEGORIES}
                            />
                            {type !== "add" && (
                                <FormSelect
                                    name="status"
                                    label="Status"
                                    isMandatory={true}
                                    options={[
                                        { label: "Published", value: "published" },
                                        { label: "Unpublished", value: "unpublished" },
                                    ]}
                                    disabled={loading}
                                />
                            )}
                            {/* Also support status for ADD if requirement says so, but typically draft/published on add is useful. 
                                 The user payload for create included status. So I should add it.
                              */}
                            {type === "add" && (
                                <FormSelect
                                    name="status"
                                    label="Status"
                                    isMandatory={true}
                                    options={[
                                        { label: "Published", value: "published" },
                                        { label: "Unpublished", value: "unpublished" },
                                    ]}
                                    disabled={loading}
                                />
                            )}

                            <Textbox
                                name="answer"
                                label="Answer"
                                isMandatory={true}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default ManageFAQ;