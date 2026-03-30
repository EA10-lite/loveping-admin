import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import { SheetClose } from "../../../components/ui/sheet";
import type { Emails } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";

const EmailDetails = ({ email }: { email: Emails }) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const bodyContent = email.body || "";
    const plainBodyContent = bodyContent.replace(/<[^>]*>/g, "");
    const isBodyLong = plainBodyContent.length > 200;
    const displayedBody = visible || !isBodyLong
        ? plainBodyContent
        : `${plainBodyContent.slice(0, 200)}...`;

    return (
        <DetailsModal
            title="Email Details"
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) setVisible(false);
            }}
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
                            value={email?.status === "sent" ? formatDateString(new Date(email?.sent_at || "")) : email?.scheduled_at ? formatDateString(new Date(email?.scheduled_at)) : ""}
                        />
                        <ModalFieldItem
                            label="Body"
                            content={<div className="text-white whitespace-pre-wrap break-words">{displayedBody}</div>}
                            className="space-y-2.5"
                        />

                        {isBodyLong && (
                            <p
                                className="text-sm font-medium text-primary underline cursor-pointer"
                                onClick={() => setVisible(!visible)}
                            >
                                <span>{visible ? "Show Less" : "Show More"}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default EmailDetails;