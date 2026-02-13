import { useState } from "react";
import { FormField, FormModal, FormSelect, Text } from "../../../components";
import type { FullUser } from "../../../utils/types";
import { Button } from "../../../components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { editUserValidation } from "../../../utils/validation";
import { Check } from "lucide-react";


interface ManagePartnerProps {
    user: FullUser
}

const EditUser = ({
    user,
}: ManagePartnerProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("User details updated successfully", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10  border-[0.5px] border-primary/10">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            })

            setLoading(false);
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed to update user details")
        }
    }
    return (
        <Formik
            initialValues={{
                fullname: user?.full_name,
                email: user.email_address,
                phone: user.phone,
                partnerName: user.partner.name,
                relationshipType: user.partner.relationshipType,
            }}
            onSubmit={handleSubmit}
            validationSchema={editUserValidation}
        >
            {({ submitForm }) => (
                <FormModal
                    title={"Edit User"}
                    ActionButton={(
                        <Button
                            className="rounded-full w-full h-12"
                            variant={"default"}
                            onClick={submitForm}
                            disabled={loading}
                        >
                            {loading ? (
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
                                name="name"
                                label="Full Name"
                                className="h-12"
                            />
                            <FormField
                                name="email"
                                label="Email Address"
                                className="h-12"
                            />
                            <FormField
                                name="phone"
                                label="Phone Number"
                                className="h-12"
                            />
                        </div>
                        <div className="form space-y-6">
                            <Text
                                className="text-primary"
                                type="h4"
                                title="Relationship Details"
                            />
                            <FormField
                                name="partnerName"
                                label="Partner's Name"
                                className="h-12"
                            />
                            <FormSelect
                                name="relationshipType"
                                label="Relationship Type"
                                options={[
                                    { label: "Spouse", value: "spouse" },
                                    { label: "Girlfriend", value: "girlfriend" }
                                ]}
                            />
                        </div>
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default EditUser;