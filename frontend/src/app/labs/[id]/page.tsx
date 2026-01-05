"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ChevronRight, Play, Terminal } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Editor from "@monaco-editor/react"

export default function LabDetailPage() {
    const pathname = usePathname()
    const labId = pathname.split('/').pop()
    const [currentStep, setCurrentStep] = useState(0)

    // Mock Lab Data (would fetch based on labId)
    const labData = {
        title: "FastAPI Fundamentals",
        steps: [
            {
                title: "Setup Basic API",
                theory: "FastAPI is a modern web framework for building APIs with Python 3.8+. It's based on standard Python type hints.",
                task: "Create a simple GET endpoint at `/` that returns `{'message': 'Hello World'}`.",
                codeTemplate: "from fastapi import FastAPI\n\napp = FastAPI()\n\n# Todo: Add your endpoint here",
                hints: ["Use @app.get('/') decorator", "Define an async function"]
            },
            {
                title: "Path Parameters",
                theory: "You can declare path parameters with the same syntax used by Python format strings.",
                task: "Create a GET endpoint `/items/{item_id}` that returns the item_id.",
                codeTemplate: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/items/{item_id}')\nasync def read_item(item_id: int):\n    return {}",
                hints: ["Ensure item_id is typed as int"]
            }
        ]
    }

    const activeStep = labData.steps[currentStep]

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 flex h-full overflow-hidden">
                    {/* Left Guide Panel */}
                    <div className="w-[35%] border-r h-full flex flex-col bg-card">
                        <div className="p-6 border-b">
                            <div className="text-sm text-primary font-semibold tracking-wide uppercase mb-2">Module 1</div>
                            <h1 className="text-2xl font-bold">{labData.title}</h1>
                        </div>
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm">
                                            {currentStep + 1}
                                        </span>
                                        {activeStep.title}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {activeStep.theory}
                                    </p>
                                    <div className="p-4 bg-muted/50 rounded-lg border">
                                        <h3 className="font-semibold mb-2">Your Task</h3>
                                        <p className="text-sm">{activeStep.task}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-sm">Hints</h3>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        {activeStep.hints.map((hint, i) => <li key={i}>{hint}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t flex justify-between items-center bg-background">
                            <Button variant="ghost" disabled={currentStep === 0} onClick={() => setCurrentStep(c => c - 1)}>
                                Previous
                            </Button>
                            <Button onClick={() => setCurrentStep(c => Math.min(c + 1, labData.steps.length - 1))}>
                                Next Step <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Code Panel */}
                    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e]">
                        <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#1e1e1e] text-white">
                            <div className="text-sm font-mono">main.py</div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0">
                                <Play className="h-4 w-4 mr-2" /> Run Code
                            </Button>
                        </div>
                        <div className="flex-1">
                            <Editor
                                height="100%"
                                defaultLanguage="python"
                                defaultValue={activeStep.codeTemplate}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                    padding: { top: 16 }
                                }}
                            />
                        </div>
                        <div className="h-48 border-t border-white/10 bg-[#1e1e1e] p-0 flex flex-col">
                            <div className="px-4 py-2 border-b border-white/10 text-xs font-semibold text-gray-400 flex items-center gap-2">
                                <Terminal className="h-3 w-3" /> TERMINAL
                            </div>
                            <div className="bg-black/50 p-4 font-mono text-sm text-gray-300 flex-1 overflow-auto">
                                $ uvicorn main:app --reload<br />
                                INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)<br />
                                INFO:     Started reloader process using StatReload<br />
                                <span className="animate-pulse">_</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
