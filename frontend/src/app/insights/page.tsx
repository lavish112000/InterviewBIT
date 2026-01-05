"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts'

const xpData = [
    { name: 'Mon', xp: 400 },
    { name: 'Tue', xp: 300 },
    { name: 'Wed', xp: 600 },
    { name: 'Thu', xp: 800 },
    { name: 'Fri', xp: 500 },
    { name: 'Sat', xp: 900 },
    { name: 'Sun', xp: 750 },
];

const skillData = [
    { name: 'Algorithms', score: 80, full: 100 },
    { name: 'System Design', score: 65, full: 100 },
    { name: 'Database', score: 90, full: 100 },
    { name: 'Communication', score: 70, full: 100 },
]

export default function InsightsPage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-8 space-y-8 overflow-y-auto">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Track your growth across coding, design, and soft skills.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>XP Growth (Last 7 Days)</CardTitle>
                                <CardDescription>Daily activity and problem solving consistency.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={xpData}>
                                        <defs>
                                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                        <Area type="monotone" dataKey="xp" stroke="#8884d8" fillOpacity={1} fill="url(#colorXp)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Skill Proficiency</CardTitle>
                                <CardDescription>Current assessment of your technical readiness.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={skillData} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.1} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                        />
                                        <Bar dataKey="score" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
