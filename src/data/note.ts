import { type Note } from '../utils/types';
import { users } from './users';
import { generateParagraph, getRandomDate, getRandomElement } from './utils';

const categories = ["General", "Important", "Reminder", "Idea", "Personal"];

export const notes: Note[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `note_${i + 1}`,
    user: getRandomElement(users),
    category: getRandomElement(categories),
    content: generateParagraph(1),
    createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
    updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
}));
