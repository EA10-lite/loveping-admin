import { useState } from "react";
import { DetailsModal, ModalFieldItem } from "../../../components";
import { Button } from "../../../components/ui/button";
import type { FAQ } from "../../../utils/types";
import ManageFAQ from "./ManageFAQ";
import { SheetClose } from "../../../components/ui/sheet";

const FAQDetails = ({ faq }: { faq: FAQ }) => {
    const [open, setOpen] = useState(false);
    return (
        <DetailsModal
            title="FAQ Review"
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
                    <ManageFAQ
                        type="edit-alt"
                        faq={faq}
                    />
                </div>
            )}
        >
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2.5">
                        <ModalFieldItem
                            label="Question"
                            value={faq.question}
                        />
                        <ModalFieldItem
                            label="Category"
                            value={faq.category}
                        />
                        <ModalFieldItem
                            label="Status"
                            value={faq.status}
                        />
                        <ModalFieldItem
                            label="Answer"
                            value={faq.answer}
                        />
                    </div>
                </div>
            </div>
        </DetailsModal>
    )
}

export default FAQDetails;