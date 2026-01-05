"use client"

import Editor, { OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
    language: string
    code: string
    onChange: (value: string | undefined) => void
}

export function CodeEditor({ language, code, onChange }: CodeEditorProps) {
    const { theme } = useTheme()
    const editorRef = useRef(null)
    const [isEditorReady, setIsEditorReady] = useState(false)

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // @ts-ignore
        editorRef.current = editor
        setIsEditorReady(true)
    }

    return (
        <div className="h-full w-full relative group">
            {!isEditorReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            )}
            <Editor
                height="100%"
                width="100%"
                language={language}
                value={code}
                theme={theme === "dark" ? "vs-dark" : "light"}
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                }}
            />
        </div>
    )
}
