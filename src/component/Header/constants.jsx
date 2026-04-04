export const LANGUAGE_VERSION = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    cpp: "17",
    csharp: "6.12.0",
    php: "8.2.3",
};

export const LANGUAGE_DISPLAY_NAME = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    csharp: 'C#',
    php: 'PHP',
};

export const LANGUAGE_KEY_BY_DISPLAY = Object.fromEntries(
    Object.entries(LANGUAGE_DISPLAY_NAME).map(([key, name]) => [name, key])
);