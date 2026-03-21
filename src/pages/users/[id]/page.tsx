import { PiExport } from "react-icons/pi";
import { ModalFieldItem, Text } from "../../../components";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateString } from "../../../utils/formatter";
import {
    Activity,
    Feedback,
    Nudges,
    Notes,
} from "./_tabs";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui/tabs"
import { cn } from "../../../lib/utils";
import { useState } from "react";
import { getUserDetails } from "../../../services/users.service";
import { useQuery } from "@tanstack/react-query";

const EmptyPartnerState = () => (
    <div className="flex items-center justify-center rounded-md border border-dashed border-primary/20 bg-secondary py-10">
        <p className="text-sm text-muted-foreground">No partner added.</p>
    </div>
);

const UserDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserDetails(id?.toString() || ""),
    });

    const partner = userData?.partner;
    const pingsCount = userData?.pings_count;
    const nudges = userData?.nudges?.map((item) => {
        return {
            ...item,
            user: userData?.user?.full_name,
            partner: partner?.partner_name,
        }
    })

    const tabs = [
        {
            label: "Activity",
            value: "activity",
            Component: <Activity activities={[]} />
        },
        {
            label: "Nudges",
            value: "nudges",
            Component: <Nudges
                nudges={nudges || []}
                user={userData?.user?.full_name || "N/A"}
                partner={partner?.partner_name || "N/A"}
            />
        },
        {
            label: "Notes",
            value: "notes",
            Component: <Notes notes={[]} />
        },
        {
            label: "Feedback",
            value: "feedback",
            Component: <Feedback feedbacks={[]} />
        },
    ]


    const [activeTab, setActiveTab] = useState<string>("activity");

    if (isLoading) {
        return (
            <div className="user-details space-y-6">
                <div className="page-header">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="cursor-pointer hover:text-primary transition-all duration-300ms ease-in-out"
                            >
                                <ArrowLeft />
                            </button>
                            <Text
                                title="User Details"
                                type="h4"
                                className="text-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="bg-secondary-foreground rounded-sm p-4 border-[0.5px] border-primary/8 space-y-4">
                        <p className="text-sm text-muted-foreground">Loading user details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="user-details space-y-6">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="cursor-pointer hover:text-primary transition-all duration-300ms ease-in-out"
                        >
                            <ArrowLeft />
                        </button>
                        <Text
                            title="User Details"
                            type="h4"
                            className="text-lg"
                        />
                    </div>

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body">
                <div className="bg-secondary-foreground rounded-sm p-4 border-[0.5px] border-primary/8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="col-span-1 lg:col-span-3 space-y-4">
                            <Text
                                title="User Information"
                                type="h4"
                                className="text-primary font-medium"
                            />

                            <div className="grid grid-cols-3 gap-6">
                                <ModalFieldItem
                                    label="Customer Name"
                                    value={userData?.user?.full_name}
                                />
                                <ModalFieldItem
                                    label="Email Address"
                                    value={userData?.user?.email_address}
                                />
                                <ModalFieldItem
                                    label="Account Status"
                                    value={userData?.user?.user_type === "ping_user" ? "active" : "inactive"}
                                    className="capitalize"
                                />
                                <ModalFieldItem
                                    label="Joined Date"
                                    value={userData?.user?.createdAt && formatDateString(new Date(userData?.user?.createdAt))}
                                />
                                <ModalFieldItem
                                    label="Last Active"
                                    value={userData?.user?.updatedAt && formatDateString(new Date(userData?.user?.updatedAt))}
                                />
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-2 space-y-4">
                            <Text
                                title="Activity Summary"
                                type="h4"
                                className="text-primary font-medium"
                            />

                            <div className="grid grid-cols-2 gap-6">
                                <ModalFieldItem
                                    label="Total Nudges Sent"
                                    value={(pingsCount?.total ?? 0).toString()}
                                />
                                <ModalFieldItem
                                    label="Total Gift Saved"
                                    value={(pingsCount?.gift ?? 0).toString()}
                                />
                                <ModalFieldItem
                                    label="Notes Created"
                                    value={"0"}
                                />
                                <ModalFieldItem
                                    label="Feedback Submitted"
                                    value={"0"}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-3 space-y-4">
                            <Text
                                title="Partners Information"
                                type="h4"
                                className="text-primary font-medium"
                            />

                            {partner ? (
                                <div className="grid grid-cols-3 gap-6">
                                    <ModalFieldItem
                                        label="Name"
                                        value={partner?.partner_name}
                                        className="capitalize"
                                    />
                                    <ModalFieldItem
                                        label="Relationship Type"
                                        value={partner?.relationship_type}
                                        className="capitalize"
                                    />
                                    <ModalFieldItem
                                        label="Gender"
                                        value={partner?.gender}
                                        className="capitalize"
                                    />
                                    <ModalFieldItem
                                        label="Birthday"
                                        value={partner?.partner_birthday && formatDateString(new Date(partner.partner_birthday))}
                                    />
                                    <ModalFieldItem
                                        label="Anniversary"
                                        value={partner?.anniversary_date && formatDateString(new Date(partner.anniversary_date))}
                                    />
                                    <ModalFieldItem
                                        label="Love Language"
                                        value={Array.isArray(partner?.love_language) ? partner?.love_language.join(", ") : partner?.partner_name}
                                        className="capitalize"
                                    />
                                </div>
                            ) : (
                                <EmptyPartnerState />
                            )}
                        </div>
                    </div>



                    <div className="tabs">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="space-y-4"
                        >
                            <TabsList className="bg-transparent space-x-3">
                                {tabs?.map((tab, index) => (
                                    <TabsTrigger
                                        key={index}
                                        className={cn(
                                            "text-sm font-medium rounded-full cursor-pointer transition-colors min-w-fit max-w-fit px-4 py-2.5 h-fit bg-white/2 text-primary",
                                            "data-[state=active]:bg-primary data-[state=active]:text-secondary",
                                        )}
                                        value={tab.value}
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {tabs?.map((tab, index) => (
                                <TabsContent
                                    value={tab.value}
                                    key={index}
                                >
                                    {tab.Component}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;