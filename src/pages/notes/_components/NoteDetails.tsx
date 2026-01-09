import { DetailsModal, Text } from "../../../components";
import type { Note } from "../../../utils/types";
import { formatDateString } from "../../../utils/formatter";
import { mergeClasses } from "../../../lib/mergeclasses";

const NoteDetails = ({ note } : { note: Note }) => {
  return (
    <DetailsModal
        title="Nudge Details"
    >
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <Text
                    title="User Information"
                    type="h4"
                    className="text-primary font-medium"
                />

                <div className="space-y-2.5">
                    <Field label="Fullname" value={note.user.name} />
                    <Field label="Email Address" value={note.user.email} />
                    <Field label="User ID" value={`User ID: ${note.user._id}`} />
                </div>
            </div>
            <div className="space-y-4">
                <Text
                    title="Action Details"
                    type="h4"
                    className="text-primary font-medium"
                />

                <div className="space-y-2.5">
                    <Field
                        label="Created At:"
                        value={formatDateString(note.createdAt)}
                        className="flex-row"
                    />
                    <Field
                        label="Last Updated:"
                        value={formatDateString(note.updatedAt)}
                        className="flex-row"
                    />
                </div>
            </div>
            <div className="space-y-4">
                <Text
                    title="Content"
                    type="h4"
                    className="text-primary font-medium"
                />

                <Field value={note.content} />
            </div>
        </div>
    </DetailsModal>
  )
}

const Field = ({
    label,
    value,
    className
} : {
    label?: string;
    value: string,
    className?: string
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

            <Text
                title={value}
                type="p"
                className="text-grey"
            />
        </div>
    )
}

export default NoteDetails;