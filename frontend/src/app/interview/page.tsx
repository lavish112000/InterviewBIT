"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Send, Bot, User, StopCircle } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export default function InterviewPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI interviewer from Equal Collective. Today, we'll focus on System Design and Architecture. To start, could you briefly describe a project where you had to scale a backend system?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newMessage])
        setInputValue("")

        // Simulate AI thinking and response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "That's an interesting approach. When you mentioned scaling the database, did you consider sharding vs replication? What trade-offs were involved in that decision?",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1500)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Bot className="h-6 w-6 text-primary" />
                                System Design Interview
                            </h2>
                            <p className="text-muted-foreground">Focus: Backend Scalability • Duration: 45m</p>
                        </div>
                        <Button variant="outline" className="text-destructive hover:text-destructive">
                            End Session
                        </Button>
                    </div>

                    <div className="flex-1 bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex gap-4 max-w-[80%]",
                                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        <Avatar className="h-8 w-8 mt-1 border">
                                            {msg.role === 'assistant' ? (
                                                <>
                                                    <AvatarImage src="/ai-avatar.png" />
                                                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                                                </>
                                            ) : (
                                                <>
                                                    <AvatarImage src="/user-avatar.png" />
                                                    <AvatarFallback className="bg-muted"><User className="h-4 w-4" /></AvatarFallback>
                                                </>
                                            )}
                                        </Avatar>
                                        <div
                                            className={cn(
                                                "p-4 rounded-2xl text-sm leading-relaxed",
                                                msg.role === 'user'
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-muted text-muted-foreground rounded-tl-none"
                                            )}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        <div className="p-4 bg-background border-t">
                            <div className="relative flex items-center gap-2">
                                <Button
                                    variant={isRecording ? "destructive" : "ghost"}
                                    size="icon"
                                    className="shrink-0 rounded-full"
                                    onClick={() => setIsRecording(!isRecording)}
                                >
                                    {isRecording ? <StopCircle className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
                                </Button>
                                <input
                                    className="flex-1 bg-muted/50 border-0 rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                                    placeholder="Type your answer... (or use voice)"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button
                                    size="icon"
                                    className="rounded-full shrink-0"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-xs text-muted-foreground">AI can make mistakes. Check important info.</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
