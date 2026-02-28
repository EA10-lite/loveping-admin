import { DetailsModal, ModalFieldItem, Text } from "../";
import React from "react";
import type { Feedback } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import DeleteFeedback from "./DeleteFeedback";

const FeedbackDetails = ({ feedback }: { feedback: Feedback }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <DetailsModal
            title="Feedback Details"
            buttonTitle="Delete Feedback"
            buttonType="destructive"
            ActionButton={
                <DeleteFeedback
                    onSuccess={() => setOpen(false)}
                />
            }
            open={open}
            onOpenChange={setOpen}
        >
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <Text
                        title="User Information"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Fullname"
                            value={feedback.user?.name || feedback.user?.full_name}
                        />
                        <ModalFieldItem
                            label="Email Address"
                            value={feedback.user?.email || feedback.user?.email_address}
                        />
                        <ModalFieldItem
                            label="User ID"
                            value={`User ID: ${feedback.user._id || feedback?.user.id}`}
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Action Details"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Created At:"
                            value={formatDateString(feedback.createdAt)}
                            className="flex-row"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Feedback Details"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            value={feedback.feedback_type}
                            className="text-white capitalize"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Message"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <ModalFieldItem value={feedback.message} />
                </div>
            </div>
        </DetailsModal>
    )
}


export default FeedbackDetails;