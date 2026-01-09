import { useState } from "react";
import { Plus } from "lucide-react";
import { FormField, FormModal, FormSelect, ModalFieldItem, Textbox } from "../../../components";
import type { Notification } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";


interface ManagePartnerProps {
    notification?: Notification
    type: "add" | "edit" | "edit-alt";
}

const ManageNotification = ({
    notification,
    type,
}: ManagePartnerProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
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
        <Formik
            initialValues={{
                subject: notification?.title ? notification.title :  "",
                body: notification?.description ? notification.description : "",
                url: notification?.url ? notification.url : "",
                audience: notification?.audience ? notification.audience : ""
            }}
            onSubmit={handleSubmit}
        >
            {({ submitForm, values }) => (
                <FormModal
                    title={type === "add" ? "Created Notification" : "Notification Review"}
                    TriggerButton={
                        type === "add" ? (
                            <div
                                className="rounded-sm px-4 gap-1.5 w-full flex items-center cursor-pointer"
                            >
                                <Plus />
                                <span className="text-sm font-medium">Create Notification</span>
                            </div>
                        ) : type === "edit-alt" && (
                            <Button
                                variant="secondary"
                                className="rounded-full h-12 w-full"
                                asChild
                            >
                                <span>Edit Notification</span>
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
                                <span>{type === "add" ? "Created & Send" : "Save Changes"}</span>
                            )}
                        </Button>
                    )}
                >
                    <div className="p-4 space-y-6 border-b-[0.5px] border-primary/8">
                        <div className="form space-y-6">
                            <FormField
                                name="subject"
                                label="Subject"
                                className="h-12"
                                isMandatory={true}
                            />
                            <FormSelect
                                name="audience"
                                label="Audience"
                                isMandatory={true}
                                options={[
                                    { label: "All Users", value: "all" },
                                    { label: "New Users", value: "new" },
                                    { label: "Registered Users", value: "registered" },
                                ]}
                            />

                            <Textbox
                                name="body"
                                label="Body"
                                isMandatory={true}
                            />

                            <FormField
                                name="url"
                                label="URL"
                                className="h-12"
                                isOptional={true}
                            />
                        </div>
                    </div>

                    {values['body'] && values["subject"] &&(
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <FaFileAlt className="size-4 text-white" />
                                <p className="text-sm font-normal text-white">Preview</p>
                            </div>

                            <ModalFieldItem
                                label={values["subject"]}
                                value={values["body"]}
                                className="gap-1"
                            />
                        </div>
                    )}
                </FormModal>
            )}
        </Formik>
    )
}

export default ManageNotification;