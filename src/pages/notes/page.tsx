import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { notes } from "../../data/note";
import { type ColumnDef } from "@tanstack/react-table";
import { type Note } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { NoteDetails } from "../../components/shared";

const columns: ColumnDef<Note>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.name}</span>
            )
        }
    },
    {
        accessorKey: "content",
        header: "Note Preview",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("content")}</span>
        )
    },
    {
        accessorKey: "category",
        header: "Type/Category",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                {row.getValue("category")}
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("createdAt")))}
            </span>
        )
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("updatedAt")))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<NoteDetails note={row.original} />}
                />
            </div>
        )
    }
]

const Notes = () => {
    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Notes"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={notes}
                    columns={columns}
                    searchKeys={["content", "category"]}
                    filters={[
                        {
                            columnKey: "category",
                            title: "Type/Category",
                            options: [
                                { label: "Romantic", value: "romantic" },
                                { label: "Playful", value: "playful" },
                                { label: "Deep & Thoughtful", value: "deep_n_thoughful" },
                                { label: "Supportive", value: "suppportive" },
                                { label: "Funny/Lighthearted", value: "funny_n_lighthearted" }
                            ].map(c => ({ label: c.label, value: c.value }))
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Notes;

