import { ReusableTable, TableAction, Truncate } from "../../../../components";
import { type ColumnDef } from "@tanstack/react-table";
import { type Nudge } from "../../../../utils/types";
import { formatDateString } from "../../../../utils/formatter";
import { Badge } from "../../../../components/ui/badge";
import { NudgeType } from "../../../../components";
import { NudgeDetails } from "../../../../components/shared";

const nudgeData = [
    {
        "_id": "69bbaaa7da2aa9cd88f9c89c",
        "user": "69b34cc37c9ef2225d3df753",
        "partner": "69bba49ada2aa9cd88f9c805",
        "date": "2026-03-19T07:49:59.406Z",
        "status": "delivered",
        "tones": [
            "romantic",
            "deep_n_thoughtful"
        ],
        "DayOfWeek": "thursday",
        "title": "Love Note",
        "message": "Oluwatunmise Adetokunbo, I just want you to know that i’ll choose you no matter what.",
        "ping_type": "text",
        "additional_message_list": [],
        "isSaved": true,
        "isNote": false,
        "createdAt": "2026-03-19T07:49:59.408Z",
        "updatedAt": "2026-03-19T07:49:59.408Z",
        "__v": 0
    },
]

interface UserNudge extends Nudge {
    username: string;
    partnername: string;
}

const columns: ColumnDef<UserNudge>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("user")}</span>
        )
    },
    {
        accessorKey: "partner",
        header: "Partner",
        cell: ({ row }) => (
            <span className="text-sm text-white">{row.getValue("partner")}</span>
        )
    },
    {
        accessorKey: "ping_type",
        header: "Nudge Type",
        cell: ({ row }) => <NudgeType type={row.getValue("ping_type")} />
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "completed") badgeVariant = "default";
            if (status.toLowerCase() === "pending") badgeVariant = "pending";
            if (status.toLowerCase() === "delivered") badgeVariant = "primary";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary"}
                >
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "message",
        header: "Preview",
        cell: ({ row }) => {
            const content = row.getValue("message") as string;
            return (
                <span className="text-white">
                    <Truncate text={content} />
                </span>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Generated At",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("createdAt")))}
            </span>
        )
    },
    {
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<NudgeDetails nudge={row.original} />}
                />
            </div>
        )
    }
]

const Nudges = ({ nudges, user, partner }: { nudges: Nudge[], user: string, partner: string }) => {
    console.log("nudges: ", nudges);

    const nudgeData = nudges.map(nudge => ({
        ...nudge,
        username: user,
        partnername: partner,

    }))
    return (
        <div className="notes">
            <ReusableTable
                data={nudgeData || []}
                columns={columns}
                searchKeys={["content", "type", "status"]}
                filters={[
                    {
                        columnKey: "type",
                        title: "Nudge Type",
                        options: [
                            "gift",
                            "call",
                            "text",
                        ].map(c => ({ label: c, value: c }))
                    },
                    {
                        columnKey: "status",
                        title: "Status",
                        options: ["completed", "pending"].map(s => ({ label: s, value: s }))
                    },
                    {
                        columnKey: "category",
                        title: "Tone/Category",
                        options: [
                            { label: "Romantic", value: "romantic" },
                            { label: "Playful", value: "playful" },
                            { label: "Deep & Thoughtful", value: "deep_n_thoughful" },
                            { label: "Supportive", value: "suppportive" },
                            { label: "Funny/Lighthearted", value: "funny_n_lighthearted" }
                        ].map(c => ({ label: c.label, value: c.value }))
                    },
                ]}
            />
        </div>
    )
}

export default Nudges;

