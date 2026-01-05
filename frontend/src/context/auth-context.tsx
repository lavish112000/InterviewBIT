"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
    username: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetchUser(token)
        } else {
            setIsLoading(false)
        }
    }, [])

    const fetchUser = async (token: string) => {
        try {
            const res = await fetch("http://localhost:8000/users/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                const userData = await res.json()
                setUser(userData)
            } else {
                logout()
            }
        } catch (error) {
            console.error("Auth check failed", error)
            logout()
        } finally {
            setIsLoading(false)
        }
    }

    const login = (token: string) => {
        localStorage.setItem("token", token)
        fetchUser(token)
        router.push("/")
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
