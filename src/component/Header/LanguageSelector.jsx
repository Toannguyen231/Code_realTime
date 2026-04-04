import React from 'react';
import { LANGUAGE_VERSION, LANGUAGE_DISPLAY_NAME } from './constants';

const languages = Object.entries(LANGUAGE_VERSION).map(([key, version]) => ({
    key,
    name: LANGUAGE_DISPLAY_NAME[key] || key,
    version,
}));

const LanguageSelector = ({ language, setLanguage }) => {
    return (
        <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            {languages.map((lang) => (
                <option key={lang.key} value={lang.name}>
                    {lang.name} {lang.version ? `(${lang.version})` : ''}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;