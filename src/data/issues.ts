import { type Issues } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomElement } from './utils';

const categories = ["Payment", "Account", "Technical", "Feedback", "Other"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];

export const issuesIndices: Issues[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `issue_${i + 1}`,
    user: getRandomElement(users),
    category: getRandomElement(categories),
    status: getRandomElement(statuses),
    description: generateParagraph(1),
    note: Math.random() > 0.5 ? generateParagraph(1) : undefined
}));
