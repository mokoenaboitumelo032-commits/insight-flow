import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/chat-page";
export const Route = createFileRoute("/chat/$threadId")({ head: () => ({ meta: [{ title: "Conversation — Workmate AI" }, { name: "description", content: "Continue a private workplace conversation stored in this browser." }, { property: "og:title", content: "Conversation — Workmate AI" }, { property: "og:description", content: "Continue a private workplace conversation stored in this browser." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: ThreadRoute });
function ThreadRoute() { const { threadId } = Route.useParams(); return <ChatPage key={threadId} threadId={threadId} />; }
