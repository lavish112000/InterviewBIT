"use client"

import { Database, Server, Smartphone, Globe, HardDrive, Hexagon } from 'lucide-react'

const components = [
    { type: 'client', label: 'Client App', icon: Smartphone },
    { type: 'server', label: 'API Server', icon: Server },
    { type: 'database', label: 'PostgreSQL', icon: Database },
    { type: 'storage', label: 'S3 Bucket', icon: HardDrive },
    { type: 'internet', label: 'Internet', icon: Globe },
    { type: 'service', label: 'Service', icon: Hexagon },
]

export function ComponentsSidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/label', label);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="w-64 border-r bg-card p-4 flex flex-col gap-4">
            <div className="font-semibold text-sm text-muted-foreground mb-2">Components</div>
            <div className="grid grid-cols-2 gap-2">
                {components.map((c) => (
                    <div
                        key={c.label}
                        className="p-3 border rounded-lg bg-background hover:border-primary hover:text-primary cursor-grab active:cursor-grabbing flex flex-col items-center gap-2 text-center transition-colors"
                        draggable
                        onDragStart={(event) => onDragStart(event, 'custom', c.label)} // Use 'custom' type but pass metadata
                        onDragEnd={(event) => {
                            // Hack to pass specific icon data usually done via node data
                            // For now, we'll simplify by handling all as 'custom' and setting data.type on drop
                        }}
                    >
                        <c.icon className="h-6 w-6" />
                        <span className="text-xs font-medium">{c.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 bg-muted/20 rounded-lg text-xs text-muted-foreground">
                <p>Drag components to the canvas to build your architecture.</p>
            </div>
        </aside>
    )
}
