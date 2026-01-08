import { type Nudge } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomDate, getRandomElement } from './utils';

export const nudges: Nudge[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `nudge_${i + 1}`,
    user: getRandomElement(users),
    type: getRandomElement(["call", "text", "gift"]),
    tone: [getRandomElement(["Romantic", "Casual", "Funny", "Formal"]), getRandomElement(["Encouraging", "Apologetic", "Thankful"])],
    status: getRandomElement(["completed", "pending"]),
    actionTaken: getRandomElement(["copied", "purchased", "sent", null]),
    content: generateParagraph(1),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
}));
