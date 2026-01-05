"use client"

import { Handle, Position } from 'reactflow'
import { Database, Server, Smartphone, Globe, HardDrive } from 'lucide-react'
import { memo } from 'react'

const icons = {
    database: Database,
    server: Server,
    client: Smartphone,
    internet: Globe,
    storage: HardDrive
}

function CustomNode({ data, type }: any) {
    const Icon = icons[data.type as keyof typeof icons] || Server

    return (
        <div className="px-4 py-3 shadow-md rounded-md bg-card border-2 border-muted hover:border-primary transition-colors min-w-[150px]">
            <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-muted-foreground" />
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold">{data.label}</div>
                    <div className="text-xs text-muted-foreground">{data.subLabel || "Component"}</div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-muted-foreground" />
        </div>
    )
}

export default memo(CustomNode)
