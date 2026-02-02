import { useEffect, useState } from "react"
import { commands } from "../engine/commands"
import RightPanel from "./RightPanel"
import type { TerminalLine } from "../engine/terminalTypes"

const introLines = [
  "Welcome 👋",
  "This is an interactive terminal-style portfolio.",
  "You don't need to be technical to use it.",
  "",
  "👉 Type `help` and press Enter to get started.",
]

export default function Terminal() {
  const [output, setOutput] = useState<(string | TerminalLine)[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const [input, setInput] = useState("")
  const [introDone, setIntroDone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  // Check if current input is a valid command
  const isValidCommand = () => {
    const trimmed = input.trim()
    if (trimmed === "clear") return true
    return trimmed && commands.some(c => c.name === trimmed)
  }

  /* =============================
     INTRO TYPING EFFECT
  ============================== */
  useEffect(() => {
    if (lineIndex >= introLines.length) return

    const currentLine = introLines[lineIndex]

    const timeout = setTimeout(() => {
      if (charIndex === 0) {
        setOutput(prev => [...prev, ""])
      }

      if (charIndex < currentLine.length) {
        setOutput(prev => {
          const updated = [...prev]
          updated[updated.length - 1] += currentLine[charIndex]
          return updated
        })
        setCharIndex(prev => prev + 1)
      } else {
        setCharIndex(0)
        setLineIndex(prev => {
          const next = prev + 1
          if (next === introLines.length) {
            setOutput(o => [...o, ""])
            setIntroDone(true)
          }
          return next
        })
      }
    }, 50)

    return () => clearTimeout(timeout)
  }, [charIndex, lineIndex])

  /* =============================
     SHOW PROMPT AFTER INTRO
  ============================== */
  useEffect(() => {
    if (introDone) {
      setShowPrompt(true)
    }
  }, [introDone])

  /* =============================
     KEYBOARD INPUT HANDLER
  ============================== */
  useEffect(() => {
    if (!showPrompt) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInput(prev => prev.slice(0, -1))
      } 
      else if (e.key === "Enter") {
        const trimmed = input.trim()

        // Handle clear command separately - preserve intro lines
        if (trimmed === "clear") {
          setOutput(prev => prev.slice(0, 6))
          setInput("")
          return
        }

        setOutput(prev => {
          const next: (string | TerminalLine)[] = [
            ...prev,
            { text: `gaurav@portfolio:~$ ${trimmed}`, type: "normal" },
          ]

          if (trimmed.length === 0) return next

          const cmd = commands.find(c => c.name === trimmed)

          if (cmd) {
            return [...next, ...cmd.run()]
          }

          return [
            ...next,
            { text: `command not found: ${trimmed}`, type: "error" },
            { text: "Type 'help' to see available commands.", type: "normal" },
          ]
        })

        setInput("")
      } 
      else if (e.key.length === 1) {
        setInput(prev => prev + e.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [input, showPrompt])

  /* =============================
     RENDER
  ============================== */
  return (
    <div className="min-h-screen w-screen bg-black text-green-400 font-mono">
      <div className="p-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT: intro section (always visible) */}
          <div className="md:col-span-2">
            {/* Intro section - matches right panel height */}
            <div className="space-y-2 md:min-h-[450px]">
              {output.slice(0, 6).map((line, idx) => {
                const textContent = typeof line === "string" ? line : line.text
                return (
                  <div key={idx} className="text-green-400">
                    {textContent}
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT: persistent about panel */}
          {introDone && (
            <div className="hidden md:block">
              <RightPanel />
            </div>
          )}

        </div>
        
        {/* Command output section - appears BELOW grid after intro */}
        {introDone && (
          <div className="mt-6 space-y-2">
            {output.slice(6).map((line, idx) => {
              if (typeof line === "string") {
                return (
                  <div key={idx} className="text-green-400">
                    {line}
                  </div>
                )
              }
              
              const colorClass =
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "success"
                  ? "text-green-400"
                  : "text-gray-300"
              
              return (
                <div key={idx} className={colorClass}>
                  {line.text}
                </div>
              )
            })}
          </div>
        )}
        
        {/* Active prompt - appears below everything */}
        {showPrompt && (
          <div className="flex mt-2">
            <span className="text-green-500">gaurav@portfolio</span>
            <span className="text-green-300">:~$</span>
            <span className={`ml-2 ${
              input.trim() ? (isValidCommand() ? "text-green-400" : "text-red-400") : "text-gray-300"
            }`}>
              {input}
            </span>
            <span className="ml-1 animate-pulse text-green-400">█</span>
          </div>
        )}
        
      </div>
    </div>
  )
}