import { QueryErrorState, ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type ContactMessage } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../../components/ui/badge";
import { getContactMessages } from "../../services/contact.service";
import ContactDetails from "./_components/ContactDetails";
import ReplyCustomer from "./_components/ReplyCustomer";
import { exportToCSV } from "../../utils/exportToCSV";

const columns: ColumnDef<ContactMessage>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <span className="text-sm text-white">{row.getValue("name")}</span>
            )
        }
    },
    {
        accessorKey: "email_address",
        header: "Email",
        cell: ({ row }) => {
            return (
                <span className="text-sm text-white">{row.getValue("email_address")}</span>
            )
        }
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                {row.getValue("message")}
            </span>
        )
    },
    {
        accessorKey: "replies",
        header: "Replied",
        cell: ({ row }) => {
            const hasReplied = row.original.replied_at;
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={hasReplied ? "default" : "pending"}
                >
                    {hasReplied ? "True" : "False"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Sudmitted At",
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
                    View={<ContactDetails contact={row.original} />}
                    Edit={<ReplyCustomer _id={row.original._id} />}
                />
            </div>
        )
    }
]

const Contact = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: feedbacksData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['contacts', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getContactMessages({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const handleExport = () => {
        if (!feedbacksData?.data) return;

        const dataToExport = feedbacksData.data.map((contact: ContactMessage) => ({
            "Name": contact.name,
            "Email": contact.email_address,
            "Message": contact.message,
            "Replied": contact.replied_at ? "True" : "False",
            "Submitted At": formatDateString(contact.createdAt)
        }));

        exportToCSV(dataToExport, "contacts");
    };

    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Contact Messages"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                        disabled={isLoading || isError || !feedbacksData?.data.length}
                        onClick={handleExport}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                {isError ? (
                    <QueryErrorState
                        error={error}
                        onRetry={() => refetch()}
                        title="Couldn't load feedback"
                    />
                ) : (
                    <ReusableTable
                        data={feedbacksData?.data || []}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        pageCount={feedbacksData?.totalPages || 1}
                        manualPagination={true}
                        isLoading={isLoading}
                        columns={columns}
                        searchKeys={["message"]}
                    />
                )}
            </div>
        </div>
    )
}

export default Contact;

