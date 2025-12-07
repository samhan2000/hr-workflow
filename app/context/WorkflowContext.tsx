"use client"

import { createContext, ReactNode, useContext, useState } from "react"

const WorflowContext = createContext<any>(null)
export const useWorkflowContext = () => useContext(WorflowContext)

const WorkflowProvider = ({ children }: any) => {
    /*
                Checks
        To Be maintained in context
        ----------------------------
        Type of Nodes available
         - Type of Nodes
         - Form Config of that nodes
         - Rules of nodes

        List Of Nodes in applications
            - Type of Node
            - Dynamic form data
        
        Edges of Nodes

        Current Selected Node 
            - Show/Hide form
            - Patch form data if available
    */

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [selectedNodeId, setSelectedNodeId] = useState(null)

    const updateNodeConfig = (id: number, config: Record<string, any>) => {
        setNodes((prev: any) =>
            prev.map((n: any) =>
                n.id === id ? { ...n, data: { ...n.data, config: { ...n.data.config, ...config } } } : n
            )
        )
    }

    const serializeWorkflow = () => ({
        nodes: nodes.map((n: any) => ({
            id: n.id,
            type: n.data.nodeType,
            config: n.data.config
        })),
        edges: edges.map((e: any) => ({ source: e.source, target: e.target }))
    })

    return (
        <WorflowContext.Provider value={{
            nodes, setNodes,
            edges, setEdges,
            selectedNodeId, setSelectedNodeId,
            updateNodeConfig,
            serializeWorkflow
        }}>
            {children}
        </WorflowContext.Provider>

    )
}

export default WorkflowProvider