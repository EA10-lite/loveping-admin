import { ReusableTable, StarRating, TableAction, Truncate } from "../../../../components";
import { type ColumnDef } from "@tanstack/react-table";
import { type Feedback as FeedbackType } from "../../../../utils/types";
import { formatDateString } from "../../../../utils/formatter";
import { DeleteFeedback, FeedbackDetails } from "../../../../components/shared";

const columns: ColumnDef<FeedbackType>[] = [
    {
        accessorKey: "rating",
        header: "Rating/Type",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <StarRating rating={row.getValue("rating")} />
                <span className="text-white capitalize">{row.original.type}</span>
            </div>
        )
    },
    {
        accessorKey: "message",
        header: "Feedback Preview",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                <Truncate text={row.original.message} maxLength={20} />
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Sudmitted on",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(row.getValue("createdAt"))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<FeedbackDetails feedback={row.original} />}
                    Delete={<DeleteFeedback hasTrigger={true} />}
                />
            </div>
        )
    }
]

const Feedback = ({ feedbacks } : { feedbacks:  FeedbackType[]}) => {
    return (
        <div className="notes">
            <ReusableTable
                data={feedbacks}
                columns={columns}
                searchKey="summary"
                filters={[
                    {
                        columnKey: "type",
                        title: "Type",
                        options: ["Bug", "Feature", "Improvement"].map(c => ({ label: c, value: c }))
                    },
                    {
                        columnKey: "status",
                        title: "Status",
                        options: ["new", "resolved", "closed"].map(s => ({ label: s, value: s }))
                    }
                ]}
            />
        </div>
    )
}

export default Feedback;

