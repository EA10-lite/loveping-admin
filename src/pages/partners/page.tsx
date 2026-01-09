import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { type Partner } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import ManagePartner from "./_components/ManagePartners";
import { partners } from "../../data/partner";
import { Badge } from "../../components/ui/badge";
import PartnerDetails from "./_components/PartnerDetails";

const columns: ColumnDef<Partner>[] = [
    {
        accessorKey: "name",
        header: "Partner Name",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("name")}</span>
        )
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("category")}</span>
        )
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                {row.getValue("description")}
            </span>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "active") badgeVariant = "default";
            if (status.toLowerCase() === "inactive") badgeVariant = "ghost";
            return (
                <Badge
                    className={`hover:bg-[#05251C]/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary" | "ghost"}
                >
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "website",
        header: "Website",
        cell: ({ row }) => (
            <span className="text-white underline">
                {row.getValue("website")}
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Added On",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("createdAt")))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<PartnerDetails partner={row.original} />}
                    Edit={<ManagePartner type="edit" partner={row.original} />}
                />
            </div>
        )
    }
]

const Partners = () => {
    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Partners"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <ManagePartner type="add" />
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={partners}
                    columns={columns}
                    searchKey="content"
                    filters={[
                        {
                            columnKey: "category",
                            title: "Category",
                            options: [
                                "gift",
                                "florist",
                                "tech",
                                "experience",
                                "chocolatier"
                            ].map(c => ({ label: c, value: c }))
                        },
                        {
                            columnKey: "status",
                            title: "Status",
                            options: [
                                "active",
                                "inactive"
                            ].map(c => ({ label: c, value: c }))
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Partners;

