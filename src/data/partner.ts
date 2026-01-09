import { type Partner } from '../utils/types';
import { generateName, generateParagraph, getRandomDate, getRandomElement } from './utils';

const categories = ["Florist", "Jewelry", "Chocolatier", "Experience", "Clothing", "Tech", "Beauty", "Home Decor"];

export const partners: Partner[] = Array.from({ length: 50 }, (_, i) => {
    const name = generateName() + " Co.";
    return {
        _id: `partner_${i + 1}`,
        name: name,
        category: getRandomElement(categories),
        description: generateParagraph(1),
        status: getRandomElement(["active", "inactive"]),
        website: `https://www.${name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
        note: Math.random() > 0.7 ? generateParagraph(1) : undefined
    };
});
