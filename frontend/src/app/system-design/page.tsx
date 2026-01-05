"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import dynamic from "next/dynamic"

// Dynamically import Canvas to avoid SSR issues with React Flow
const SystemDesignCanvas = dynamic(() => import("@/components/system-design/canvas"), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-muted">Loading Canvas...</div>
})

export default function SystemDesignPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />
                <main className="flex-1 h-full w-full overflow-hidden">
                    <SystemDesignCanvas />
                </main>
            </div>
        </div>
    )
}
