import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Note } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { NoteDetails } from "../../components/shared";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/notes.service";
import { exportToCSV } from "../../utils/exportToCSV";

const columns: ColumnDef<Note>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.full_name}</span>
            )
        }
    },
    {
        accessorKey: "message",
        header: "Note Preview",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("message")}</span>
        )
    },
    {
        accessorKey: "ping_type",
        header: "Type/Category",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                {row.getValue("ping_type")}
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
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: notesData, isLoading } = useQuery({
        queryKey: ['faqs', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getNotes({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });
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
                        disabled={isLoading || !notesData?.data.length}
                        onClick={() => exportToCSV(notesData?.data || [], "Notes")}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={notesData?.data || []}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    pageCount={notesData?.totalPages || 1}
                    manualPagination={true}
                    isLoading={isLoading}
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

