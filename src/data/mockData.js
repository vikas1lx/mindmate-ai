/**
 * mockData.js
 * Realistic pre-filled mock data for the MindMate AI dashboard demo.
 * Replace or extend this with real LocalStorage data.
 */

// ------- Mood history (last 30 days) -------
// mood: 1 (very low) → 5 (great), cause: trigger label, note: short note
export const MOOD_HISTORY = [
  { date: '2026-09-20', mood: 3, cause: 'exams',    sleep: 6, note: 'Felt okay, managed studies.' },
  { date: '2026-09-21', mood: 2, cause: 'sleep',    sleep: 4, note: 'Slept poorly, groggy all day.' },
  { date: '2026-09-22', mood: 4, cause: 'family',   sleep: 7, note: 'Had a great family call.' },
  { date: '2026-09-23', mood: 3, cause: 'exams',    sleep: 6, note: 'Moderate anxiety about tests.' },
  { date: '2026-09-24', mood: 1, cause: 'money',    sleep: 3, note: 'Worried about finances badly.' },
  { date: '2026-09-25', mood: 2, cause: 'loneliness', sleep: 5, note: 'Felt isolated today.' },
  { date: '2026-09-26', mood: 3, cause: 'career',   sleep: 6, note: 'Unsure about future plans.' },
  { date: '2026-09-27', mood: 4, cause: 'exams',    sleep: 7, note: 'Studied well, felt productive.' },
  { date: '2026-09-28', mood: 5, cause: 'family',   sleep: 8, note: 'Weekend rest – recharged!' },
  { date: '2026-09-29', mood: 4, cause: 'sleep',    sleep: 7, note: 'Good rest, clear mind.' },
  { date: '2026-09-30', mood: 3, cause: 'exams',    sleep: 6, note: 'Mild exam nerves.' },
  { date: '2026-10-01', mood: 2, cause: 'anger',    sleep: 5, note: 'Argument with a friend.' },
  { date: '2026-10-02', mood: 3, cause: 'career',   sleep: 6, note: 'Job search stress.' },
  { date: '2026-10-03', mood: 4, cause: 'family',   sleep: 7, note: 'Mom called – felt loved.' },
  { date: '2026-10-04', mood: 2, cause: 'money',    sleep: 4, note: 'Bills piling up.' },
  { date: '2026-10-05', mood: 1, cause: 'exams',    sleep: 3, note: 'Failed a test – devastated.' },
  { date: '2026-10-06', mood: 3, cause: 'sleep',    sleep: 7, note: 'Recovered a bit.' },
  { date: '2026-10-07', mood: 4, cause: 'family',   sleep: 7, note: 'Friends hangout helped.' },
  { date: '2026-10-08', mood: 3, cause: 'career',   sleep: 6, note: 'Still figuring things out.' },
  { date: '2026-10-09', mood: 5, cause: 'family',   sleep: 8, note: 'Best day in a while!' },
  { date: '2026-10-10', mood: 4, cause: 'exams',    sleep: 7, note: 'Passed mid-term, relief!' },
  { date: '2026-10-11', mood: 3, cause: 'sleep',    sleep: 5, note: 'Mild fatigue.' },
  { date: '2026-10-12', mood: 2, cause: 'relationship', sleep: 5, note: 'Relationship tension.' },
  { date: '2026-10-13', mood: 3, cause: 'exams',    sleep: 6, note: 'Back to study grind.' },
  { date: '2026-10-14', mood: 4, cause: 'career',   sleep: 7, note: 'Good progress on project.' },
  { date: '2026-10-15', mood: 2, cause: 'loneliness', sleep: 5, note: 'Missing close friends.' },
  { date: '2026-10-16', mood: 3, cause: 'money',    sleep: 6, note: 'Budget planning helped.' },
  { date: '2026-10-17', mood: 4, cause: 'sleep',    sleep: 8, note: 'Long sleep, refreshed.' },
  { date: '2026-10-18', mood: 3, cause: 'exams',    sleep: 6, note: 'Prep for finals ongoing.' },
  { date: '2026-10-19', mood: 4, cause: 'family',   sleep: 7, note: 'Good morning walk.' },
];

// Last 7 days slice
export const MOOD_LAST_7 = MOOD_HISTORY.slice(-7);

// ------- Cause frequency (for donut chart) -------
export const CAUSE_FREQUENCY = [
  { name: 'Exams',        value: 9,  fill: '#a78bfa' },
  { name: 'Family',       value: 7,  fill: '#6ee7b7' },
  { name: 'Sleep',        value: 6,  fill: '#93c5fd' },
  { name: 'Money',        value: 4,  fill: '#fbbf24' },
  { name: 'Career',       value: 4,  fill: '#f87171' },
  { name: 'Loneliness',   value: 2,  fill: '#c4b5fd' },
  { name: 'Relationship', value: 1,  fill: '#fb7185' },
  { name: 'Anger',        value: 1,  fill: '#f97316' },
];

// ------- Current energy & stress (0-100) -------
export const CURRENT_ENERGY = 62;
export const CURRENT_STRESS = 45;

// ------- Lowest point -------
export const LOWEST_POINT = {
  date: '2026-10-05',
  time: '11:30 PM',
  mood: 1,
  cause: 'Exams',
  note: 'Failed a test – devastated.',
};

// ------- Today's mood (pre-filled for demo) -------
export const TODAY_MOOD_DEFAULT = {
  level: 4,
  note: 'Feeling hopeful after a morning walk.',
  cause: 'family',
};
