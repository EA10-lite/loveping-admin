import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import { SheetClose } from "../../../components/ui/sheet";
import type { Notification } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";

const NotificationDetails = ({ notification }: { notification: Notification }) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const bodyContent = notification.body || "";
    const plainBodyContent = bodyContent.replace(/<[^>]*>/g, "");
    const isBodyLong = plainBodyContent.length > 200;
    const displayedBody = visible || !isBodyLong
        ? plainBodyContent
        : `${plainBodyContent.slice(0, 200)}...`;
    return (
        <DetailsModal
            title="Notification Details"
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
                            value={notification.subject}
                        />
                        <ModalFieldItem
                            label="Audience"
                            value={notification.audience}
                            className="capitalize"
                        />
                        <ModalFieldItem
                            label="URL"
                            value={notification.url || "N/A"}
                            className={notification.url ? "underline" : ""}
                        />
                        <ModalFieldItem
                            label="Message"
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

                        <ModalFieldItem
                            label="Sent on"
                            value={notification?.updatedAt ? formatDateString(new Date(notification?.updatedAt)) : ""}
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default NotificationDetails;