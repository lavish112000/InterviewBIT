"use client" // Needed for useState/useEffect

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, BookOpen, Trophy, Zap, Code, ArrowUpRight, Network } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_questions: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    solved: 0
  })

  useEffect(() => {
    fetch('http://localhost:8000/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log("Stats fetch error (using local fallback)"))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans bg-[url('/grid.svg')] bg-fixed bg-cover">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <motion.main
          className="flex-1 p-8 space-y-8 overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Welcome back, Lavish!
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Ready to conquer the <span className="text-primary font-semibold">Cosmic Code Arena</span>?
              </p>
            </div>
          </motion.div>

          {/* KPI Grid */}
          <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/practice">
              <KpiCard title="Total Problems" value={stats.total_questions.toLocaleString()} icon={Zap} trend="Database Connected" trendColor="text-indigo-400" />
            </Link>
            <KpiCard title="Easy Available" value={stats.easy.toLocaleString()} icon={Trophy} trend="30% of total" trendColor="text-green-400" />
            <KpiCard title="Medium Available" value={stats.medium.toLocaleString()} icon={Activity} trend="Most common" trendColor="text-amber-400" />
            <KpiCard title="Hard Available" value={stats.hard.toLocaleString()} icon={BookOpen} trend="Challenge yourself" trendColor="text-rose-400" />
          </motion.div>

          {/* Main Grid */}
          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Activity */}
            <Card className="col-span-4 glass-card border-white/5">
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[250px] flex items-center justify-center text-muted-foreground rounded-lg border-2 border-dashed border-white/10 bg-black/20 m-4">
                  <div className="text-center">
                    <Activity className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <span className="text-sm">Activity Chart Coming Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Tasks */}
            <Card className="col-span-3 glass-card border-white/5">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <Network className="h-4 w-4 text-purple-400" />
                        System Design: HLD
                      </span>
                      <span className="text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <Code className="h-4 w-4 text-indigo-400" />
                        Blind 75: Arrays
                      </span>
                      <span className="text-muted-foreground">12%</span>
                    </div>
                    <Progress value={12} className="h-2 bg-white/10" indicatorClassName="bg-indigo-500" />
                  </div>

                  <div className="pt-4">
                    <Link href="/practice">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-primary group-hover:text-white transition-colors">Daily Challenge</h4>
                          <ArrowUpRight className="h-4 w-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <p className="text-sm text-muted-foreground">Solve a Random Problem</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon: Icon, trend, trendColor }: any) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="h-full"
    >
      <Card className="shadow-lg hover:shadow-indigo-500/20 transition-all border-white/5 bg-card/40 backdrop-blur-md h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{value}</div>
          <p className={cn("text-xs font-medium mt-1", trendColor)}>
            {trend}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
