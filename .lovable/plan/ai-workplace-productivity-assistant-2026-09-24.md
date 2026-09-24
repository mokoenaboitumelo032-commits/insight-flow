# AI Workplace Productivity Assistant

## What will be built

- A responsive SaaS workspace with a collapsible desktop sidebar and mobile navigation.
- Dedicated pages for Dashboard, Email Generator, Research Assistant, AI Chat, and Settings.
- A deep teal and bright turquoise visual system with accessible contrast, rounded cards, restrained shadows, and polished loading states.
- A prominent responsible-AI notice reminding users to review accuracy, context, confidentiality, and appropriateness.

## Tools

### Dashboard
- Show focused quick actions for Email Generator, Research Assistant, and AI Chat.
- Include a lightweight recent-work area populated from browser-stored chat activity.

### Smart Email Generator
- Accept recipient/context, purpose, and Formal, Friendly, or Persuasive tone.
- Generate context-aware workplace emails locally using adaptable response patterns.
- Allow direct editing, copying, and regeneration with visible progress and success feedback.

### Research Assistant
- Accept a topic or pasted article.
- Produce an editable structured result with summary, key insights, important points, and practical recommendations.
- Adapt the generated content to meaningful terms found in the input and support one-click copying.

### AI Workplace Chat
- Use AI Elements for the conversation, messages, prompt composer, and thinking state.
- Create threaded conversations with stable `/chat/:threadId` pages.
- Store all threads and messages only in localStorage, with create, reopen, and individual delete actions.
- Provide suggested workplace prompts and context-aware local response patterns; no network model calls.
- Keep the composer focused and show the user message immediately while a response is prepared.

### Settings
- Provide browser-only preferences for response detail and writing defaults.
- Clearly explain local storage and offer a controlled way to clear local workspace data.

## Technical details

- Keep the existing TanStack Start structure and add real route files for every navigation destination.
- Install and compose the required AI Elements source components before implementing chat UI.
- Use semantic Tailwind v4 tokens in the global design system and existing shadcn controls.
- Build local generation utilities and a safe, idempotent localStorage thread store; no Cloud, authentication, database, API route, or external integration.
- Add unique page metadata for every content route.
- Verify navigation, generators, editing/copying, thread isolation, reload restoration, deletion, and mobile/desktop layouts in the live preview.
