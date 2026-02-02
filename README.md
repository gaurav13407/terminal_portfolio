🖥️ Terminal-Style Interactive Portfolio

An interactive, terminal-inspired personal portfolio built with React + TypeScript, designed to mimic the behavior and feel of a real Linux terminal.
Instead of traditional pages, buttons, or navigation bars, users explore the portfolio by typing commands — just like in a real shell.

A persistent About sidebar provides context at all times, inspired by terminal system info panels (neofetch-style), making the experience intuitive even for non-technical users.

✨ Features
🔹 Core Experience

Single-screen terminal UI (no routing, no pages)

Character-by-character intro typing for an authentic boot-up feel

Keyboard-driven input (no <input> or form elements)

Command-based navigation (help, about, whoami, neofetch, etc.)

Persistent About panel displayed alongside the terminal after intro completion

Non-technical friendly guidance (Type help to get started)

🔹 Terminal Behavior

Realistic prompt (gaurav@portfolio:~$)

Command execution and output history

Friendly error handling for unknown commands

Clean spacing and scrolling similar to real terminals

Output rendered line-by-line (terminal-style stdout)

🔹 System-Inspired UI

About panel inspired by real terminal system summaries

Optional dynamic ASCII output for system-style commands

Responsive layout (sidebar hidden on small screens)

🧠 Design Philosophy

Most portfolios follow a predictable structure: landing page → sections → links.
This project intentionally breaks that pattern.

The goal is to:

Reflect real developer workflows

Emphasize architecture and interaction design

Create a memorable experience without sacrificing clarity

Special care is taken to ensure:

Non-technical users are not confused

Technical users feel “at home”

UI logic and command logic remain cleanly separated

🏗️ Architecture Overview
src/
├── page/
│   ├── Terminal.tsx      # Main terminal UI & input handling
│   └── RightPanel.tsx    # Persistent About sidebar
│
├── engine/
│   ├── commands.ts       # Command registry (help, about, neofetch, etc.)
│   └── ascii.ts          # ASCII variants for dynamic commands
│
├── App.tsx
└── main.tsx

Key Principles

Separation of concerns

UI rendering ≠ command logic

State-driven terminal

Output history stored as data

Extensible command engine

New commands can be added without touching UI code

🛠️ Tech Stack

React

TypeScript

Tailwind CSS

Vite

No backend (pure frontend logic)

🚀 Getting Started
Prerequisites

Node.js (v18+ recommended)

npm

Installation
git clone https://github.com/your-username/terminal-portfolio.git
cd terminal-portfolio
npm install
npm run dev


Open the browser at:

http://localhost:5173

🧪 How to Use

Open the site

Wait for the intro to finish typing

Follow the instruction shown on screen

Type:

help


Explore available commands through the terminal

📌 Available Commands
Command	Description
help	Show all available commands
about	Simple introduction (also shown in sidebar)
whoami	Alias for about
neofetch	Dynamic system-style view
clear	Clear terminal output (left panel only)

(More commands can be added easily via commands.ts)

🎯 Why This Project Stands Out

No page routing or fake terminal emulation

No UI libraries for typing or input tricks

Keyboard-first interaction

Realistic terminal mental model

Clean, readable, scalable codebase

This project demonstrates systems-oriented thinking, not just frontend styling.

🔮 Future Improvements

Command history (↑ / ↓)

Auto-scroll behavior

Autocomplete / suggestions

Theme switching

Session persistence

Mobile-optimized terminal input

📜 License

MIT License — feel free to fork, adapt, and experiment.

👋 Author

Gaurav Joshi
Software Engineer | Systems, AI & Quant-focused
Inspired by real Linux terminal workflows
