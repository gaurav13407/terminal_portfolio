import { useEffect, useState } from "react"
import { commands } from "../engine/commands"
import RightPanel from "./RightPanel"

const introLines = [
  "Welcome 👋",
  "This is an interactive terminal-style portfolio.",
  "You don't need to be technical to use it.",
  "",
  "👉 Type `help` and press Enter to get started.",
]

export default function Terminal() {
  const [output, setOutput] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const [input, setInput] = useState("")
  const [introDone, setIntroDone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

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

        setOutput(prev => {
          const next = [
            ...prev,
            `gaurav@portfolio:~$ ${trimmed}`,
          ]

          if (trimmed.length === 0) return next

          const cmd = commands.find(c => c.name === trimmed)

          if (cmd) {
            return [...next, ...cmd.run()]
          }

          return [
            ...next,
            `command not found: ${trimmed}`,
            "Type `help` to see available commands.",
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
              {output.slice(0, 6).map((line, idx) => (
                <div key={idx} className="text-green-400">
                  {line}
                </div>
              ))}
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
            {output.slice(6).map((line, idx) => (
              <div key={idx} className="text-green-400">
                {line}
              </div>
            ))}
          </div>
        )}
        
        {/* Active prompt - appears below everything */}
        {showPrompt && (
          <div className="flex mt-2">
            <span className="text-green-500">gaurav@portfolio</span>
            <span className="text-green-300">:~$</span>
            <span className="ml-2">{input}</span>
            <span className="ml-1 animate-pulse">█</span>
          </div>
        )}
        
      </div>
    </div>
  )
}
