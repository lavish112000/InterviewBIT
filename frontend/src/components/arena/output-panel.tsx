import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, CheckCircle2, AlertCircle, Sparkles, Send } from "lucide-react"

interface OutputPanelProps {
    output: string | null
    isLoading: boolean
}

export function OutputPanel({ output, isLoading }: OutputPanelProps) {
    return (
        <div className="h-full bg-card flex flex-col">
            <Tabs defaultValue="testcase" value={output ? "result" : "testcase"} className="w-full flex-1 flex flex-col">
                <div className="border-b px-4">
                    <TabsList className="h-10 bg-transparent p-0">
                        <TabsTrigger value="testcase" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4">Test Cases</TabsTrigger>
                        <TabsTrigger value="result" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4">Result</TabsTrigger>
                        <TabsTrigger value="ai" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4">AI Coach</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="testcase" className="flex-1 p-0 m-0">
                    <ScrollArea className="h-full p-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground">Case 1</label>
                                <div className="rounded-md border bg-muted/50 p-3 font-mono text-sm">
                                    nums = [2,7,11,15]
                                    <br />
                                    target = 9
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground">Case 2</label>
                                <div className="rounded-md border bg-muted/50 p-3 font-mono text-sm">
                                    nums = [3,2,4]
                                    <br />
                                    target = 6
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="result" className="flex-1 p-0 m-0">
                    <div className="p-4 h-full flex flex-col">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <span className="animate-pulse">Running code...</span>
                            </div>
                        ) : output ? (
                            <ScrollArea className="flex-1">
                                <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
                            </ScrollArea>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center">
                                    <Terminal className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                    <p>Run your code to see results</p>
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="ai" className="flex-1 p-0 m-0">
                    <div className="p-4 h-full flex flex-col">
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4 text-sm">
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                                        <p>Hi! I'm your coding coach. Stuck on the approach? I can give you a hint without revealing the answer!</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="mt-4 flex gap-2">
                            <input className="flex-1 bg-background border rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Ask for a hint..." />
                            <button className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

