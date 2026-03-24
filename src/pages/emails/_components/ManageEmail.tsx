import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { DateAndTimePicker, FormField, FormModal, FormRadio, FormSelect, ImagePicker, ModalFieldItem, Text, Textbox } from "../../../components";
import type { Emails } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { emailAndNotificationValidation } from "../../../utils/validation";
import { createEmail, updateEmail, type CreateEmailPayload } from "../../../services/email.service";
import { useQueryClient } from "@tanstack/react-query";


interface ManagePartnerProps {
    email?: Emails;
    type: "add" | "edit" | "edit-alt";
}

const ManageEmail = ({
    email,
    type,
}: ManagePartnerProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const parseScheduledAt = (iso?: string): { date: Date | undefined; time: string } => {
        if (!iso) return { date: undefined, time: "" };
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return { date: undefined, time: "" };
        const time = d.toTimeString().slice(0, 8);
        return { date: d, time };
    };

    const handleSubmit = async (values: CreateEmailPayload & { scheduled_date?: Date; scheduled_time?: string }) => {
        const [h, m, s] = values.scheduled_time?.split(":").map(Number) ?? [0, 0, 0];
        const scheduled_at =
            values.status === "schedule_for_later" && values.scheduled_date && values.scheduled_time
                ? new Date(
                      values.scheduled_date.getFullYear(),
                      values.scheduled_date.getMonth(),
                      values.scheduled_date.getDate(),
                      h,
                      m,
                      s || 0
                  ).toISOString()
                : values.scheduled_at;
        const payload: CreateEmailPayload = {
            subject: values.subject,
            body: values.body,
            status: values.status,
            recipient_type: values.recipient_type,
            user_id: values.user_id,
            image_url: values.image_url,
            created_after: values.created_after,
            scheduled_at,
        };
        try {
            if (type === "add") {
                await createEmail(payload);
                toast.success("Email added successfully", {
                    icon: (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                            <Check className="size-4 text-primary" />
                        </div>
                    )
                });
            } else {
                if (email?._id) {
                    await updateEmail(email._id, payload);
                    toast.success("Email updated successfully", {
                        icon: (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                                <Check className="size-4 text-primary" />
                            </div>
                        )
                    });
                }
            }

            queryClient.invalidateQueries({ queryKey: ["emails"] });
            setOpen(false);
        } catch (error: unknown) {
            console.log("error: ", error);
            const message = error && typeof error === "object" && "response" in error && typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
                ? (error as { response: { data: { message: string } } }).response.data.message
                : "Failed to save email emails";
            toast.error(message, {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <X className="size-4 text-primary" />
                    </div>
                )
            })
        }
    }
    return (
        <Formik
            initialValues={{
                subject: email?.subject ? email.subject : "",
                body: email?.body ? email.body : "",
                recipient_type: email?.recipient_type ? email.recipient_type : "all",
                status: email?.status ? email.status : "send_now",
                user_id: email?.user_id ? email.user_id : "",
                image_url: email?.image_url ? email.image_url : "",
                created_after: email?.created_after ? email.created_after : "",
                scheduled_at: email?.scheduled_at ? email.scheduled_at : "",
                ...parseScheduledAt(email?.scheduled_at),
            }}
            onSubmit={handleSubmit}
            validationSchema={emailAndNotificationValidation}
        >
            {({ submitForm, values, isSubmitting }) => (
                <FormModal
                    open={open}
                    onOpenChange={setOpen}
                    title={type === "add" ? "Created Email" : "Edit Email"}
                    TriggerButton={
                        type === "add" ? (
                            <div
                                className="rounded-sm px-2 gap-1.5 w-full flex items-center cursor-pointer"
                            >
                                <Plus />
                                <span className="text-sm font-medium">Create Email</span>
                            </div>
                        ) : type === "edit-alt" && (
                            <Button
                                variant="secondary"
                                className="rounded-full h-12 w-full"
                                asChild
                            >
                                <span>Edit Email</span>
                            </Button>
                        )
                    }
                    ActionButton={(
                        <Button
                            className="rounded-full w-full h-12"
                            variant={type === "add" ? "default" : "muted"}
                            onClick={submitForm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
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
                                name="recipient_type"
                                label="Audience"
                                isMandatory={true}
                                options={[
                                    { label: "All Users", value: "all" },
                                    { label: "New Users", value: "new_users" },
                                ]}
                            />

                            <Textbox
                                name="body"
                                label="Body"
                                isMandatory={true}
                            />

                            <ImagePicker
                                name="image_url"
                                label="Image"
                            />

                            <FormRadio
                                name="status"
                                options={[
                                    { label: "Send Now", value: "send_now" },
                                    { label: "Schedule for Later", value: "schedule_for_later" },
                                    { label: "Save as Draft", value: "draft" },
                                ]}
                            />

                            {values["status"] === "schedule_for_later" && (
                                <div className="space-y-4">
                                    <Text
                                        title="Schedule time to post"
                                        type="h4"
                                        className="text-white font-medium"
                                    />
                                    <DateAndTimePicker
                                        dateName="scheduled_date"
                                        timeName="scheduled_time"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {values['body'] && values["subject"] && (
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

export default ManageEmail;