import { ReusableTable, TableAction, Truncate } from "../../../../components";
import { type ColumnDef } from "@tanstack/react-table";
import { type Feedback as FeedbackType } from "../../../../utils/types";
import { formatDateString } from "../../../../utils/formatter";
import { FeedbackDetails } from "../../../../components/shared";
import { Badge } from "../../../../components/ui/badge";

const columns: ColumnDef<FeedbackType>[] = [
    {
        accessorKey: "feedback_type",
        header: "Feedback Details",
        cell: ({ row }) => (
            <Badge
                className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                variant={row.getValue("feedback_type") === "positive" ? "default" : "destructive"}
            >
                {row.getValue("feedback_type")}
            </Badge>
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

        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<FeedbackDetails feedback={row.original} />}
                />
            </div>
        )
    }
]

const Feedback = ({ feedbacks }: { feedbacks: FeedbackType[] }) => {
    return (
        <div className="notes">
            <ReusableTable
                data={feedbacks}
                columns={columns}
                searchKeys={["message", "type", "status"]}
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

