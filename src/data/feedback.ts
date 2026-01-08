import { type Feedback } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomDate, getRandomElement } from './utils';

export const feedbacks: Feedback[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `feedback_${i + 1}`,
    user: getRandomElement(users),
    rating: Math.floor(Math.random() * 5) + 1,
    message: generateParagraph(1),
    type: getRandomElement(["rating", "message", "bug", "suggestion"]),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date())
}));
