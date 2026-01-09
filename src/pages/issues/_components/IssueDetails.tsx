import { DetailsModal, ModalFieldItem, Text } from "../../../components";
import type { Issues } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { CircleCheck } from "lucide-react";

const IssueDetails = ({ issue } : { issue: Issues }) => {
  return (
    <DetailsModal
        title="Issues Details"
        ActionButton={(
            <div className="grid grid-cols-2 gap-4">
                <Button
                    className="rounded-full text-secondary h-12 bg-transparent border-primary text-white"
                    variant="outline"
                >
                    <span>Multiple Actions</span>
                </Button>


                <Button
                    className="rounded-full text-secondary h-12"
                >
                    <span>Mark as resolved</span>
                    <CircleCheck />
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
                        value={issue.user.name}
                        className="flex-row"
                    />
                    <ModalFieldItem
                        label="Email Address:"
                        value={issue.user.email}
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
                        value={issue.type}
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
                    value={issue.summary}
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
  )
}

export default IssueDetails;