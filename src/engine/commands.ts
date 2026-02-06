import type { TerminalLine } from "./terminalTypes"

/* =============================
   COMMAND TYPE
============================= */
export type Command = {
  name: string
  description: string
  run: () => TerminalLine[]
}

/* =============================
   ABOUT / WHOAMI (PERMANENT)
============================= */
export const aboutCommand = (): TerminalLine[] => [
  { text: "gaurav@portfolio", type: "success" },
  { text: "─────────────────────", type: "success" },
  { text: "", type: "normal" },
  { text: "I am a systems-oriented software engineer who enjoys building things", type: "normal" },
  { text: "from scratch to understand how they actually work.", type: "normal" },
  { text: "", type: "normal" },
  { text: "I'm most interested in low-level systems, performance, and internals.", type: "normal" },
  { text: "Instead of relying heavily on frameworks, I prefer to explore how core", type: "normal" },
  { text: "components behave under the hood — memory management, networking,", type: "normal" },
  { text: "event loops, and execution models.", type: "normal" },
  { text: "", type: "normal" },
  { text: "This terminal portfolio reflects that mindset.", type: "success" },
  { text: "Rather than a traditional website, I built an interactive REPL to show", type: "normal" },
  { text: "how I think about input handling, state, UX, and async behavior in a", type: "normal" },
  { text: "clear and minimal way.", type: "normal" },
  { text: "", type: "normal" },
  { text: "My projects span systems programming, secure networking, and applied", type: "normal" },
  { text: "machine learning. I enjoy combining depth with practicality — whether", type: "normal" },
  { text: "that's writing a custom memory allocator in C, building an encrypted", type: "normal" },
  { text: "P2P voice system in Rust, or using ML to solve real-world problems.", type: "normal" },
  { text: "", type: "normal" },
  { text: "I care about clarity over cleverness, fundamentals over buzzwords,", type: "normal" },
  { text: "and finishing fewer projects well instead of many projects halfway.", type: "normal" },
  { text: "", type: "normal" },
  { text: "Currently, I'm continuing to deepen my understanding of systems,", type: "normal" },
  { text: "AI/ML, and quantitative finance by building and experimenting.", type: "normal" },
  { text: "", type: "normal" },
  { text: "Type 'projects' to see what I'm working on.", type: "success" },
]

/* =============================
   NEOFETCH (DYNAMIC)
============================= */
export const neofetchCommand = (): TerminalLine[] => {
  return [
    { text: "gaurav@portfolio", type: "success" },
    { text: "────────────────────────", type: "success" },
    { text: "OS        → Linux", type: "success" },
    { text: "Shell     → zsh (inspired)", type: "success" },
    { text: "Editor    → Neovim", type: "success" },
    { text: "Focus     → Systems • AI • Quant", type: "success" },
    { text: "Languages → C, C++, Rust, Python, TypeScript", type: "success" },
    { text: "Status    → Actively building", type: "success" },
    { text: "────────────────────────", type: "success" },
  ]
}

/* =============================
   PROJECTS COMMAND
============================= */
export const projectsCommand = (): TerminalLine[] => [
  { text: "💻 CURRENT PROJECTS", type: "success" },
  { text: "", type: "normal" },
  { text: "1. Interactive Terminal Portfolio", type: "success" },
  { text: "   → Keyboard-driven REPL built from scratch with history, tab completion, Ctrl+C/L", type: "normal" },
  { text: "   → Focused on UX, event handling, async behavior, and clean system design", type: "normal" },
  { text: "", type: "normal" },
  { text: "2. Secure P2P Voice + Text Chat", type: "success" },
  { text: "   → End-to-end encrypted, Rust-based real-time voice and messaging system", type: "normal" },
  { text: "   → Custom signaling, peer discovery, identity handling, and low-level networking", type: "normal" },
  { text: "", type: "normal" },
  { text: "3. Custom Memory Allocator", type: "success" },
  { text: "   → malloc/free implementation from scratch in C with fragmentation handling", type: "normal" },
  { text: "   → Benchmarked allocation strategies and studied memory layout & performance", type: "normal" },
  { text: "", type: "normal" },
  { text: "4. Toxic Comment Detection System", type: "success" },
  { text: "   → ML pipeline for detecting toxic comments with research-oriented evaluation", type: "normal" },
  { text: "   → Includes custom preprocessing, model comparison, and performance analysis", type: "normal" },
  { text: "", type: "normal" },
  { text: "5. Rust ML Algorithms Library", type: "success" },
  { text: "   → Rewriting core ML algorithms from scratch in Rust", type: "normal" },
  { text: "   → Focus on performance, correctness, and understanding internals beyond libraries", type: "normal" },
  { text: "", type: "normal" },
  { text: "6. FinDeck (AI-Powered Finance Tool)", type: "success" },
  { text: "   → Converts Excel-based financial data into pitch-ready PowerPoint presentations", type: "normal" },
  { text: "   → AI-assisted insights, summaries, and slide suggestions for finance use-cases", type: "normal" },
]

