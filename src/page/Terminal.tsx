import { useEffect, useState } from "react"
import { commands } from "../engine/commands"
import RightPanel from "./RightPanel"
const introLines = [
  "Welcome 👋",
  "This is an interactive terminal-style portfolio.",
  "You don’t need to be technical to use it.",
  "",
  "👉 Type `help` and press Enter to get started.",
]

export default function Terminal() {
  const [output, setOutput] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [input,setInput]=useState("")
  const [showPrompt,setShowPrompt]=useState(false)
  const [introDone, setIntroDone] = useState(false)
    /*------------------------------Intro Typing Affect-------------------------------------*/
  useEffect(() => {
    if (lineIndex >= introLines.length) return

    const currentLine = introLines[lineIndex]

    const timeout = setTimeout(() => {
      // Start new line
      if (charIndex === 0) {
        setOutput(prev => [...prev, ""])
      }

      // Add next character
      if (charIndex < currentLine.length) {
        setOutput(prev => {
          const updated = [...prev]
          updated[updated.length - 1] += currentLine[charIndex]
          return updated
        })
        setCharIndex(prev => prev + 1)
      } else {
        // Move to next line
        setCharIndex(0)
        setLineIndex(prev => {
            const next=prev + 1
            
            if(next === introLines.length){
                setOutput(o=>[...o,""])
                setIntroDone(true)
            }
            return next 
        })
      }
    }, 50) // typing speed (ms per character)

    return () => clearTimeout(timeout)
  }, [charIndex, lineIndex])

  /*-------------------------------Show Prompt After Intro--------------------------------*/
  useEffect(()=>{
        if(introDone){

          setShowPrompt(true)
      }
  }, [lineIndex])

  /*---------------------Keyboard input Handler----------------------------------*/
  useEffect(()=>{
      if(!showPrompt) return 
          const handleKeyDown=(e:KeyboardEvent)=>{
              if (e.key==="Backspace"){
                  setInput(prev =>prev.slice(0,-1))
              }
              else if(e.key==="Enter"){
                    const trimmed=input.trim()

                    setOutput(prev =>[
                        ...prev,
                    `gaurav@portfolio:~$ ${trimmed}`,
                    ])
                    if(trimmed.length === 0){
                        setInput("")
                        return 
                    }
                    const cmd=commands.find(c => c.name === trimmed)

                    if(cmd){
                        setOutput(prev=>[...prev,...cmd.run()])
                    }else{
                        setOutput(prev =>[
                            ...prev,
                            `command not found: ${trimmed}`,
                            "Type `help` to see available commands.",
                        ])
                    }
                    setInput("")
              }
              else if(e.key.length ===1){
                  setInput(prev =>prev+e.key)
              }
          }
          window.addEventListener("keydown",handleKeyDown)
          return () =>window.removeEventListener("keydown",handleKeyDown)
  },[input,showPrompt])
  /*---------------------Render---------------------------*/
return (
  <div className="min-h-screen w-screen bg-black text-green-400 font-mono">
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base">

      {/* LEFT SIDE: terminal output */}
      <div className="md:col-span-2 space-y-2">
        {output.map((line, idx) => (
          <div key={idx} className="text-green-400">
            {line}
          </div>
        ))}

        {showPrompt && (
          <div className="flex">
            <span className="text-green-500">gaurav@portfolio</span>
            <span className="text-green-300">:~$</span>
            <span className="ml-2">{input}</span>
            <span className="ml-1 animate-pulse">█</span>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: system info */}
      {introDone && (
        <div className="hidden md:block">
          <RightPanel />
        </div>
      )}

    </div>
  </div>
)
  
}

