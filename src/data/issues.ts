import { type Issues } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomElement } from './utils';

const types = ["Bug", "Feature", "Improvement"];
const statuses = ["new", "resolved", "closed"];

export const issuesIndices: Issues[] = Array.from({ length: 50 }, () => ({
    _id: Math.floor(100000 + Math.random() * 900000).toString(),
    user: getRandomElement(users),
    type: getRandomElement(types),
    summary: generateParagraph(1).substring(0, 50),
    status: getRandomElement(statuses) as "new" | "resolved" | "closed",
    createdAt: new Date()
}));
