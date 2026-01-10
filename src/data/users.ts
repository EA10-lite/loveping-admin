import { type FullUser } from '../utils/types';
import { generateName, generateEmail, getRandomElement, getRandomDate, generateParagraph } from './utils';

export const users: FullUser[] = Array.from({ length: 50 }, (_, i) => {
    const name = generateName();
    const partnerName = generateName();

    return {
        _id: `user_${i + 1}`,
        name: name,
        email: generateEmail(name),
        phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        partner: {
            name: partnerName,
            gender: getRandomElement(["male", "female"]),
            email: generateEmail(partnerName),
            loveLanguage: [getRandomElement(["Words of Affirmation", "Quality Time", "Receiving Gifts", "Acts of Service", "Physical Touch"])],
            birthday: getRandomDate(new Date(1980, 0, 1), new Date(2000, 11, 31)),
            relationshipType: getRandomElement(["Married", "Dating", "Engaged"]),
            anniversary: getRandomDate(new Date(2010, 0, 1), new Date(2023, 11, 31))
        },
        accountType: getRandomElement(["guest", "registered"]),
        createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: getRandomDate(new Date(2023, 0, 1), new Date()),
        lastActive: getRandomDate(new Date(2023, 0, 1), new Date()),
        accountStatus: getRandomElement(["active", "inactive"]),
        nudgesCreated: Math.floor(Math.random() * 50),
        totalNudges: Math.floor(Math.random() * 100),
        giftsSent: Math.floor(Math.random() * 20),
        feedbackSubmitted: Math.floor(Math.random() * 10),
        notes: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, j) => ({
            _id: `note_${i}_${j}`,
            user: { _id: `user_${i + 1}`, name: name, email: generateEmail(name) },
            category: getRandomElement(["General", "Important", "Reminder", "Idea", "Personal"]),
            content: generateParagraph(1),
            createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
            updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
        })),
        nudges: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, j) => ({
            _id: `nudge_${i}_${j}`,
            user: { _id: `user_${i + 1}`, name: name, email: generateEmail(name) },
            type: getRandomElement(["call", "text", "gift"]),
            tone: [getRandomElement(["Romantic", "Casual", "Funny", "Formal"])],
            status: getRandomElement(["completed", "pending"]),
            actionTaken: getRandomElement(["copied", "purchased", "sent", null]),
            content: generateParagraph(1),
            createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
            updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
        })),
        feedbacks: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, j) => ({
            _id: `feedback_${i}_${j}`,
            user: { _id: `user_${i + 1}`, name: name, email: generateEmail(name) },
            rating: Math.floor(Math.random() * 5) + 1,
            message: generateParagraph(1),
            type: getRandomElement(["rating", "message", "bug", "suggestion"]),
            createdAt: getRandomDate(new Date(2023, 0, 1), new Date())
        })),
        activites: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, j) => ({
            _id: `activity_${i}_${j}`,
            description: generateParagraph(1),
            type: getRandomElement(["nudge", "notification", "feedback", "gift"]),
            createdAt: getRandomDate(new Date(2023, 0, 1), new Date())
        }))
    };
});
