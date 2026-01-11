import { type Notification } from '../utils/types';
import { generateParagraph, getRandomDate, getRandomElement } from './utils';

const titles = [
    "Welcome to LovePing!",
    "Don't forget your anniversary!",
    "New gift ideas available",
    "Update your profile",
    "Partner birthday coming up",
    "Rate your last gift",
    "Subscription renewal",
    "New feature alert",
    "Security alert",
    "Tip of the day"
];

const audience = ["all", "new", "registered"]
const status = ["published", "draft", "scheduled"];

export const notifications: Notification[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `notif_${i + 1}`,
    title: getRandomElement(titles),
    audience: getRandomElement(audience) as "new" | "all" | "registered",
    status: getRandomElement(status) as "published" | "draft" | "scheduled",
    description: generateParagraph(),
    url: Math.random() > 0.7 ? `https://example.com/action/${i}` : undefined,
    scheduleType: getRandomElement(["now", "later", "draft"]) as "now" | "later" | "draft",
    scheduledDate: Math.random() > 0.5 ? getRandomDate(new Date(), new Date(2025, 11, 31)) : null,
    scheduledTime: Math.random() > 0.5 ? getRandomDate(new Date(), new Date(2025, 11, 31)) : null,
    dateSent: getRandomDate(new Date(2023, 0, 1), new Date())
}));
