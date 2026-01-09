import { useState } from "react";
import { Plus } from "lucide-react";
import { FormField, FormModal, FormSelect, Textbox } from "../../../components";
import type { Partner } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { addPartnerValidation } from "../../../utils/validation";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";


interface ManagePartnerProps {
    partner?: Partner
    type: "add" | "edit"
}

const ManagePartner = ({
    partner,
    type,
} : ManagePartnerProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () =>  {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Issue deleted successfully")

            setLoading(false);
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed to submit partner details")
        }
    }
    return (
        <FormModal
            title={type === "add" ? "Add Partner" : "Edit Parnter"}
            TriggerButton={
                type === "add" && (
                    <div
                        className="rounded-sm px-4 gap-1.5 w-full flex items-center cursor-pointer"
                    >
                        <Plus />
                        <span className="text-sm font-medium">Add Partner</span>
                    </div>
                )
            }
            ActionButton={(
                <Button
                    className="rounded-full w-full h-12"
                    variant={type === "add" ? "default" : "muted"}
                >
                    {loading ? (
                        <LuLoaderCircle className="animate-spin text-white" />
                    ) : (
                        <span>{type === "add" ?  "Add Partner" : "Save Changes"}</span>
                    )}
                </Button>
            )}
        >
            <div className="p-4 space-y-6">

                <div className="form-group">
                   <Formik
                        initialValues={{
                            name: partner?.name ? partner.name : "",
                            status: partner?.status.toLowerCase() ? partner.status : "",
                            category: partner?.category.toLowerCase() ? partner.category : "",
                            note: partner?.note ? partner.note : "",
                            website: partner?.website ? partner.website : "",
                        }}

                        onSubmit={handleSubmit}
                        validationSchema={addPartnerValidation}
                   >
                        {()=> (
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
                                    name="website"
                                    label="Website Url"
                                    className="h-12"
                                    isMandatory={true}
                                />

                                <Textbox
                                    name="note"
                                    label="Internal note"
                                    isOptional={true}
                                />
                            </div>
                        )}
                   </Formik>
                </div>
            </div>
        </FormModal>
    )
}

export default ManagePartner;