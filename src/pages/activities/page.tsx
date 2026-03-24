import { PiExport } from "react-icons/pi";
import { QueryErrorState, ReusableTable, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import type { Activity } from "../../utils/types";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Bell, Bot, CircleUserRound, Gift, Sparkles, Star } from "lucide-react";
import { formatTime } from "../../utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../services/activites.service";
import { useState } from "react";


const Activites = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: activitiesData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['activites', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getActivities({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const getType = (type: string) => {
        let formattedType = "";

        if (type.includes("ping")) {
            formattedType = "nudge";
        } else if (type.includes("auth") || type.includes("profile")) {
            formattedType = "account";
        } else if (type.includes("feedback")) {
            formattedType = "feedback";
        } else if (type.includes("gift")) {
            formattedType = "gift";
        } else if (type.includes("nudge")) {
            formattedType = "nudge";
        } else if (type.includes("notification")) {
            formattedType = "notification";
        } else if (type.includes("generated")) {
            formattedType = "generated";
        }

        return formattedType;
    }

    const columns: ColumnDef<Activity>[] = [
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.original.type as string;
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#103C28] border-[0.5px] border-primary/10 rounded-full flex items-center justify-center">
                            {getType(type) === "gift" && <Gift className="text-primary size-4" />}
                            {getType(type) === "nudge" && <Sparkles className="text-primary size-4" />}
                            {getType(type) === "feedback" && <Star className="text-primary size-4" />}
                            {getType(type) === "notification" && <Bell className="text-primary size-4" />}
                            {getType(type) === "account" && <CircleUserRound className="text-primary size-4" />}
                            {getType(type) === "generated" && <Bot className="text-primary size-4" />}
                        </div>
                        <div className="">
                            <Text
                                title={row.original.message}
                                type="p"
                                letterSpacing={"-2%"}
                            />
                            <Text
                                title={`${getType(row.original.type)} • ${formatTime(row.original.createdAt)}`}
                                type="p"
                                letterSpacing={"-2%"}
                                className="text-xs text-grey capitalize"
                            />
                        </div>
                    </div>
                )
            }
        },
    ]

    return (
        <div className="activities">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Activites"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <ActivitiesSkeleton />
            ) : isError ? (
                <QueryErrorState
                    className="mt-6"
                    error={error}
                    onRetry={() => refetch()}
                    title="Couldn't load activities"
                />
            ) : activitiesData ? (
                <div className="page-body mt-6">
                    <ReusableTable
                        data={activitiesData?.data || []}
                        columns={columns}
                        searchKeys={["message", "type"]}
                        showHeader={false}
                        manualPagination={true}
                        pageCount={activitiesData?.totalPages || 1}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        filters={[
                            {
                                columnKey: "type",
                                title: "Type",
                                options: ["ping", "auth", "profile", "feedback", "gift", "nudge", "notification", "generated"].map(c => ({ label: c, value: c }))
                            },
                        ]}
                    />

                </div>
            ) : null}
        </div>
    )
}

const ActivitiesSkeleton = () => {
    return (
        <div className="activities">
            <div className="page-body mt-6 rounded-xl border border-primary/10 p-4 space-y-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-primary/10 shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4 bg-primary/10" />
                            <Skeleton className="h-3 w-1/2 bg-primary/10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activites;