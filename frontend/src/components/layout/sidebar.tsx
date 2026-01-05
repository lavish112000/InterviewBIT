"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Code2,
    Network,
    Mic2,
    FlaskConical,
    Sparkles,
    Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Code2, label: "Code Arena", href: "/arena" },
    { icon: Network, label: "System Design", href: "/system-design" },
    { icon: Mic2, label: "Mock Interview", href: "/interview" },
    { icon: FlaskConical, label: "Tech Labs", href: "/labs" },
    { icon: Sparkles, label: "AI Insights", href: "/insights" },
]

export function SidebarContent() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b flex items-center justify-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    EqualPrep
                </h1>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3 mb-1",
                                pathname === item.href && "text-primary font-semibold"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                    <Settings className="h-5 w-5" />
                    Settings
                </Button>
            </div>
        </div>
    )
}

export function Sidebar({ className }: { className?: string }) {
    return (
        <div className={cn("h-screen w-64 border-r bg-card flex flex-col sticky top-0 hidden md:flex", className)}>
            <SidebarContent />
        </div>
    )
}
