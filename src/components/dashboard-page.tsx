import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Search, MessageSquareText, Clock3, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { PageFrame, ResponsibleNotice } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { CHAT_EVENT, readThreads, type ChatThread } from "@/lib/chat-storage";

const actions = [
  { title: "Smart Email Generator", copy: "Draft clear, polished emails for any workplace situation.", to: "/email", icon: Mail, stat: "3 tones" },
  { title: "Research Assistant", copy: "Turn a topic or long article into structured, practical insight.", to: "/research", icon: Search, stat: "4 sections" },
  { title: "AI Workplace Chat", copy: "Plan work, prepare conversations, and solve everyday challenges.", to: "/chat", icon: MessageSquareText, stat: "Local history" },
] as const;

export function DashboardPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  useEffect(() => { const refresh = () => setThreads(readThreads()); refresh(); window.addEventListener(CHAT_EVENT, refresh); return () => window.removeEventListener(CHAT_EVENT, refresh); }, []);
  return <PageFrame eyebrow="Good afternoon" title="What can we help you accomplish?" description="Move work forward with focused tools for communication, research, and everyday decision-making.">
    <div className="mb-6 grid gap-4 md:grid-cols-3">{actions.map((action, index) => <Link key={action.to} to={action.to} className="group"><Card className="h-full overflow-hidden rounded-lg border-border/80 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/35 hover:workspace-shadow"><CardContent className="p-6"><div className="mb-8 flex items-start justify-between"><div className={`grid size-11 place-items-center rounded-lg ${index === 1 ? "bg-secondary text-primary" : index === 2 ? "bg-brand-deep text-primary-foreground" : "bg-brand-soft text-primary"}`}><action.icon className="size-5" /></div><ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div><h2 className="text-lg font-semibold">{action.title}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{action.copy}</p><p className="mt-5 border-t pt-4 text-xs font-semibold text-primary">{action.stat}</p></CardContent></Card></Link>)}</div>
    <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]"><section className="rounded-lg border bg-card p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-semibold">Recent conversations</h2><p className="mt-1 text-sm text-muted-foreground">Continue where you left off.</p></div><Clock3 className="size-5 text-muted-foreground" /></div>{threads.length ? <div className="divide-y">{threads.slice(0, 4).map((thread) => <Link key={thread.id} to="/chat/$threadId" params={{ threadId: thread.id }} className="flex items-center justify-between gap-3 py-3 text-sm hover:text-primary"><span className="truncate font-medium">{thread.title}</span><span className="shrink-0 text-xs text-muted-foreground">{thread.messages.length} messages</span></Link>)}</div> : <div className="rounded-lg bg-muted p-5 text-sm text-muted-foreground">Start a chat and it will be saved here in this browser.</div>}</section><section className="subtle-grid rounded-lg bg-brand-deep p-6 text-primary-foreground shadow-sm"><Zap className="size-6 text-brand-cyan" /><h2 className="mt-10 text-xl font-semibold">Work smarter, privately.</h2><p className="mt-2 text-sm leading-6 text-primary-foreground/75">Everything runs in your browser. No account, cloud storage, or external service is used.</p></section></div>
    <ResponsibleNotice />
  </PageFrame>;
}
