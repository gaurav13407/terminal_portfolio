import Terminal from "./page/Terminal"

export default function App(){
    console.log("App component rendering")
    return (
        <div style={{ background: "black", minHeight: "100vh", width: "100vw" }}>
            <Terminal />
        </div>
    )
}
