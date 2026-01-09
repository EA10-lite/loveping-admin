import { DetailsModal, Text } from "../../../components";
import type { Nudge } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";
import { mergeClasses } from "../../../lib/mergeclasses";
import NudgeType from "./NudgeType";

const NudgeDetails = ({ nudge } : { nudge: Nudge }) => {
  return (
    <DetailsModal
        title="Nudge Details"
    >
        <div className="p-4 space-y-4">
            <div className="space-y-3">
                <Text
                    title="User Information"
                    type="h4"
                    className="text-primary font-medium"
                />

                <div className="space-y-2.5">
                    <Field label="Fullname" value={nudge.user.name} />
                    <Field label="Email Address" value={nudge.user.email} />
                    <Field label="User ID" value={`User ID: ${nudge.user._id}`} />
                </div>
            </div>
            <div className="space-y-3">
                <Text
                    title="Nudge Summary"
                    type="h4"
                    className="text-primary font-medium"
                />

                <div className="space-y-2.5">
                    <Field
                        label="Nudge Type:"
                        value={nudge.user.name} className="flex-row"
                        content={<NudgeType type={nudge.type} />}
                    />
                    <Field
                        label="Tone:"
                        value={nudge.tone.join(", ")} className="flex-row"
                    />
                    <Field
                        label="Status:"
                        value={nudge.status} className="flex-row text-primary"
                    />
                </div>
            </div>


            <div className="space-y-3">
                <Text
                    title="Nudge Content"
                    type="h4"
                    className="text-primary font-medium"
                />

                <Field value={nudge.content} />
            </div>

            <div className="space-y-3">
                <Text
                    title="Action Details"
                    type="h4"
                    className="text-primary font-medium"
                />

                <div className="space-y-2.5">
                    <Field
                        label="Created At:"
                        value={formatDateString(nudge.createdAt)}
                        className="flex-row"
                    />
                    <Field
                        label="Last Updated:"
                        value={formatDateString(nudge.updatedAt)}
                        className="flex-row"
                    />
                </div>
            </div>
        </div>
    </DetailsModal>
  )
}

const Field = ({
    label,
    value,
    className,
    content,
} : {
    label?: string;
    value?: string;
    className?: string;
    content?: React.ReactNode;
}) => {
    return (
        <div className={mergeClasses(`flex flex-col gap-1.5`, className)}>
            {label && (
                <Text
                    title={label}
                    type="h4"
                    className="text-white"
                />
            )}


            {content && content}

            {value && !content && (
                <Text
                    title={value}
                    type="p"
                    className={mergeClasses("text-grey", className)}
                />
            )}
        </div>
    )
}

export default NudgeDetails;