import API from '../../api';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

export const LANGUAGE_TEMPLATES = {
  'C++': `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    return 0;\n}`,
  Python: `import sys\n\n\ndef solve():\n    pass\n\n\nif __name__ == "__main__":\n    solve()\n`,
  JavaScript: `const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim();\n\nfunction solve() {\n  \n}\n\nsolve();\n`,
};

export const getDifficultyClass = (difficulty = 'Unrated') => (
  `difficulty-${String(difficulty).toLowerCase()}`
);

export const formatSolvedCount = (count = 0) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
};

export const getProblemRoomId = (problem) => `CF-${problem.id}`;

export const getProblemRoomPath = (problem) => (
  `/room/${encodeURIComponent(getProblemRoomId(problem))}?problem=${encodeURIComponent(problem.id)}`
);

// â”€â”€ localStorage fallback (for unauthenticated users) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const readProblemStatuses = () => {
  try {
    return JSON.parse(localStorage.getItem('coderoom.problemStatuses') || '{}');
  } catch {
    return {};
  }
};

export const writeProblemStatus = (problemId, status) => {
  const current = readProblemStatuses();
  current[problemId] = status;
  localStorage.setItem('coderoom.problemStatuses', JSON.stringify(current));
};

// â”€â”€ DB-backed progress (for authenticated users) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const fetchProblemStatuses = async (token) => {
  // Náº¿u chÆ°a Ä‘Äƒng nháº­p â†’ dÃ¹ng localStorage (guest mode)
  if (!token) return readProblemStatuses();
  // ÄÃ£ Ä‘Äƒng nháº­p â†’ luÃ´n láº¥y tá»« DB, KHÃ”NG fallback vá» localStorage
  // (trÃ¡nh hiá»ƒn thá»‹ tráº¡ng thÃ¡i cÅ© cá»§a user khÃ¡c / guest)
  try {
    const { data } = await API.get('problems/me/statuses');
    return data.statuses || {};
  } catch {
    return {}; // Network lá»—i â†’ tráº£ vá» rá»—ng, khÃ´ng hiá»ƒn thá»‹ sai
  }
};

export const getStatusIcon = (status) => {
  if (status === 'solved') return 'âœ“';
  if (status === 'attempted') return '~';
  return 'Â·';
};

export const buildProblemUrl = (problem) => (
  `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
);

export const extractSamples = (html) => {
  if (!html) return [];
  const samples = [];
  const inputBlocks = [];
  const outputBlocks = [];

  const inputMatch = html.matchAll(/<div class="input">[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/gi);
  for (const m of inputMatch) {
    inputBlocks.push(m[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim());
  }

  const outputMatch = html.matchAll(/<div class="output">[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/gi);
  for (const m of outputMatch) {
    outputBlocks.push(m[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim());
  }

  for (let i = 0; i < Math.max(inputBlocks.length, outputBlocks.length); i++) {
    samples.push({
      input: inputBlocks[i] || '',
      output: outputBlocks[i] || '',
    });
  }

  return samples;
};

/**
 * Verdict display config
 */
export const VERDICT_CONFIG = {
  AC: { label: 'Accepted', icon: 'âœ…', color: '#34d399', className: 'verdict-ac' },
  WA: { label: 'Wrong Answer', icon: 'âŒ', color: '#ef4444', className: 'verdict-wa' },
  CE: { label: 'Compile Error', icon: 'âš ï¸', color: '#f59e0b', className: 'verdict-ce' },
  RE: { label: 'Runtime Error', icon: 'ðŸ’¥', color: '#a855f7', className: 'verdict-re' },
  TLE: { label: 'Time Limit Exceeded', icon: 'â°', color: '#eab308', className: 'verdict-tle' },
};


