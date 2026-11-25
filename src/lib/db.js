/**
 * db.js — optional cloud sync for MindMate AI (Supabase REST, no login).
 *
 * - If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set, every function
 *   is a silent no-op and the app runs purely on localStorage (as before).
 * - Data is keyed by an anonymous per-browser device ID (no personal info).
 * - All calls are best-effort: failures never break the UI.
 */

const URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const dbEnabled = Boolean(URL && KEY);

const DEVICE_KEY = 'mindmate-device-id';

export function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}

async function request(path, { method = 'GET', body, prefer } = {}) {
  if (!dbEnabled) return null;
  try {
    const res = await fetch(`${URL}/rest/v1/${path}`, {
      method,
      headers: {
        apikey: KEY,
        // Legacy anon keys are JWTs; new sb_publishable_ keys are not and go in apikey only
        ...(KEY.startsWith('eyJ') ? { Authorization: `Bearer ${KEY}` } : {}),
        'Content-Type': 'application/json',
        'x-device-id': getDeviceId(), // used by row-level-security policies
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) return null;
    return method === 'GET' ? await res.json() : true;
  } catch {
    return null;
  }
}

const UPSERT = 'resolution=merge-duplicates,return=minimal';

// ─── Mood entries ─────────────────────────────────────────
export async function fetchMoods() {
  const rows = await request('mood_entries?select=date,mood,cause,sleep,note&order=date.asc');
  return rows || null;
}

export function saveMoods(entries) {
  if (!entries?.length) return Promise.resolve(null);
  const device_id = getDeviceId();
  return request('mood_entries?on_conflict=device_id,date', {
    method: 'POST',
    prefer: UPSERT,
    body: entries.map((e) => ({
      device_id,
      date: e.date,
      mood: e.mood,
      cause: e.cause ?? null,
      sleep: e.sleep ?? null,
      note: e.note ?? null,
    })),
  });
}

// ─── Problem / AI response history ────────────────────────
export async function fetchProblems() {
  const rows = await request(
    'problem_entries?select=id,created_at,problem,response&order=id.desc'
  );
  if (!rows) return null;
  return rows.map((r) => ({
    id: Number(r.id),
    timestamp: r.created_at,
    problem: r.problem,
    response: r.response,
  }));
}

export function saveProblems(entries) {
  if (!entries?.length) return Promise.resolve(null);
  const device_id = getDeviceId();
  return request('problem_entries?on_conflict=device_id,id', {
    method: 'POST',
    prefer: UPSERT,
    body: entries.map((e) => ({
      device_id,
      id: e.id,
      created_at: e.timestamp,
      problem: e.problem,
      response: e.response,
    })),
  });
}
