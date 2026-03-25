import { DetailsModal, ModalFieldItem, Text } from "../../../components";
import type { ContactMessage } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";

const ContactDetails = ({ contact }: { contact: ContactMessage }) => {
    return (
        <DetailsModal
            title="Contact Details"
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
                            value={contact.user?.name || contact.user?.full_name}
                        />
                        <ModalFieldItem
                            label="Email Address"
                            value={contact.user?.email || contact.user?.email_address}
                        />
                        <ModalFieldItem
                            label="User ID"
                            value={contact.user?._id || ""}
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
                            value={formatDateString(contact.createdAt)}
                            className="flex-row"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Email Address"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <div className="space-y-2.5">
                        <ModalFieldItem
                            value={contact.email_address}
                            className="text-white"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <Text
                        title="Message"
                        type="h4"
                        className="text-primary font-medium"
                    />

                    <ModalFieldItem value={contact.message} />
                </div>
                {contact.replies.length > 0 && (
                    <div className="space-y-4">
                        <Text
                            title="Replies"
                            type="h4"
                            className="text-primary font-medium"
                        />

                        <div className="space-y-2.5">
                            {contact.replies.map((reply) => (
                                <>
                                    <ModalFieldItem
                                        label={formatDateString(reply.sent_at)}
                                        value={reply.message}
                                        className=""
                                    />
                                    <ModalFieldItem
                                        label={"Replied By:"}
                                        value={reply.sent_by.full_name}
                                        className="flex-row"
                                    />
                                </>
                            ))}

                        </div>
                    </div>
                )}
            </div>
        </DetailsModal>
    )
}


export default ContactDetails;