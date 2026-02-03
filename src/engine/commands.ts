import { getRandomAscii } from "./ascii"
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
  { text: "   ▄▄▀▀▀▀▀▄▄", type: "success" },
  { text: " ▄▄▀▀▀▀▀▀▀▀▀▀▀▄        gaurav@portfolio", type: "success" },
  { text: "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄      ─────────────────────", type: "success" },
  { text: "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      Role     -> Software Engineer", type: "success" },
  { text: " ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      Focus    -> Systems, AI, Quant", type: "success" },
  { text: "   ▀▀▀▀▀▀▀▀▀▀▀▀        Stack    -> C, C++, Rust, Python, TS", type: "success" },
  { text: "       ▄▀▀▀▀▀▄▄▄       OS       -> Linux (daily driver)", type: "success" },
  { text: "    ▀▀▄▀▀▀▀▀▀▀▀▀▀▄     Editor   -> Neovim", type: "success" },
  { text: "     ▀▀▀▀▀▀▀▀▀▀▀▀▀      ─────────────────────", type: "success" },
  { text: "", type: "normal" },
  { text: "This is a simple introduction.", type: "normal" },
  { text: "Type `neofetch` for a dynamic system-style view.", type: "normal" },
]

/* =============================
   NEOFETCH (DYNAMIC)
============================= */
export const neofetchCommand = (): TerminalLine[] => {
  const ascii = getRandomAscii()

  return [
    ...ascii.map((line): TerminalLine => ({
      text: `${line}        gaurav@portfolio`,
      type: "success" as const,
    })),
    { text: "─────────────────────────────", type: "success" as const },
    { text: "Role     -> Software Engineer", type: "success" as const },
    { text: "Focus    -> Systems, AI, Quant", type: "success" as const },
    { text: "Stack    -> C, C++, Rust, Python, TS", type: "success" as const },
    { text: "Shell    -> zsh", type: "success" as const },
    { text: "Terminal -> kitty (inspired)", type: "success" as const },
    { text: "─────────────────────────────", type: "success" as const },
  ]
}

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
]

