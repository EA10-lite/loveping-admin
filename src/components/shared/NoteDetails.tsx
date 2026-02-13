import { DetailsModal, ModalFieldItem, Text } from "../";
import type { Note } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";

const NoteDetails = ({ note }: { note: Note }) => {
    return (
        <DetailsModal
            title="Nudge Details"
        >
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <Text
                        title="User Information"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem label="Fullname" value={note.user.full_name} />
                        <ModalFieldItem label="Email Address" value={note.user.email_address} />
                        <ModalFieldItem label="User ID" value={`User ID: ${note.user._id}`} />
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
                            value={formatDateString(note.createdAt)}
                            className="flex-row"
                        />
                        <ModalFieldItem
                            label="Last Updated:"
                            value={formatDateString(note.updatedAt)}
                            className="flex-row"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Content"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <ModalFieldItem value={note.message} />
                </div>
            </div>
        </DetailsModal>
    )
}

export default NoteDetails;