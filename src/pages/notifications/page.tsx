import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { type Notification } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import { notifications } from "../../data/notification";
import ManageNotification from "./_components/ManageNotifications";
import NotificationDetails from "./_components/NotificationDetails";
import DeleteNotification from "./_components/DeleteNotifications";

const columns: ColumnDef<Notification>[] = [
    {
        accessorKey: "title",
        header: "Subject",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("title")}</span>
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
            if (status.toLowerCase() === "published") badgeVariant = "default";
            if (status.toLowerCase() === "scheduled") badgeVariant = "pending";
            if (status.toLowerCase() === "draft") badgeVariant = "ghost";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "ghost"}
                >
                    {status}
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
        accessorKey: "scheduledDate",
        header: "Last Updated",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("scheduledDate")))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<NotificationDetails notification={row.original} />}
                    Edit={<ManageNotification type="edit" notification={row.original} />}
                    Delete={<DeleteNotification />}
                />
            </div>
        )
    }
]

const Notifications = () => {
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
                <ReusableTable
                    data={notifications}
                    columns={columns}
                    searchKey="subject"
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
                                { label: "All users", value: "all" },
                                { label: "Registered users", value: "registered" },
                                { label: "New users", value: "new" },
                            ].map(c => ({ label: c.label, value: c.value }))
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Notifications;

