import { useMemo, useState } from "react";
import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Partner } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import ManagePartner from "./_components/ManagePartners";
import { Badge } from "../../components/ui/badge";
import PartnerDetails from "./_components/PartnerDetails";
import { getPartners } from "../../services/partner.service";
import { useQuery } from "@tanstack/react-query";
import DeletePartner from "./_components/DeletePartner";

const Partners = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: partnersData, isLoading } = useQuery({
        queryKey: ['partners', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getPartners({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const columns = useMemo<ColumnDef<Partner>[]>(() => [
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
                <span className="text-white capitalize">{row.getValue("category")}</span>
            )
        },
        {
            accessorKey: "internal_note",
            header: "Internal Note",
            cell: ({ row }) => (
                <span className="text-white line-clamp-1 max-w-[300px]">
                    {row.getValue("internal_note") || "-"}
                </span>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            filterFn: "equals",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;

                let badgeVariant = "secondary";
                if (status.toLowerCase() === "active") badgeVariant = "default";
                if (status.toLowerCase() === "inactive") badgeVariant = "ghost";
                return (
                    <Badge
                        className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                        variant={badgeVariant as "default" | "secondary" | "ghost"}
                    >
                        {status}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "url",
            header: "Website",
            cell: ({ row }) => (
                <a href={row.getValue("url")} target="_blank" rel="noopener noreferrer" className="text-white underline">
                    {row.getValue("url")}
                </a>
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
                        Delete={<DeletePartner hasTrigger id={row.original._id} />}
                    />
                </div>
            )
        }
    ], []);

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
                    data={partnersData?.data || []}
                    columns={columns}
                    searchKeys={["name", "category", "internal_note", "url"]}
                    isLoading={isLoading}
                    onPaginationChange={setPagination}
                    pagination={pagination}
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

