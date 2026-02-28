import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type FullUser } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ResetPassword from "./_components/ResetPassword";
import EditUser from "./_components/EditUser";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users.service";
import { Badge } from "../../components/ui/badge";

// {
//     "id": "69a2f5c3d84df0b7396162d3",
//     "full_name": "Afolabi Damilare",
//     "email_address": "afolabidamilar329@gmail.com",
//     "user_type": "ping_user",
//     "profile_visibility": true,
//     "is_verified": false,
//     "daily_nudge": true,
//     "special_occassion_reminders": true,
//     "silent_mode": false,
//     "language": "english",
//     "createdAt": "2026-02-28T14:03:47.299Z",
//     "updatedAt": "2026-02-28T14:03:47.299Z",
//     "partner": null
// }

const columns: ColumnDef<FullUser>[] = [
    {
        accessorKey: "full_name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <span className="text-white">{row.getValue("full_name")}</span>
            )
        }
    },
    {
        accessorKey: "partner",
        header: "Linked Partner",
        cell: ({ row }) => {
            const partner = row.original.partner
            return (
                <span className="text-white">{partner?.name || "N/A"}</span>
            )
        }
    },
    {
        accessorKey: "user_type",
        header: "Account Type",
        cell: ({ row }) => (
            <Badge variant="default">{row.getValue("user_type")}</Badge>
            // <span className="text-white capitalize">{row.getValue("user_type")}</span>
        )
    },
    {
        accessorKey: "email_address",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("email_address")}</span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Created Date",
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
                    View={(
                        <Link
                            to={`/users/${row.original.id}`}
                            className="flex items-center gap-2 bg-transparent hover:bg-[#143C2B] text-primary rounded-xs w-full justify-start p-1.5 px-2"
                        >
                            <Eye className="size-4 text-primary" />
                            <span className="text-primary">View</span>
                        </Link>
                    )}
                    Edit={<EditUser user={row.original} />}
                    Delete={<ResetPassword
                        name={row.original.full_name}
                        email={row.original.email_address}
                    />}
                />
            </div>
        )
    }
]

const Users = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: usersData, isLoading } = useQuery({
        queryKey: ['users', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getUsers({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });
    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Users"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export Users</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={usersData?.data || []}
                    columns={columns}
                    searchKeys={["full_name", "email_address", "user_type"]}
                    manualPagination={true}
                    pageCount={usersData?.totalPages || 1}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    isLoading={isLoading}
                    filters={[
                        {
                            columnKey: "user_type",
                            title: "Account Type",
                            options: ["guest", "registered"].map(c => ({ label: c, value: c }))
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default Users;

