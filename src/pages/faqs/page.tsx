import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type FAQ } from "../../services/faq.service";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import FAQDetails from "./_components/FAQDetails";
import ManageFAQ from "./_components/ManageFAQ";
import { useQuery } from "@tanstack/react-query";
import { getFAQs } from "../../services/faq.service";
import { useState } from "react";

const columns: ColumnDef<FAQ>[] = [
    {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("question")}</span>
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "published") badgeVariant = "default";
            if (status.toLowerCase() === "unpublished") badgeVariant = "ghost";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary" | "ghost"}
                >
                    {status}
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
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<FAQDetails faq={row.original} />}
                    Edit={<ManageFAQ type="edit" faq={row.original} />}
                />
            </div>
        )
    }
]

const FAQs = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: faqData, isLoading } = useQuery({
        queryKey: ['faqs', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getFAQs({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="FAQs"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <ManageFAQ type="add" />
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={faqData?.data || []}
                    columns={columns}
                    manualPagination={true}
                    pageCount={faqData?.totalPages || 1}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    isLoading={isLoading}
                    searchKeys={["question", "category"]}
                    filters={[
                        {
                            columnKey: "category",
                            title: "Category",
                            options: [
                                "getting_started",
                                "nudges_ai",
                                "gifts_waitlist",
                                "notifications",
                                "account_login",
                                "privacy_security"
                            ].map(c => ({ label: c.replace(/_/g, " "), value: c }))
                        },
                        {
                            columnKey: "status",
                            title: "Status",
                            options: [
                                "published",
                                "unpublished"
                            ].map(c => ({ label: c, value: c }))
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default FAQs;

