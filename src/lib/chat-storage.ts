export type LocalMessage = { id: string; role: "user" | "assistant"; text: string; createdAt: string };
export type ChatThread = { id: string; title: string; updatedAt: string; messages: LocalMessage[] };

export const CHAT_STORAGE_KEY = "workmate-chat-threads-v1";
export const CHAT_EVENT = "workmate-chat-updated";
export const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
export const createThread = (): ChatThread => ({ id: newId(), title: "New conversation", updatedAt: new Date().toISOString(), messages: [] });

export function readThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CHAT_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function writeThreads(threads: ChatThread[]) {
  window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(threads));
  window.dispatchEvent(new Event(CHAT_EVENT));
}

export function upsertThread(thread: ChatThread) {
  const threads = readThreads().filter((item) => item.id !== thread.id);
  writeThreads([thread, ...threads].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
}

export function deleteThread(id: string) { writeThreads(readThreads().filter((thread) => thread.id !== id)); }
