export type OutputType = "normal" | "success" | "error"

export interface TerminalLine {
  text: string
  type: OutputType
}
