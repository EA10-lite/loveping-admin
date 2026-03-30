import { QueryErrorState, ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Emails as EmailRecord, type FullUser } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import EmailDetails from "./_components/EmailDetails";
import ManageEmail from "./_components/ManageEmail";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getEmails } from "../../services/email.service";

const columns: ColumnDef<EmailRecord>[] = [
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("subject")}</span>
        )
    },
    {
        accessorKey: "recipient_type",
        header: "Audience",
        cell: ({ row }) => {
            const recipient_type = row.getValue("recipient_type") as string;

            let badgeVariant = "secondary";
            if (recipient_type.toLowerCase() === "all") badgeVariant = "purple";
            if (recipient_type.toLowerCase() === "new") badgeVariant = "pending";
            if (recipient_type.toLowerCase() === "registered") badgeVariant = "primary";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "purple"}
                >
                    {
                        recipient_type.toLowerCase() === "all" ? "All Users" :
                            recipient_type.toLowerCase() === "new_users" ? "New Users" :
                                recipient_type.toLowerCase() === "user" ? "User" :
                                    recipient_type.toLowerCase() === "group" ? "Group" :
                                        "All Users"
                    }
                </Badge>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "sent") badgeVariant = "default";
            if (status.toLowerCase() === "schedule_for_later") badgeVariant = "pending";
            if (status.toLowerCase() === "draft") badgeVariant = "ghost";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "ghost"}
                >
                    {status.toLowerCase() === "sent" ? "Sent" :
                        status.toLowerCase() === "schedule_for_later" ? "Schedule" :
                            status.toLowerCase() === "draft" ? "Draft" :
                                "Send Now"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Last Updated",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("createdAt")))}
            </span>
        )
    },
    {
        accessorKey: "createdByUser",
        header: "CreatedBy",
        cell: ({ row }) => {
            const created_by = row.getValue("createdByUser") as FullUser;
            return (
                <span className="text-white">
                    {created_by?.name || "Admin"}
                </span>
            )
        }
    },
    {
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<EmailDetails email={row.original} />}
                    Edit={<ManageEmail type="edit" email={row.original} />}
                />
            </div>
        )
    }
]

const EmailsPage = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: emailsData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['emails', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getEmails({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });


    return (
        <div className="emails">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Emails"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <ManageEmail type="add" />
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                {isError ? (
                    <QueryErrorState
                        error={error}
                        onRetry={() => refetch()}
                        title="Couldn't load emails"
                    />
                ) : (
                    <ReusableTable
                        data={emailsData?.data || []}
                        columns={columns}
                        searchKeys={["title", "status"]}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        pageCount={emailsData?.totalPages || 1}
                        manualPagination={true}
                        isLoading={isLoading}
                        filters={[
                            {
                                columnKey: "status",
                                title: "Status",
                                options: [
                                    "Published",
                                    "Scheduled",
                                    "Draft"
                                ].map(c => ({ label: c, value: c }))
                            },
                            {
                                columnKey: "audience",
                                title: "Audience",
                                options: [
                                    "All",
                                    "New"
                                ].map(c => ({ label: c, value: c }))
                            }
                        ]}
                    />
                )}
            </div>
        </div>
    )
}

export default EmailsPage;

