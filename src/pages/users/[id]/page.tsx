import { PiExport } from "react-icons/pi";
import { ModalFieldItem, Text } from "../../../components";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { users } from "../../../data/users";
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



const UserDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const data = users.find(user => user._id === id?.toString());


    const tabs = [
        {
            label: "Activity",
            value: "activity",
            Component: <Activity />
        },
        {
            label: "Nudges",
            value: "nudges",
            Component: <Nudges nudges={data?.nudges || []} />
        },
        {
            label: "Notes",
            value: "notes",
            Component: <Notes notes={data?.notes || []} />
        },
        {
            label: "Feedback",
            value: "feedback",
            Component: <Feedback feedbacks={data?.feedbacks || []} />
        },
    ]


    const [activeTab, setActiveTab] = useState<string>("activity");


    return (
        <div className="user-details space-y-6">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={()=> navigate(-1)}
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
                <div className="bg-[#05251C] rounded-sm p-4 border-[0.5px] border-primary/8 space-y-8">
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
                                    value={data?.name}
                                />
                                <ModalFieldItem
                                    label="Email Address"
                                    value={data?.email}
                                />
                                <ModalFieldItem
                                    label="Account Status"
                                    value={data?.accountStatus}
                                    className="capitalize"
                                />
                                <ModalFieldItem
                                    label="Joined Date"
                                    value={data?.createdAt && formatDateString(new Date(data?.createdAt))}
                                />
                                <ModalFieldItem
                                    label="Last Active"
                                    value={data?.lastActive && formatDateString(new Date(data?.lastActive))}
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
                                    value={data?.totalNudges.toString()}
                                />
                                <ModalFieldItem
                                    label="Total Gift Saved"
                                    value={data?.giftsSent.toString()}
                                />
                                <ModalFieldItem
                                    label="Notes Created"
                                    value={data?.notes.length.toString()}
                                />
                                <ModalFieldItem
                                    label="Feedback Submitted"
                                    value={data?.feedbackSubmitted.toString()}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-4 space-y-4">
                            <Text
                                title="Partners Information"
                                type="h4"
                                className="text-primary font-medium"
                            />

                             <div className="grid grid-cols-4 gap-6">
                                <ModalFieldItem
                                    label="Name"
                                    value={data?.partner?.name}
                                />
                                <ModalFieldItem
                                    label="Email"
                                    value={data?.partner?.email}
                                />
                                <ModalFieldItem
                                    label="Gender"
                                    value={data?.partner?.gender}
                                    className="capitalize"
                                />
                                <ModalFieldItem
                                    label="Love Language"
                                    value={data?.partner?.name}
                                />
                                <ModalFieldItem
                                    label="Birthday"
                                    value={data?.partner?.birthday && formatDateString(data?.partner?.birthday)}
                                />
                                <ModalFieldItem
                                    label="Relationship Type"
                                    value={data?.partner?.relationshipType}
                                />
                                <ModalFieldItem
                                    label="Anniversary"
                                    value={data?.partner?.anniversary && formatDateString(data?.partner?.anniversary)}
                                />
                             </div>
                        </div>
                    </div>



                    <div className="tabs">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="space-y-4"
                        >
                            <TabsList className="bg-transparent space-x-3">
                                {tabs?.map((tab, index)=> (
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

                            {tabs?.map((tab, index)=> (
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