/*
    User interface
*/


interface User {
    _id: string;
    full_name: string;
    email_address: string;
}

export interface FullUser extends User {
    phone: string;
    partner: UserPartner;
    accountType: "guest" | "registered";
    createdAt: Date;
    updatedAt: Date;
    lastActive: Date;
    accountStatus: "active" | "inactive";
    nudgesCreated: number;
    totalNudges: number;
    giftsSent: number;
    feedbackSubmitted: number;
    notes: Note[];
    nudges: Nudge[];
    feedbacks: Feedback[];
    activites: Activity[];
}

interface UserPartner {
    name: string;
    gender: "male" | "female";
    email: string;
    loveLanguage: string[];
    birthday: Date;
    relationshipType: string;
    anniversary: Date;
}


/*
    Notification interface
*/

export interface Notification {
    _id: string;
    title: string;
    audience: "all" | "new" | "registered";
    status: "published" | "draft" | "scheduled",
    description: string;
    url?: string;
    scheduleType: "now" | "later" | "draft";
    scheduledDate?: Date | null;
    scheduledTime?: Date | null;
    dateSent: Date;
}

export type AddNotification = {
    title: string;
    description: string;
    url?: string;
    scheduleNow: boolean;
    scheduledDate: Date | null;
    dateSent: Date;
}

/*
    Activity Interface
*/


export interface Activity {
    _id: string;
    createdAt: Date;
    type: "nudge" | "notification" | "feedback" | "gift";
    category?: string;
    description: string;
}


/*
    FAQ interface
*/

export interface FAQ {
    _id: string;
    question: string;
    answer: string;
    status: "published" | "unpublished";
    category: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: string; // from API response
    __v?: number;
}

export type AddFAQ = {
    question: string;
    status: "published" | "unpublished";
    answer: string;
    category: string;
}


/*
    PARTNER interface
*/
export interface Partner {
    _id: string;
    name: string;
    category: string;
    internal_note?: string;
    status: "active" | "inactive";
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AddPartner = {
    name: string;
    category: string;
    url: string;
    status?: "active" | "inactive";
    internal_note?: string;
}


/*
    Issues interface
*/


export interface Issues {
    _id: string;
    user: User;
    issue_type: string;
    message: string;
    status: "new" | "resolved" | "closed";
    createdAt: Date;
    updatedAt: Date;
}

/*
    Notes interface
*/

export interface Note {
    _id: string;
    user: User;
    category: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}


/*
    Nudge interface
*/

export interface Nudge {
    _id: string;
    user: User;
    type: "call" | "text" | "gift";
    tone: string[];
    status: "completed" | "pending";
    actionTaken: "copied" | "purchased" | "sent" | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}



/**
    Feedback interface
*/

export interface Feedback {
    _id: string;
    user: User;
    rating: number;
    message: string;
    type: "rating" | "message" | "bug" | "suggestion";
    createdAt: Date;
}