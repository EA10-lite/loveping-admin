/*
    User interface
*/


export interface User {
    _id: string;
    id?: string;
    full_name: string;
    name?: string;
    email?: string;
    email_address?: string;
}

export interface PingsCount {
    total: number;
    text: number;
    call: number;
    gift: number;
}

export interface UserPartner {
    partner_name: string;
    gender: "male" | "female";
    email: string;
    love_language: string[];
    partner_birthday: Date | string;
    relationship_type: string;
    anniversary_date: Date | string;
}

export interface FullUser extends User {
    phone?: string;
    partner: UserPartner | null;
    accountType?: "guest" | "registered";
    createdAt: Date | string;
    updatedAt: Date | string;
    lastActive?: Date | string;
    accountStatus?: "active" | "inactive";
    nudgesCreated?: number;
    totalNudges?: number;
    giftsSent?: number;
    feedbackSubmitted?: number;
    user_type?: "ping_user" | "ping_admin" | "Admin";
    notes?: Note[];
    nudges?: Nudge[];
    feedback?: Feedback[];
    activity_events?: Activity[];
    pings_count?: PingsCount;
}


export interface UserDetails extends FullUser {
    user: {
        _id: string;
        id?: string;
        full_name: string;
        email_address: string;
        user_type: "ping_user" | "ping_admin";
        createdAt: Date | string;
        updatedAt: Date | string;
    }
    partner: UserPartner;
    pings_count: PingsCount;
}

// UserPartner moved and extended above


/*
    Notification interface
*/

export interface Notification {
    _id: string;
    subject: string;
    audience: "all" | "new" | "registered";
    body: string;
    url?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
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
    type: "nudge" | "notification" | "feedback" | "gift" | "account" | "string";
    message: string;
}

/*
    Emails interface
*/

export interface Emails {
    _id: string;
    subject: string;
    body: string;
    url?: string;
    recipient_type: "user" | "group" | "all" | "new_users";
    user_id?: string;
    image_url?: string;
    created_after?: string;
    scheduled_at?: string;
    status: "send_now" | "sent" | "schedule_for_later" | "draft";
    createdByUser?: User;
    sent_at?: Date;
}

export type AddEmails = {
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
    partner: Partner;
    title: string;
    status: string;
    DayOfWeek: string;
    message: string;
    ping_type?: string;
    isNote?: true;
    isSaved?: true;
    tones: string[];
    createdAt: Date;
    updatedAt: Date;
}


/*
    Nudge interface
*/
export interface Nudge {
    _id: string;
    user: User | string;
    partner: Partner | string | undefined;
    ping_type: "call" | "text" | "gift";
    tones: string[];
    status: "completed" | "pending" | "delivered";
    actionTaken: "copied" | "purchased" | "sent" | null;
    message: string;
    title: string;
    date?: Date;
    DayOfWeek?: string;
    createdAt?: Date;
    updatedAt?: Date;
}



/**
    Feedback interface
*/

export interface Feedback {
    _id: string;
    id?: string;
    user: User;
    message: string;
    feedback_type: 'positive' | 'negative';
    rating?: number;
    type?: string;
    createdAt: Date;
}


export interface Reply {
    _id: string;
    subject: string;
    user: User;
    message: string;
    sent_at: Date;
    sent_by: {
        _id: string;
        full_name: string;
        email_address: string;
        user_type: "ping_user" | "ping_admin" | "Admin";
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface ContactMessage {
    _id: string;
    name: string;
    email_address: string;
    message: string;
    user: User | null;
    replies: Reply[];
    replied_at: Date | null;
    createdAt: Date;
    updatedAt: Date;
}