"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Database, Server, Cloud, Layers } from "lucide-react"
import Link from "next/link"

const labs = [
    {
        id: "fastapi",
        title: "FastAPI Fundamentals",
        description: "Build a secure, async REST API with Pydantic validation and auto-docs.",
        icon: Server,
        color: "text-emerald-500",
        progress: 0,
        level: "Intermediate",
        duration: "45 mins"
    },
    {
        id: "postgresql",
        title: "PostgreSQL Mastery",
        description: "Advanced schema design, complex joins, and performance indexing.",
        icon: Database,
        color: "text-blue-500",
        progress: 30,
        level: "Advanced",
        duration: "60 mins"
    },
    {
        id: "redis",
        title: "Redis & Caching",
        description: "Implement caching strategies and async job queues with Celery.",
        icon: Layers,
        color: "text-red-500",
        progress: 0,
        level: "Intermediate",
        duration: "30 mins"
    },
    {
        id: "aws",
        title: "AWS Deployment",
        description: "Deploy your microservices to EC2/ECS with CI/CD pipelines.",
        icon: Cloud,
        color: "text-amber-500",
        progress: 0,
        level: "Advanced",
        duration: "90 mins"
    }
]

export default function LabsPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-8 space-y-8 overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Tech Stack Labs</h1>
                            <p className="text-muted-foreground mt-2 text-lg">
                                Hands-on practice environments for the core Equal Collective stack.
                            </p>
                        </div>
                        <Button variant="outline">
                            View Learning Roadmap
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {labs.map((lab) => (
                            <Card key={lab.id} className="flex flex-col border hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg bg-muted ${lab.color}`}>
                                            <lab.icon className="h-6 w-6" />
                                        </div>
                                        <Badge variant="secondary">{lab.level}</Badge>
                                    </div>
                                    <CardTitle className="text-xl">{lab.title}</CardTitle>
                                    <CardDescription className="mt-2 text-sm leading-relaxed">
                                        {lab.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 mt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span>{lab.progress}%</span>
                                        </div>
                                        <Progress value={lab.progress} className="h-2" />
                                    </div>
                                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>⏱ {lab.duration}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/labs/${lab.id}`} className="w-full">
                                        <Button className="w-full group">
                                            Start Lab <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
