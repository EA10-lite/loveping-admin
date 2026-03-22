import { DetailsModal, ModalFieldItem, Text } from "../../../components";
import type { Issues } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import { CircleCheck, ChevronDown, Loader2, Check, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteIssues, updateIssues } from "../../../services/issues.service";

const IssueDetails = ({ issue }: { issue: Issues }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState("");

    const [selectedAction, setSelectedAction] = useState<"in_review" | "delete" | null>(null);

    useEffect(() => {
        // Ensures "no action selected" when the modal is reopened.
        if (!open) setSelectedAction(null);
    }, [open]);

    const handleUpdate = async (actionType: "resolved" | "in_review") => {
        try {
            setLoading(true);
            await updateIssues(issue._id, {
                internal_note: note,
                status: actionType,
                issue_type: issue.issue_type as "bug" | "payment" | "privacy" | "other" | "rating"
            });
            toast.success("Issue marked as resolved", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            });
            queryClient.invalidateQueries({ queryKey: ["issues"] });
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

    const [deleting, setDeleting] = useState(false);
    const handleMultipleAction = async (actionType: "delete" | "in_review") => {
        try {
            setDeleting(true);
            if (actionType === "delete") {
                await deleteIssues(issue._id);
            } else {
                await updateIssues(issue._id, {
                    internal_note: note,
                    status: "in_review",
                    issue_type: issue.issue_type as "bug" | "payment" | "privacy" | "other" | "rating"
                });
            }
            toast.success(
                actionType === "delete" ? "Issue deleted successfully" : "Issue updated to in review",
                {
                    icon: (
                        <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                            {actionType === "delete" ? (
                                <Trash2 className="size-4 text-primary" />
                            ) : (
                                <Check className="size-4 text-primary" />
                            )}
                        </div>
                    )
                }
            );
            queryClient.invalidateQueries({ queryKey: ["issues"] });
            setOpen(false);
        } catch (error) {
            console.log("error:", error);
            toast.error(
                actionType === "delete" ? "Failed to delete issue" : "Failed to update issue to in review",
                {
                    icon: (
                        <div className="flex items-center justify-center w-8 h-8 rounded-md primary/10 mr-4">
                            <X className="size-4 text-primary" />
                        </div>
                    )
                }
            );
        } finally {
            setDeleting(false);
        }
    };

    const triggerLabel =
        selectedAction === "delete"
            ? "Delete"
            : selectedAction === "in_review"
                ? "Update to in review"
                : "Multiple Actions";

    return (
        <>
            <DetailsModal
                title="Issues Details"
                open={open}
                onOpenChange={setOpen}
                ActionButton={issue.status !== "resolved" ? (
                    <div className="grid grid-cols-2 gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="rounded-full text-secondary h-12 bg-transparent border-primary text-white w-full"
                                    variant="outline"
                                    disabled={deleting || loading}
                                >
                                    {deleting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>{triggerLabel}</span>
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[260px] bg-secondary-muted border-[0.5px] border-primary/8 rounded-sm text-white shadow-sm p-3"
                                align="end"
                            >
                                <DropdownMenuItem
                                    disabled={deleting || loading}
                                    className="hover:bg-destructive p-0 bg-transparent text-white py-4 px-4 cursor-pointer"
                                    onSelect={() => {
                                        setSelectedAction("delete");
                                        void handleMultipleAction("delete");
                                    }}
                                >
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    disabled={deleting || loading}
                                    className="hover:bg-transparent p-0 bg-transparent text-white py-4 px-4 cursor-pointer"
                                    onSelect={() => {
                                        setSelectedAction("in_review");
                                        void handleMultipleAction("in_review");
                                    }}
                                >
                                    <span>Update to in review</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            className="rounded-full text-secondary h-12 w-full"
                            onClick={() => handleUpdate("resolved")}
                            disabled={loading || deleting}
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
                ) : null }
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
                                value={`${issue.user._id}`}
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

                    {issue.status !== "resolved" && (
                        <div className="space-y-1.5">
                            <Label className="text-white text-sm font-medium mb-2">
                                Internal Note
                                <span className="text-primary rounded-full px-2 bg-[#FFFFFF05] text-xs inline py-1">Optional</span>
                            </Label>
                            <Textarea
                                name="message"
                                className="min-h-[109px] border border-[#48D9621A] resize-none text-white"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    )}

                </div>
            </DetailsModal>
        </>
    )
}

export default IssueDetails;