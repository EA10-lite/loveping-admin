import { FormField, FormModal, Text } from "../../../components";
import type { FullUser } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { editUserValidation } from "../../../utils/validation";
import { Check } from "lucide-react";
import { updateUser } from "../../../services/users.service";


interface ManagePartnerProps {
    user: FullUser
}

const EditUser = ({
    user,
}: ManagePartnerProps) => {
    const handleSubmit = async (values: { full_name: string, email_address: string }) => {
        try {
            console.log("values: ", values);
            await updateUser(user._id, {
                full_name: values.full_name,
                email_address: values.email_address,
            });
            toast.success("User details updated successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            })
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed to update user details")
        }
    }
    return (
        <Formik
            initialValues={{
                full_name: user?.full_name,
                email_address: user.email_address || user.email || "",
            }}
            onSubmit={handleSubmit}
            validationSchema={editUserValidation}
        >
            {({ submitForm, isSubmitting }) => (
                <FormModal
                    title={"Edit User"}
                    ActionButton={(
                        <Button
                            className="rounded-full w-full h-12"
                            variant={"default"}
                            onClick={submitForm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <LuLoaderCircle className="animate-spin text-white" />
                            ) : (
                                <span>Save changes</span>
                            )}
                        </Button>
                    )}
                >
                    <div className="p-4 space-y-6">
                        <div className="form space-y-6">
                            <Text
                                className="text-primary"
                                type="h4"
                                title="User Information"
                            />
                            <FormField
                                name="full_name"
                                label="Full Name"
                                className="h-12"
                            />
                            <FormField
                                name="email_address"
                                label="Email Address"
                                className="h-12"
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default EditUser;