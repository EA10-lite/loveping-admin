import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef } from "@tanstack/react-table";
import { type FullUser } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { users } from "../../data/users";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ResetPassword from "./_components/ResetPassword";
import EditUser from "./_components/EditUser";

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
                <span className="text-white">{partner.name}</span>
            )
        }
    },
    {
        accessorKey: "accountType",
        header: "Account Type",
        cell: ({ row }) => (
            <span className="text-white capitalize">{row.getValue("accountType")}</span>
        )
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("email")}</span>
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
                            to={`/users/${row.original._id}`}
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
                    data={users}
                    columns={columns}
                    searchKeys={["name", "email", "accountType"]}
                    filters={[
                        {
                            columnKey: "accountType",
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

