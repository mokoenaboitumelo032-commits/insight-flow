import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { createThread, readThreads, upsertThread } from "@/lib/chat-storage";
export const Route = createFileRoute("/chat")({ head: () => ({ meta: [{ title: "AI Chat — Workmate AI" }, { name: "description", content: "A private browser-based workplace assistant with local conversation history." }, { property: "og:title", content: "AI Chat — Workmate AI" }, { property: "og:description", content: "A private browser-based workplace assistant with local conversation history." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: ChatLanding });
function ChatLanding() { const navigate = useNavigate(); useEffect(() => { const existing = readThreads()[0]; const thread = existing ?? createThread(); if (!existing) upsertThread(thread); void navigate({ to: "/chat/$threadId", params: { threadId: thread.id }, replace: true }); }, [navigate]); return <div className="grid h-[calc(100svh-4rem)] place-items-center"><Shimmer>Opening your workspace…</Shimmer></div>; }
