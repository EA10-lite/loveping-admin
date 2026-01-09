import { type FAQ } from '../utils/types';
import { generateParagraph, getRandomDate, getRandomElement, } from './utils';

const questions = [
    "How do I reset my password?",
    "How do I change my subscription plan?",
    "Can I cancel anytime?",
    "How does the gift recommendation work?",
    "Is my data secure?",
    "How do I contact support?",
    "Can I add multiple partners?",
    "What payment methods do you accept?",
    "How do I delete my account?",
    "Do you offer refunds?"
];


const categories = [
    "Getting started",
    "Nudges & AI",
    "Gift & Wishlist",
    "Notifications",
    "Account Login",
    "Privacy & Security"
];

export const faqs: FAQ[] = Array.from({ length: 50 }, (_, i) => ({
    _id: `faq_${i + 1}`,
    question: getRandomElement(questions) + ``, // varying slightly
    answer: generateParagraph(3),
    category: getRandomElement(categories),
    status: getRandomElement(["published", "draft"]), // Note: 'publised' is a typo in interface, keeping it to match
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    updatedAt: getRandomDate(new Date(2023, 0, 1), new Date())
}));
