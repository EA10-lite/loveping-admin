import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import { SheetClose } from "../../../components/ui/sheet";
import type { Notification } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";

const NotificationDetails = ({ notification }: { notification: Notification }) => {
    const [open, setOpen] = useState(false);
    return (
        <DetailsModal
            title="Partner Details"
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
                            value={notification.title}
                        />
                        <ModalFieldItem
                            label="Audience"
                            value={notification.audience}
                        />
                        <ModalFieldItem
                            label="Sent on"
                            value={notification?.scheduledDate ? formatDateString(new Date(notification?.scheduledDate)) : ""}
                        />
                        <ModalFieldItem
                            label="Body"
                            value={notification.description}
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default NotificationDetails;