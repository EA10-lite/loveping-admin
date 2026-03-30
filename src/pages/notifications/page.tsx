import { QueryErrorState, ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Notification } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import ManageNotification from "./_components/ManageNotifications";
import NotificationDetails from "./_components/NotificationDetails";
import DeleteNotification from "./_components/DeleteNotifications";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/notification.service";
import { useState } from "react";

const columns: ColumnDef<Notification>[] = [
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("subject")}</span>
        )
    },
    {
        accessorKey: "audience",
        header: "Audience",
        cell: ({ row }) => {
            const audience = row.getValue("audience") as string;

            let badgeVariant = "secondary";
            if (audience.toLowerCase() === "all") badgeVariant = "purple";
            if (audience.toLowerCase() === "new") badgeVariant = "pending";
            if (audience.toLowerCase() === "registered") badgeVariant = "primary";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "purple"}
                >
                    {
                        audience.toLowerCase() === "all" ? "All Users" :
                            audience.toLowerCase() === "new" ? "New Users" : "Registered Users"
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
            if (status?.toLowerCase() === "published") badgeVariant = "default";
            if (status?.toLowerCase() === "scheduled") badgeVariant = "pending";
            if (status?.toLowerCase() === "draft") badgeVariant = "ghost";
            if(!status) badgeVariant = "default";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "ghost" | "secondary"}
                >
                    {status || "Created"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => row.getValue("url") ? (
            <a href={row.getValue("url")} className="text-primary underline">
                {row.getValue("url")}
            </a>
        ) : (
            <span className="text-primary">
                -
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

        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<NotificationDetails notification={row.original} />}
                    Delete={<DeleteNotification />}
                />
            </div>
        )
    }
]

const Notifications = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: notificationsData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['notifications', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getNotifications({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });
    return (
        <div className="notifcations">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Notifications"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <ManageNotification type="add" />
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                {isError ? (
                    <QueryErrorState
                        error={error}
                        onRetry={() => refetch()}
                        title="Couldn't load notifications"
                    />
                ) : (
                    <ReusableTable
                        data={notificationsData?.data || []}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        pageCount={notificationsData?.totalPages || 1}
                        manualPagination={true}
                        isLoading={isLoading}
                        columns={columns}
                        searchKeys={["subject", "message", "url"]}
                    />
                )}
            </div>
        </div>
    )
}

export default Notifications;

