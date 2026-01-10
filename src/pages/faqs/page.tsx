import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { type FAQ } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import FAQDetails from "./_components/FAQDetails";
import ManageFAQ from "./_components/ManageFAQ";
import { faqs } from "../../data/faq";

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
            <span className="text-white">{row.getValue("category")}</span>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "published") badgeVariant = "default";
            if (status.toLowerCase() === "draft") badgeVariant = "ghost";
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
                    data={faqs}
                    columns={columns}
                    searchKey="content"
                    filters={[
                        {
                            columnKey: "category",
                            title: "Category",
                            options: [
                                "Getting started",
                                "Nudges & AI",
                                "Gift & Wishlist",
                                "Notifications",
                                "Account Login",
                                "Privacy & Security"
                            ].map(c => ({ label: c, value: c }))
                        },
                        {
                            columnKey: "status",
                            title: "Status",
                            options: [
                                "published",
                                "draft"
                            ].map(c => ({ label: c, value: c }))
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default FAQs;

