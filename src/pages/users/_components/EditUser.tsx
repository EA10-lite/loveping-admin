import { useState } from "react";
import { DatePicker, FormField, FormModal, FormSelect, Text } from "../../../components";
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
    console.log("user: ", user);
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
                full_name: user?.full_name,
                email_address: user.email_address,
                partner_name: user?.partner?.partner_name,
                relationshipType: user?.partner?.relationship_type,
                anniversary_date: user?.partner?.anniversary_date,
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
                        { user?.partner && (
                            <div className="form space-y-6">
                                <Text
                                    className="text-primary"
                                    type="h4"
                                    title="Relationship Details"
                                />
                                <FormField
                                    name="partner_name"
                                    label="Partner's Name"
                                    className="h-12"
                                />
                                <FormSelect
                                    name="relationship_type"
                                    label="Relationship Type"
                                    options={[
                                        { label: "Spouse", value: "spouse" },
                                        { label: "Girlfriend", value: "girlfriend" }
                                    ]}
                                />
                                <DatePicker
                                    name="anniversary_date"
                                    label="Anniversary Date"
                                    isOptional={true}
                                />
                            </div>
                        )}
                    </div>
                </FormModal>
            )}
        </Formik>
    )
}

export default EditUser;