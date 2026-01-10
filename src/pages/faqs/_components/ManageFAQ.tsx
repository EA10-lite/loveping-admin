import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { FormField, FormModal, FormSelect, Textbox } from "../../../components";
import type { FAQ } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { addFAQValidation } from "../../../utils/validation";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";


interface ManageFAQProps {
    faq?: FAQ
    type: "add" | "edit" | "edit-alt";
}

const ManageFAQ = ({
    faq,
    type,
}: ManageFAQProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("FAQ added successfully",{
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 mr-4">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            })

            setLoading(false);
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed to add FAQ", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 mr-4">
                        <X className="size-4 text-primary" />
                    </div>
                )
            })
        }
    }
    return (
        <Formik
            initialValues={{
                faq: faq?.question || "",
                anser: faq?.answer || "",
                category: faq?.category || "",
            }}
            onSubmit={handleSubmit}
            validationSchema={addFAQValidation}
        >
            {({ submitForm }) => (
                <FormModal
                    title={type === "add" ? "Add FAQ" : "FAQ Review"}
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
                            variant={type === "add" ? "default" : "muted"}
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
                            />
                            <FormSelect
                                name="category"
                                label="Category"
                                isMandatory={true}
                                options={[
                                    { label: "Getting Started", value: "Getting Started" },
                                ]}
                            />

                            <Textbox
                                name="answer"
                                label="Answer"
                                isMandatory={true}
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default ManageFAQ;