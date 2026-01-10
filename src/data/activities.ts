import { type Activity } from '../utils/types';
import { generateParagraph, getRandomElement } from './utils';

const types = ["nudge", "notification", "feedback", "gift"];

export const activities: Activity[] = Array.from({ length: 50 }, () => ({
    _id: Math.floor(100000 + Math.random() * 900000).toString(),
    type: getRandomElement(types) as "nudge" | "notification" | "feedback" | "gift",
    description: generateParagraph(1).substring(0, 50),
    createdAt: new Date()
}));
