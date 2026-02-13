import { DetailsModal, ModalFieldItem, Text } from "../../../components";
import type { Issues } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { CircleCheck, ChevronDown, Loader2, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const IssueDetails = ({ issue }: { issue: Issues }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResolve = async () => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Issue marked as resolved", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            });
            setOpen(false);
        } catch (error) {
            console.log("error:", error);
            toast.error("Failed to mark issue as resolved", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                        <X className="size-4 text-primary" />
                    </div>
                )
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DetailsModal
                title="Issues Details"
                open={open}
                onOpenChange={setOpen}
                ActionButton={(
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            className="rounded-full text-secondary h-12 bg-transparent border-primary text-white w-full"
                            variant="outline"
                        >
                            <span>Multiple Actions</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            className="rounded-full text-secondary h-12 w-full"
                            onClick={handleResolve}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <span>Mark as resolved</span>
                                    <CircleCheck className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            >
                <div className="p-4 space-y-4">
                    <div className="space-y-3">
                        <Text
                            title="User Information"
                            type="h4"
                            className="text-primary font-medium"
                        />

                        <div className="space-y-2.5">
                            <ModalFieldItem
                                label="Name:"
                                value={issue.user.full_name}
                                className="flex-row"
                            />
                            <ModalFieldItem
                                label="Email Address:"
                                value={issue.user.email_address}
                                className="flex-row"
                            />
                            <ModalFieldItem
                                label="User ID:"
                                value={`User ID: ${issue.user._id}`}
                                className="flex-row"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Text
                            title="Issue Summary"
                            type="h4"
                            className="text-primary font-medium"
                        />

                        <div className="space-y-2.5">
                            <ModalFieldItem
                                label="Issue ID"
                                value={issue._id}
                            />
                            <ModalFieldItem
                                label="Status Badge"
                                value={issue.status}
                                className="text-[#FFA844] capitalize"
                            />
                            <ModalFieldItem
                                label="Category"
                                value={issue.issue_type}
                            />
                            <ModalFieldItem
                                label="Date Reported"
                                value={formatDateString(issue.createdAt)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Text
                            title="Issue Description"
                            type="h4"
                            className="text-primary font-medium"
                        />

                        <ModalFieldItem
                            value={issue.message}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-white text-sm font-medium mb-2">
                            Internal Note
                            <span className="text-primary rounded-full px-2 bg-[#FFFFFF05] text-xs inline py-1">Optional</span>
                        </Label>
                        <Textarea
                            name="message"
                            className="min-h-[109px] border border-[#48D9621A] resize-none text-white"
                        />
                    </div>

                </div>
            </DetailsModal>
        </>
    )
}

export default IssueDetails;