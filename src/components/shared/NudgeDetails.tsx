
import { DetailsModal, ModalFieldItem, Text, NudgeType } from "../";
import type { Nudge } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";

const NudgeDetails = ({ nudge }: { nudge: Nudge }) => {
    const user = typeof nudge.user === "string" ? null : nudge.user;
    const userId = typeof nudge.user === "string" ? nudge.user : nudge.user._id;

    return (
        <DetailsModal
            title="Nudge Details"
        >
            <div className="p-4 space-y-4">
                <div className="space-y-3">
                    <Text
                        title="User Information"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem label="Fullname" value={user?.full_name || "N/A"} />
                        <ModalFieldItem label="Email Address" value={user?.email_address || "N/A"} />
                        <ModalFieldItem label="User ID" value={`User ID: ${userId}`} />
                    </div>
                </div>
                <div className="space-y-3">
                    <Text
                        title="Nudge Summary"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Nudge Type:"
                            value={user?.full_name || "N/A"} className="flex-row items-center"
                            content={<NudgeType type={nudge.ping_type} />}
                        />
                        <ModalFieldItem
                            label="Tone:"
                            value={nudge.tones.join(", ")} className="flex-row"
                        />
                        <ModalFieldItem
                            label="Status:"
                            value={nudge.status} className="flex-row text-primary"
                        />
                    </div>
                </div>



                <div className="space-y-3">
                    <Text
                        title="Nudge Content"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <ModalFieldItem value={nudge.message} />
                </div>

                <div className="space-y-3">
                    <Text
                        title="Action Details"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Created At:"
                            value={formatDateString(nudge.createdAt)}
                            className="flex-row"
                        />
                        <ModalFieldItem
                            label="Last Updated:"
                            value={formatDateString(nudge.updatedAt)}
                            className="flex-row"
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}
export default NudgeDetails;