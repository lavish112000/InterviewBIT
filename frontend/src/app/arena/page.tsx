"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
// import { CodeEditor } from "@/components/arena/code-editor" // Temporarily commenting out if it causes hydration issues, but it should be fine.
import dynamic from 'next/dynamic'
import { ProblemPanel } from "@/components/arena/problem-panel"
import { OutputPanel } from "@/components/arena/output-panel"
import { useState } from "react"
import { Play, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/context/auth-context"
import { Loader2 } from "lucide-react"

// Dynamically import CodeEditor to avoid SSR issues with Monaco
const CodeEditor = dynamic(() => import("@/components/arena/code-editor").then(mod => mod.CodeEditor), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse" />
})

export default function ArenaPage() {
    const [code, setCode] = useState<string | undefined>("# Write your solution here\nprint('Hello World')")
    const [output, setOutput] = useState<string | null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const { user } = useAuth()

    const handleRunCode = async () => {
        if (!code) return
        setIsRunning(true)
        setOutput(null)

        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:8000/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ code, language: "python" })
            })

            const data = await res.json()
            if (res.ok) {
                setOutput(data.output)
            } else {
                setOutput(`Error: ${data.detail || "Execution failed"}`)
            }
        } catch (error) {
            setOutput("Network error: Failed to execute code")
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="h-12 border-b bg-muted/20 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">Python 3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" size="sm" onClick={handleRunCode} disabled={isRunning}>
                                {isRunning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                                Run
                            </Button>
                            <Button size="sm">
                                <Send className="h-4 w-4 mr-2" /> Submit
                            </Button>
                        </div>
                    </div>

                    {/* Flexbox Layout Replacement for Resizable Panels */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel: Problem Description */}
                        <div className="w-[30%] border-r h-full overflow-hidden">
                            <ProblemPanel />
                        </div>

                        {/* Middle Panel: Code Editor */}
                        <div className="w-[40%] border-r h-full relative">
                            <CodeEditor
                                language="python"
                                code={code || ""}
                                onChange={setCode}
                            />
                        </div>

                        {/* Right Panel: Output / Chat */}
                        <div className="w-[30%] h-full overflow-hidden">
                            <OutputPanel output={output} isLoading={isRunning} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
