import { RotateCw } from "lucide-react";
import { ActionModal, Text } from "../../../components";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";


const ResetPassword = ({ onSuccess, name, email }: { onSuccess?: () => void, name: string, email: string }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [reseting, setReseting] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            setReseting(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Reset password link sent")
            onSuccess?.();
            setOpen(false);
        } catch (error) {
            console.log("error:", error);
            toast.error("Failed to reset password")
        } finally {
            setReseting(false);
        }
    }
    return (
        <ActionModal
            buttonTitle="Delete Feedback"
            buttonType="destructive"
            TriggerButton={(
                <Button
                    className="bg-transparent hover:bg-[#143C2B] text-primary rounded-xs w-full justify-start p-1.5"
                >
                    <RotateCw className="text-primary" />
                    <span>Reset Password</span>
                </Button>
            )}
            open={open}
            onOpenChange={setOpen}
        >
            <div className="space-y-6">
                <div className="">
                    <div className="hexagon flex items-center justify-center bg-primary/5 mx-auto">
                        <RotateCw className="text-primary size-6" />
                    </div>
                </div>


                <div className="text-center space-y-2">
                    <Text
                        title="Reset Password"
                        type="h4"
                        className="text-base text-white"
                    />
                    <Text
                        title="You are about to send a password reset link to:"
                        type="p"
                        className="text-grey"
                    />
                    <div className="">
                        <Text
                            title={`Name: ${name}`}
                            type="p"
                            className="text-grey"
                        />
                        <Text
                            title={`Email: ${email}`}
                            type="p"
                            className="text-grey"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Button
                        variant="default"
                        className="rounded-full h-12 w-full"
                        onClick={handleDelete}
                        disabled={reseting}
                    >
                        {reseting ? (
                            <LuLoaderCircle className="animate-spin text-white" />
                        ) : (
                            <span>Send Reset Link</span>
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        className="rounded-full h-12 w-full"
                        disabled={reseting}
                        onClick={() => setOpen(false)}
                    >
                        <span>Cancel</span>
                    </Button>
                </div>
            </div>
        </ActionModal>
    )
}

export default ResetPassword;