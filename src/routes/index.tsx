import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard-page";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard — Workmate AI" },
    { name: "description", content: "Your private workplace productivity dashboard for writing, research, and planning." },
    { property: "og:title", content: "Dashboard — Workmate AI" },
    { property: "og:description", content: "Your private workplace productivity dashboard for writing, research, and planning." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <DashboardPage />;
}
