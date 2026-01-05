"use client"

import React, { useCallback, useRef, useState, useMemo } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './custom-node';
import { ComponentsSidebar } from './sidebar';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { useTheme } from 'next-themes';

const initialNodes: Node[] = [
    { id: '1', type: 'custom', position: { x: 250, y: 5 }, data: { label: 'Client App', type: 'client' } },
    { id: '2', type: 'custom', position: { x: 250, y: 150 }, data: { label: 'API Gateway', type: 'server' } },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
];

const CanvasContent = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const { theme } = useTheme();

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow/type');
            const label = event.dataTransfer.getData('application/reactflow/label');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            // Project coordinates
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Map label back to internal icon type for simple demo
            let iconType = 'server';
            if (label.includes('Client')) iconType = 'client';
            if (label.includes('PostgreSQL') || label.includes('DB')) iconType = 'database';
            if (label.includes('Storage')) iconType = 'storage';
            if (label.includes('Internet')) iconType = 'internet';

            const newNode: Node = {
                id: `${+new Date()}`,
                type: 'custom',
                position,
                data: { label: label, type: iconType },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    return (
        <div className="flex h-full w-full">
            <ComponentsSidebar />
            <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur">
                        <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur">
                        <Download className="h-4 w-4 mr-2" /> Export
                    </Button>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-muted/5"
                >
                    <Controls />
                    <MiniMap className="bg-card border" />
                    <Background gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
};

export default function SystemDesignCanvas() {
    return (
        <ReactFlowProvider>
            <CanvasContent />
        </ReactFlowProvider>
    );
}
