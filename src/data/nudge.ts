import { type Nudge } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomDate, getRandomElement } from './utils';

export const nudges: Nudge[] = Array.from({ length: 50 }, (_, i) => {
    const user = getRandomElement(users);
    return {
        _id: `nudge_${i + 1}`,
        user: user,
        partner: undefined, 
        ping_type: getRandomElement(["call", "text", "gift"]) as "call" | "text" | "gift",
        tones: [getRandomElement(["Romantic", "Casual", "Funny", "Formal"]), getRandomElement(["Encouraging", "Apologetic", "Thankful"])],
        status: getRandomElement(["completed", "pending", "delivered"]) as "completed" | "pending" | "delivered",
        actionTaken: getRandomElement(["copied", "purchased", "sent", null]) as "copied" | "purchased" | "sent" | null,
        message: generateParagraph(1),
        title: "Sample Nudge Title",
        createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
    };
});

