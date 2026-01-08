export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Margaret", "Anthony", "Betty", "Donald", "Sandra", "Mark", "Ashley", "Paul", "Dorothy", "Steven", "Kimberly", "Andrew", "Emily", "Kenneth", "Donna", "Joshua", "Michelle", "George", "Carol", "Kevin", "Amanda", "Brian", "Melissa", "Edward", "Deborah"];

export const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];

export const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "example.com"];

export const generateName = () => `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
export const generateEmail = (name: string) => `${name.toLowerCase().replace(/ /g, '.')}@${getRandomElement(domains)}`;

export const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Action speaks louder than words.",
    "Beauty is in the eye of the beholder.",
    "Better late than never.",
    "Birds of a feather flock together.",
    "Cleanliness is next to godliness.",
    "Don't count your chickens before they hatch.",
    "Don't judge a book by its cover.",
    "Early to bed and early to rise makes a man healthy, wealthy and wise.",
    "Fortune favors the bold.",
    "Honesty is the best policy.",
    "If it ain't broke, don't fix it.",
    "Knowledge is power.",
    "Laughter is the best medicine.",
    "Look before you leap.",
    "No pain, no gain.",
    "Practice makes perfect.",
    "Silence is golden.",
    "The early bird catches the worm.",
    "The pen is mightier than the sword.",
    "Time is money.",
    "Two heads are better than one.",
    "Where there's a smoke, there's a fire.",
    "You can't judge a book by its cover."
];

export const generateSentence = () => getRandomElement(sentences);
export const generateParagraph = (lines: number = 2) => Array.from({ length: lines }, () => generateSentence()).join(" ");
