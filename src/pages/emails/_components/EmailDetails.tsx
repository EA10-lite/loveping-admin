import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import { SheetClose } from "../../../components/ui/sheet";
import type { Emails } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";

const EmailDetails = ({ email }: { email: Emails }) => {
    const [open, setOpen] = useState(false);
    return (
        <DetailsModal
            title="Email Details"
            open={open}
            onOpenChange={setOpen}
            ActionButton={(
                <div className="flex flex-col gap-3">
                    <SheetClose>
                        <Button
                            variant="default"
                            className="h-12 rounded-full w-full"
                        >
                            <span>Close</span>
                        </Button>
                    </SheetClose>
                </div>
            )}
        >
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Subject"
                            value={email.subject}
                        />
                        <ModalFieldItem
                            label="Audience"
                            value={email.recipient_type}
                            className="capitalize"
                        />
                        <ModalFieldItem
                            label={email?.status === "sent" ? "Sent on" : "Scheduled on"}
                            value={email?.status === "sent" ? formatDateString(new Date(email?.sentAt || "")) : email?.scheduled_at ? formatDateString(new Date(email?.scheduled_at)) : ""}
                        />
                        <ModalFieldItem
                            label="Body"
                            value={email.body}
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default EmailDetails;