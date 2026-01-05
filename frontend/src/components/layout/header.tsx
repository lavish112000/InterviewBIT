"use client"

import { Menu, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarContent } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
    return (
        <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="flex h-16 items-center gap-4 px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 bg-background/95 backdrop-blur-xl border-white/10">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>

                <div className="w-full flex-1 md:w-auto md:flex-none">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search problems..."
                            className="h-9 w-full md:w-[300px] pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50 transition-all duration-300"
                        />
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-white/5">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                    </Button>
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all hover:ring-primary/50 cursor-pointer">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium">L</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}
