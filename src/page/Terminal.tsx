import { useEffect, useState, useRef, useCallback } from "react"
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
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [introDone, setIntroDone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const historyRef = useRef<string[]>([])
  const historyIndexRef = useRef<number | null>(null)
  const inputRef = useRef("")
  const bottomRef=useRef<HTMLDivElement | null>(null)

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

  useEffect(()=>{
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[output])

  /* =============================
     KEYBOARD INPUT HANDLER
  ============================== */
 useEffect(()=>{
     historyRef.current=commandHistory
 },[commandHistory])
 
 useEffect(() => {
     inputRef.current = input
 }, [input])
 
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
        /*---------------Command History---------------------*/ 
         
        if(e.key === "ArrowUp"){
            e.preventDefault()
            const history=historyRef.current
            if(history.length === 0) return

            const nextIndex=
                historyIndexRef.current === null 
                    ? history.length-1 
                    : Math.max(historyIndexRef.current - 1, 0)
            
            historyIndexRef.current = nextIndex
            const newInput = history[nextIndex]
            inputRef.current = newInput
            setInput(newInput)
            
            return 
        }

        if(e.key === "ArrowDown"){
            e.preventDefault()
            const history=historyRef.current
            if(history.length === 0) return 

            if(historyIndexRef.current === null) return 

            const nextIndex = historyIndexRef.current + 1 
            if(nextIndex >= history.length){
                historyIndexRef.current = null
                inputRef.current = ""
                setInput("")
                return
            }
            historyIndexRef.current = nextIndex
            const newInput = history[nextIndex]
            inputRef.current = newInput
            setInput(newInput)
            return 
        }

        /*-------------------Backspace-----------------------------*/
      if (e.key === "Backspace") {
        const newInput = inputRef.current.slice(0, -1)
        inputRef.current = newInput
        setInput(newInput)
        return 
      } 
      /*---------------------------Enter-------------------------------*/
      else if (e.key === "Enter") {
        const trimmed = inputRef.current.trim()

        // Handle clear command separately - preserve intro lines
        if (trimmed === "clear") {
          setOutput(prev => prev.slice(0, 6))
          inputRef.current = ""
          setInput("")
          return
        }


        setOutput(prev => {
          const next: (string | TerminalLine)[] = [
            ...prev,
            { text: `gaurav@portfolio:~$ ${trimmed}`, type: "normal" },
          ]
             
            if (trimmed.length > 0) {
            setCommandHistory(prev => {
                const next=[...prev,trimmed]
                historyRef.current=next 
                return next
            })
            historyIndexRef.current=null 
            }
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

        inputRef.current = ""
        setInput("")
      } 
      else if (e.key.length === 1) {
        historyIndexRef.current=null 
        const newInput = inputRef.current + e.key
        inputRef.current = newInput
        setInput(newInput)
      }
    }, [])
 
  useEffect(() => {
    if (!showPrompt) return

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showPrompt, handleKeyDown])

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
            <div ref={bottomRef} />
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
