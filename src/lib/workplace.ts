export type EmailTone = "Formal" | "Friendly" | "Persuasive";

const clean = (value: string) => value.trim().replace(/\s+/g, " ");
const sentence = (value: string) => {
  const text = clean(value);
  if (!text) return "the matter outlined below";
  return /[.!?]$/.test(text) ? text : `${text}.`;
};

export function generateEmail(recipient: string, purpose: string, tone: EmailTone, variation = 0) {
  const to = clean(recipient) || "there";
  const goal = sentence(purpose);
  const greetings = {
    Formal: [`Dear ${to},`, `Hello ${to},`],
    Friendly: [`Hi ${to},`, `Hello ${to},`],
    Persuasive: [`Hi ${to},`, `Hello ${to},`],
  };
  const bodies = {
    Formal: [
      `I am writing regarding ${goal.charAt(0).toLowerCase()}${goal.slice(1)} I would appreciate your consideration and any guidance on the appropriate next steps.`,
      `I would like to bring the following to your attention: ${goal} Please let me know whether you require any additional information to move this forward.`,
    ],
    Friendly: [
      `I wanted to reach out about ${goal.charAt(0).toLowerCase()}${goal.slice(1)} I’d value your thoughts and am happy to work around your schedule for the next step.`,
      `A quick note about ${goal.charAt(0).toLowerCase()}${goal.slice(1)} Let me know what works best for you, and I’ll take it from there.`,
    ],
    Persuasive: [
      `I’m reaching out because ${goal.charAt(0).toLowerCase()}${goal.slice(1)} Moving ahead now would help us maintain momentum, reduce avoidable delays, and give everyone clarity on the next step.`,
      `I’d like to propose that we act on the following: ${goal} This is a practical opportunity to align the team and deliver a stronger outcome without adding unnecessary complexity.`,
    ],
  };
  const closes = {
    Formal: "Kind regards,\n[Your name]",
    Friendly: "Best,\n[Your name]",
    Persuasive: "Looking forward to your response.\n\nBest regards,\n[Your name]",
  };
  const index = variation % 2;
  const subjectCore = clean(purpose).split(/[.!?]/)[0].slice(0, 68) || "Follow-up";
  return `Subject: ${tone === "Persuasive" ? "Next steps: " : ""}${subjectCore}\n\n${greetings[tone][index]}\n\n${bodies[tone][index]}\n\n${closes[tone]}`;
}

const extractKeywords = (input: string) => {
  const stop = new Set(["this", "that", "with", "from", "have", "will", "your", "about", "into", "their", "there", "which", "would", "could", "should", "article", "topic"]);
  return [...new Set(input.toLowerCase().match(/[a-z][a-z-]{4,}/g)?.filter((word) => !stop.has(word)) ?? [])].slice(0, 5);
};

export function generateResearch(input: string) {
  const source = clean(input);
  const keywords = extractKeywords(source);
  const subject = source.length > 110 ? `${source.slice(0, 107)}…` : source;
  const focus = keywords.length ? keywords.join(", ") : "the central workplace implications";
  return `## Executive summary\n\n${subject || "The requested topic"} points to a need for clear ownership, evidence-based decisions, and measurable follow-through. The strongest interpretation is to treat this as an operational priority rather than an isolated task.\n\n## Key insights\n\n- **Primary focus:** The material centres on ${focus}.\n- **Organisational impact:** Success depends on aligning people, process, and expected outcomes.\n- **Decision quality:** Assumptions should be separated from verified facts before commitments are made.\n- **Execution risk:** Unclear ownership and undefined measures are the most likely causes of delay.\n\n## Important points\n\n1. Define the problem and intended business outcome in one sentence.\n2. Identify stakeholders who provide input, approve decisions, and deliver the work.\n3. Record open questions, constraints, and sensitive information before distribution.\n4. Use a small set of indicators to evaluate progress and adjust the approach.\n\n## Practical recommendations\n\n- Assign one accountable owner and agree on the next review date.\n- Validate the claims related to ${keywords[0] ?? "the main topic"} with a reliable internal or external source.\n- Convert the findings into a short action plan with owners, dates, and success measures.\n- Share a concise version with decision-makers and retain the detailed notes for context.\n\n## Questions to verify\n\n- Which facts are confirmed, and which remain assumptions?\n- What confidential or sensitive context should be removed before sharing?\n- What decision should this research enable?`;
}

export function generateChatReply(input: string) {
  const text = clean(input);
  const lower = text.toLowerCase();
  if (/agenda|meeting/.test(lower)) return `Here’s a focused meeting structure you can use:\n\n1. **Outcome (2 min):** State the decision or result needed.\n2. **Context (5 min):** Share only the facts people need.\n3. **Discussion (15 min):** Work through risks, options, and dependencies.\n4. **Decision (5 min):** Confirm the chosen direction.\n5. **Actions (3 min):** Assign an owner and date to every next step.\n\nFor **${text}**, send the desired outcome in advance and close by reading back decisions and owners.`;
  if (/feedback|performance|difficult conversation/.test(lower)) return `A constructive approach is to keep the conversation specific and forward-looking:\n\n**Observation:** Describe what happened without assigning intent.\n**Impact:** Explain the effect on the team, work, or customer.\n**Next step:** Agree on one observable change and a check-in date.\n\nYou could open with: “I’d like to discuss **${text}** so we can agree on a practical way forward. I’ll share what I observed, then I’d like to hear your perspective.”`;
  if (/prioriti|workload|plan|deadline|task/.test(lower)) return `For **${text}**, use a simple impact-and-urgency pass:\n\n- **Do now:** Time-sensitive work with clear business impact.\n- **Schedule:** Important work that needs protected focus time.\n- **Delegate:** Work with a clear outcome that another owner can deliver.\n- **Clarify or stop:** Tasks with no decision-maker, deadline, or measurable value.\n\nStart by choosing the three outcomes that matter most this week. Give each one a next action, owner, and realistic completion date.`;
  if (/email|message|announce|write/.test(lower)) return `A clear workplace message should lead with the purpose, provide only the context needed, and end with an explicit action.\n\nFor **${text}**, use this structure:\n\n**Subject:** Specific outcome or decision\n**Opening:** Why you’re writing\n**Body:** Key context in two or three short points\n**Close:** What you need, from whom, and by when\n\nKeep the tone direct but considerate, and remove any confidential detail the recipient does not need.`;
  return `Here’s a practical way to approach **${text}**:\n\n1. Define the outcome you need and the deadline.\n2. Separate confirmed facts from assumptions or missing context.\n3. Identify the people who decide, contribute, and need to be informed.\n4. Choose the smallest useful next action and assign an owner.\n5. Review the result against a clear success measure.\n\nBefore acting, check whether the task involves confidential information, organisational policy, or a decision that needs human approval.`;
}
