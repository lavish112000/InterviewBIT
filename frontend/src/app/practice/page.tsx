"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Problem {
    id: number
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    acceptance_rate: number
    url: string
    company_tags: string
}

export default function PracticePage() {
    const [problems, setProblems] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)
    const [companyFilter, setCompanyFilter] = useState<string>("")
    const [difficultyFilter, setDifficultyFilter] = useState<string>("")

    useEffect(() => {
        fetchProblems()
    }, [companyFilter, difficultyFilter])

    const fetchProblems = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (companyFilter) params.append("company", companyFilter)
            if (difficultyFilter && difficultyFilter !== "All") params.append("difficulty", difficultyFilter)

            const res = await fetch(`http://localhost:8000/problems?${params.toString()}`)
            const data = await res.json()
            setProblems(data)
        } catch (error) {
            console.error("Failed to fetch problems", error)
        } finally {
            setLoading(false)
        }
    }

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case "Easy": return "text-green-500 bg-green-500/10"
            case "Medium": return "text-orange-500 bg-orange-500/10"
            case "Hard": return "text-red-500 bg-red-500/10"
            default: return "text-muted-foreground"
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Problem Explorer</h1>
                            <p className="text-muted-foreground mt-1">
                                Access 1000+ real interview questions from top tech companies.
                            </p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Select onValueChange={setCompanyFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="amazon">Amazon</SelectItem>
                                    <SelectItem value="google">Google</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                    <SelectItem value="microsoft">Microsoft</SelectItem>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="netflix">Netflix</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={setDifficultyFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Levels</SelectItem>
                                    <SelectItem value="Easy">Easy</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground px-4">
                                        <div className="col-span-12 md:col-span-6">Title</div>
                                        <div className="hidden md:block md:col-span-2">Difficulty</div>
                                        <div className="hidden md:block md:col-span-2">Acceptance</div>
                                        <div className="hidden md:block md:col-span-2 text-right">Action</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {problems.map((problem) => (
                                        <div key={problem.id} className="grid grid-cols-12 items-center p-4 border-b hover:bg-muted/50 transition-colors">
                                            <div className="col-span-12 md:col-span-6 font-medium flex flex-col md:flex-row md:items-center gap-2">
                                                <span className="truncate">{problem.title}</span>
                                                <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                                                    {/* Mobile Difficulty Badge */}
                                                    <Badge variant="secondary" className={cn("md:hidden w-fit", getDifficultyColor(problem.difficulty))}>
                                                        {problem.difficulty}
                                                    </Badge>
                                                    {problem.company_tags && (
                                                        <div className="flex gap-1">
                                                            {problem.company_tags.split(',').slice(0, 2).map(tag => (
                                                                <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-5 font-normal">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="hidden md:block md:col-span-2">
                                                <Badge variant="secondary" className={getDifficultyColor(problem.difficulty)}>
                                                    {problem.difficulty}
                                                </Badge>
                                            </div>
                                            <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">
                                                {problem.acceptance_rate.toFixed(1)}%
                                            </div>
                                            <div className="col-span-12 md:col-span-2 md:text-right mt-2 md:mt-0">
                                                <Button variant="ghost" size="sm" asChild className="w-full md:w-auto bg-secondary/50 md:bg-transparent">
                                                    <Link href={`/arena?problemId=${problem.id}`}>
                                                        Solve <ExternalLink className="ml-2 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