/* =============================
   CONTACT COMMAND
============================= */
export const contactCommand = (): TerminalLine[] => [
  { text: "📧 CONTACT INFORMATION", type: "success" },
  { text: "", type: "normal" },
  { text: "GitHub   → https://github.com/gaurav13407", type: "normal" },
  { text: "LinkedIn → https://www.linkedin.com/in/gaurav-joshi-142052346/", type: "normal" },
  { text: "Email    → gauravjoshi13407@gmail.com", type: "normal" },
]

/* =============================
   SKILLS COMMAND
============================= */
export const skillsCommand = (): TerminalLine[] => [
  { text: "💻 TECHNICAL SKILLS", type: "success" },
  { text: "", type: "normal" },
  { text: "Languages:", type: "success" },
  { text: "  • C", type: "normal" },
  { text: "  • C++", type: "normal" },
  { text: "  • Rust", type: "normal" },
  { text: "  • Python", type: "normal" },
  { text: "  • TypeScript", type: "normal" },
  { text: "", type: "normal" },
  { text: "Systems & Low-Level:", type: "success" },
  { text: "  • Memory management", type: "normal" },
  { text: "  • Data layout & performance", type: "normal" },
  { text: "  • Event-driven systems", type: "normal" },
  { text: "  • Networking fundamentals", type: "normal" },
  { text: "  • Concurrency basics", type: "normal" },
  { text: "", type: "normal" },
  { text: "AI / ML:", type: "success" },
  { text: "  • Traditional ML pipelines", type: "normal" },
  { text: "  • Neural network fundamentals", type: "normal" },
  { text: "  • NLP basics", type: "normal" },
  { text: "  • Model evaluation & experimentation", type: "normal" },
  { text: "", type: "normal" },
  { text: "Tools & Environment:", type: "success" },
  { text: "  • Linux (daily driver)", type: "normal" },
  { text: "  • Git & GitHub", type: "normal" },
  { text: "  • Neovim", type: "normal" },
  { text: "  • CLI-first workflows", type: "normal" },
  { text: "", type: "normal" },
  { text: "Currently Learning:", type: "success" },
  { text: "  • Quantitative finance", type: "normal" },
  { text: "  • Advanced systems design", type: "normal" },
  { text: "  • Performance optimization techniques", type: "normal" },
]

/* =============================
   COMMAND REGISTRY
============================= */
export const commands: Command[] = [
  {
    name: "help",
    description: "Show all available commands",
    run: (): TerminalLine[] => [
      { text: "Available commands:", type: "success" },
      { text: "", type: "normal" },
      { text: "help        -> Show this help menu", type: "normal" },
      { text: "about       -> About me (simple)", type: "normal" },
      { text: "whoami      -> Same as about", type: "normal" },
      { text: "projects    -> Show my current projects", type: "normal" },
      { text: "skills      -> Technical skills & expertise", type: "normal" },
      { text: "contact     -> Contact information", type: "normal" },
      { text: "neofetch    -> System-style view (dynamic)", type: "normal" },
      { text: "fetch       -> Fetch profile data", type: "normal" },
      { text: "clear       -> Clear the terminal", type: "normal" },
      { text: "", type: "normal" },
      { text: "Tip: Type a command and press Enter.", type: "success" },
    ],
  },
  {
    name: "about",
    description: "About me",
    run: aboutCommand,
  },
  {
    name: "whoami",
    description: "Alias for about",
    run: aboutCommand,
  },
  {
    name: "projects",
    description: "Show my current projects",
    run: projectsCommand,
  },
  {
    name: "skills",
    description: "Technical skills & expertise",
    run: skillsCommand,
  },
  {
    name: "contact",
    description: "Contact information",
    run: contactCommand,
  },
  {
    name: "neofetch",
    description: "System-style information",
    run: neofetchCommand,
  },
  {
    name: "fetch",
    description: "Fetch profile data",
    run: (): TerminalLine[] => [
      { text: "Fetching profile data...", type: "normal" },
    ],
  },
  {
    name: "clear",
    description: "Clear the terminal",
    run: (): TerminalLine[] => [
      { text: "", type: "normal" },
    ],
  },
]

