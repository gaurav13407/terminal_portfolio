import { getRandomAscii } from "./ascii"

export type Command = {
  name: string
  description: string
  run: () => string[]
}

/* =============================
   ABOUT / WHOAMI (PERMANENT)
============================= */
export const aboutCommand = () => [
  "   ▄▄▀▀▀▀▀▄▄",
  " ▄▄▀▀▀▀▀▀▀▀▀▀▀▄        gaurav@portfolio",
  "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄      ─────────────────────",
  "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      Role     -> Software Engineer",
  " ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      Focus    -> Systems, AI, Quant",
  "   ▀▀▀▀▀▀▀▀▀▀▀▀        Stack    -> C, C++, Rust, Python, TS",
  "       ▄▀▀▀▀▀▄▄▄       OS       -> Linux (daily driver)",
  "    ▀▀▄▀▀▀▀▀▀▀▀▀▀▄     Editor   -> Neovim",
  "     ▀▀▀▀▀▀▀▀▀▀▀▀▀      ─────────────────────",
  "",
  "This is a simple introduction.",
  "Type `neofetch` for a dynamic system-style view.",
]

/* =============================
   NEOFETCH (DYNAMIC)
============================= */
export const neofetchCommand = () => {
  const ascii = getRandomAscii()

  return [
    ...ascii.map(line => `${line}        gaurav@portfolio`),
    "─────────────────────────────",
    "Role     -> Software Engineer",
    "Focus    -> Systems, AI, Quant",
    "Stack    -> C, C++, Rust, Python, TS",
    "Shell    -> zsh",
    "Terminal -> kitty (inspired)",
    "─────────────────────────────",
  ]
}

/* =============================
   COMMAND REGISTRY
============================= */
export const commands: Command[] = [
  {
    name: "help",
    description: "Show all available commands",
    run: () => [
      "Available commands:",
      "",
      "help        -> Show this help menu",
      "about       -> About me (simple)",
      "whoami      -> Same as about",
      "neofetch    -> System-style view (dynamic)",
      "clear       -> Clear the terminal",
      "",
      "Tip: Type a command and press Enter.",
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
]

