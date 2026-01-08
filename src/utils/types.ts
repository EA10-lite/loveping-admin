/*
    User interface
*/


export interface User {
    _id: string;
    name: string;
    email: string;
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
}

interface UserPartner {
    name: string;
    gender:"male" | "female";
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
    title: string;
    description: string;
    url?: string;
    scheduleNow: boolean;
    scheduledDate: Date | null;
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
    FAQ interface
*/

export interface FAQ {
    _id: string;
    question: string;
    answer: string;
    status: "publised" | "draft";
    createdAt: Date;
    updatedAt: Date;
}

export type AddFAQ = {
    question: string;
    status?: "published" | "draft";
    anser: string;
}


/*
    PARTNER interface
*/

export interface Partner {
    name: string;
    category: string;
    description: string;
    status: "active" | "inactive";
    website: string;
    createdAt: string;
    note?: string;
}

export type AddPartner = {
    name: string;
    category: string;
    website: string;
    status?: "active" | "inactive";
    note?: string;
}


/*
    Issues interface
*/

export interface Issues {
    user: User;
    _id: string;
    category: string;
    status: string;
    description: string;
    note?: string;
}

/*
    Notes interface
*/

export interface Note {
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
    user: User;
    rating: number;
    message: string;
    type: "rating" | "message" | "bug" | "suggestion";
    createdAt: Date;
}