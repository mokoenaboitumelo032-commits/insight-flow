import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, Search, MessageSquareText, Settings, Plus, Trash2, ShieldCheck, Bot, PanelLeftClose } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CHAT_EVENT, createThread, deleteThread, readThreads, upsertThread, type ChatThread } from "@/lib/chat-storage";

const nav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Email Generator", to: "/email", icon: Mail },
  { label: "Research Assistant", to: "/research", icon: Search },
  { label: "AI Chat", to: "/chat", icon: MessageSquareText },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);

  useEffect(() => {
    const refresh = () => setThreads(readThreads());
    refresh();
    window.addEventListener(CHAT_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(CHAT_EVENT, refresh); window.removeEventListener("storage", refresh); };
  }, []);

  const newChat = () => {
    const thread = createThread();
    upsertThread(thread);
    setMobileOpen(false);
    void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
  };

  const remove = (id: string) => {
    deleteThread(id);
    if (pathname === `/chat/${id}`) void navigate({ to: "/chat" });
  };

  return (
    <div className="flex min-h-svh bg-background">
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200 md:sticky md:z-20 ${collapsed ? "md:w-16" : "md:w-64"} ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full md:translate-x-0"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Bot className="size-5" /></div>
          {!collapsed && <div className="min-w-0"><p className="font-display text-base font-semibold">Workmate AI</p><p className="text-xs text-sidebar-foreground/65">Your workplace copilot</p></div>}
        </div>
        <nav aria-label="Primary" className="space-y-1 p-3">
          {nav.map((item) => { const active = item.to === "/chat" ? pathname.startsWith("/chat") : pathname === item.to; return <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"}`}><item.icon className="size-4 shrink-0" />{!collapsed && <span>{item.label}</span>}</Link>; })}
        </nav>
        {!collapsed && <div className="flex min-h-0 flex-1 flex-col border-t border-sidebar-border px-3 pt-4">
          <div className="mb-2 flex items-center justify-between px-2"><span className="text-xs font-semibold uppercase text-sidebar-foreground/55">Recent chats</span><Button size="icon-sm" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent" onClick={newChat} aria-label="New chat"><Plus /></Button></div>
          <div className="space-y-1 overflow-y-auto pb-3">
            {threads.length === 0 && <p className="px-2 py-4 text-xs leading-5 text-sidebar-foreground/55">Your conversations will appear here.</p>}
            {threads.map((thread) => <div className="group flex items-center gap-1" key={thread.id}><Link to="/chat/$threadId" params={{ threadId: thread.id }} onClick={() => setMobileOpen(false)} className={`min-w-0 flex-1 truncate rounded-md px-2 py-2 text-xs ${pathname === `/chat/${thread.id}` ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60"}`}>{thread.title}</Link><Tooltip><TooltipTrigger asChild><Button size="icon-sm" variant="ghost" className="shrink-0 text-sidebar-foreground/50 opacity-0 hover:bg-sidebar-accent hover:text-sidebar-foreground group-hover:opacity-100 focus:opacity-100" onClick={() => remove(thread.id)} aria-label={`Delete ${thread.title}`}><Trash2 /></Button></TooltipTrigger><TooltipContent>Delete chat</TooltipContent></Tooltip></div>)}
          </div>
        </div>}
        <div className="mt-auto border-t border-sidebar-border p-3">
          {!collapsed ? (
            <p role="note" className="mb-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5 text-xs leading-5 text-sidebar-foreground/80"><strong className="font-semibold text-sidebar-foreground">AI can make mistakes.</strong> Always review outputs before professional use.</p>
          ) : (
            <Tooltip><TooltipTrigger asChild><div tabIndex={0} className="mb-2 grid size-9 place-items-center rounded-md border border-sidebar-border bg-sidebar-accent/40 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary"><TriangleAlert className="size-4 shrink-0 text-sidebar-primary" /></div></TooltipTrigger><TooltipContent className="max-w-60">AI can make mistakes. Always review outputs before professional use.</TooltipContent></Tooltip>
          )}
          <div className="flex items-center gap-3 rounded-md px-2 py-2"><ShieldCheck className="size-4 shrink-0 text-sidebar-primary" />{!collapsed && <span className="text-xs text-sidebar-foreground/65">Stored only on this device</span>}</div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2"><Button size="icon" variant="ghost" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><LayoutDashboard /></Button><Button size="icon" variant="ghost" className="hidden md:inline-flex" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle navigation"><PanelLeftClose className={collapsed ? "rotate-180" : ""} /></Button><span className="text-sm font-medium text-muted-foreground">Workspace</span></div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">Local mode</span>
        </header>
        {children}
      </main>
    </div>
  );
}

export function PageFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10"><div className="mb-8"><p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p><h1 className="text-3xl font-semibold text-foreground md:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p></div>{children}</div>;
}

export function ResponsibleNotice() { return <div className="flex gap-3 rounded-lg border border-primary/20 bg-brand-soft p-4 text-sm text-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /><p><strong>Responsible AI:</strong> Review generated content for accuracy, context, confidentiality, and appropriateness before use.</p></div>; }
