import { useState } from "react";
import { Check, X } from "lucide-react";
import {
    FormField,
    FormModal,
    Textbox
} from "../../../components";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { replyCustomerValidation } from "../../../utils/validation";
import { useQueryClient } from "@tanstack/react-query";
import { replyToContactMessage, type ReplyPayload } from "../../../services/contact.service";


interface ManagePartnerProps {
    _id: string;
}

const ReplyCustomer = ({
    _id,
}: ManagePartnerProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (values: ReplyPayload) => {

        try {
            await replyToContactMessage(_id, values);
            toast.success("Email added successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            });

            queryClient.invalidateQueries({ queryKey: ["contacts"] });
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
                subject: "",
                message: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={replyCustomerValidation}
        >
            {({ submitForm, isSubmitting }) => (
                <FormModal
                    open={open}
                    onOpenChange={setOpen}
                    title={"Reply customer"}
                    ActionButton={(
                        <Button
                            className="rounded-full w-full h-12"
                            variant="default"
                            onClick={submitForm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <LuLoaderCircle className="animate-spin text-white" />
                            ) : (
                                <span>Reply customer</span>
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

                            <Textbox
                                name="message"
                                label="Message"
                                isMandatory={true}
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default ReplyCustomer;