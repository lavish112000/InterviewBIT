"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function ResumePage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisComplete, setAnalysisComplete] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startAnalysis()
        }
    }

    const startAnalysis = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAnalysisComplete(true)
        }, 2000)
    }

    const scoreData = [
        { name: 'Score', value: 78, color: '#2563EB' },
        { name: 'Remaining', value: 22, color: '#e2e8f0' },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-8 space-y-8 overflow-y-auto">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Resume Optimizer</h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            AI-powered analysis to get your resume past ATS and into human hands.
                        </p>
                    </div>

                    {!analysisComplete ? (
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Drag & Drop your Resume</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm">
                                Support for PDF, DOCX (Max 5MB). We analyze impact verbs, quantification, and keyword matching.
                            </p>
                            <Button onClick={startAnalysis} disabled={isAnalyzing}>
                                {isAnalyzing ? "Analyzing..." : "Select File"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Top Stats */}
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">ATS Score</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-primary">78/100</div>
                                        <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">Top 15% of candidates</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Impact Verbs</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">12</div>
                                        <p className="text-xs text-muted-foreground mt-1 text-orange-500 font-medium">Needs improvement (Aim for 20+)</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Skills Matched</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">85%</div>
                                        <p className="text-xs text-muted-foreground mt-1">High alignment with target role</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Detailed Analysis */}
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Detailed Analysis</CardTitle>
                                        <CardDescription>Breakdown of your resume's strengths and weaknesses.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Impact Quantification</div>
                                                <span className="text-green-600">Good</span>
                                            </div>
                                            <Progress value={80} className="h-2" />
                                            <p className="text-xs text-muted-foreground">You quantified results in 80% of your experience bullets. Great job!</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-500" /> Action Verbs</div>
                                                <span className="text-orange-500">Average</span>
                                            </div>
                                            <Progress value={50} className="h-2" />
                                            <p className="text-xs text-muted-foreground">Try using stronger verbs like 'Architected', 'Spearheaded' instead of 'Worked on'.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-blue-500" /> Formatting & Structure</div>
                                                <span className="text-blue-500">Excellent</span>
                                            </div>
                                            <Progress value={95} className="h-2" />
                                            <p className="text-xs text-muted-foreground">Clean layout with consistent spacing and clear hierarchy.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Items */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Action Items</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                                                <h4 className="text-sm font-semibold text-orange-600 mb-1">Rewrite Summary</h4>
                                                <p className="text-xs text-muted-foreground">Your summary is too generic. Mention specific tech stack and years of experience.</p>
                                            </div>
                                            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                                <h4 className="text-sm font-semibold text-blue-600 mb-1">Add 'Docker'</h4>
                                                <p className="text-xs text-muted-foreground">This keyword is missing but critical for your target role.</p>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4" variant="outline">Download Report</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
