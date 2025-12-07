'use client'
import React, { useCallback, useState, useRef } from 'react'
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import { useWorkflowContext } from '../context/WorkflowContext'
import WorkflowNode from './WorkflowNode'

const nodeTypes = {
  default: WorkflowNode
}

let id = 1
const getId = (type: any) => `${type}_${id++}`

export default function FlowCanvas() {

  const reactFlowWrapper = useRef<any>(null)

  const workflowContext = useWorkflowContext()

  console.log(workflowContext.nodes, "NODES")

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow')
    if (!type) return

    if (type === 'start') {
      const hasStart = workflowContext.nodes.some((n: any) => n.data.nodeType === 'start')
      if (hasStart) {
        alert("Only one Start node is allowed.")
        return
      }
    }

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = { x: event.clientX - reactFlowBounds.left - 75, y: event.clientY - reactFlowBounds.top - 20 }

    const newNode = {
      id: getId(type),
      type: 'default',
      position,
      data: { nodeType: type, config: {} }
    }

    workflowContext.setNodes((nds: any) => nds.concat(newNode))
  }, [workflowContext.nodes])

  const onConnect = useCallback((params: any) => workflowContext.setEdges((es: any) => {
    console.log([...es, params], "Check on Connect")
    return [...es, params]
  }), [])

  const onNodesChange = useCallback((changes: any) => workflowContext.setNodes((nds: any) => nds.map((n: any) => {
    const c = changes.find((x: any) => x.id === n.id)
    if (!c) return n
    return { ...n, ...c }
  })), [])

  const onEdgesChange = useCallback((changes: any) => workflowContext.setEdges((es: any) => es.map((e: any) => {
    console.log(e, "On edges change")
    const c = changes.find((x: any) => x.id === e.id)
    if (!c) return e
    return { ...e, ...c }
  })), [])

  const handleDeleteSelected = () => {
    workflowContext.setNodes([])
    workflowContext.setEdges([])
    id = 0
  }

  const onNodeClick = useCallback((event: any, node: any) => {
    workflowContext.setSelectedNodeId(node.id)
  }, []);


  console.log(workflowContext.edges, "Edges")
  return (
    <div ref={reactFlowWrapper} style={{ height: '100%', width: '100%', border: '1px solid #e5e7eb', borderRadius: 6 }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flex: 1 }} onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodeTypes={nodeTypes} nodes={workflowContext.nodes}
            edges={workflowContext.edges} onConnect={onConnect}
            onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onNodesDelete={(deleted) =>
              workflowContext.setNodes((nodes: any) =>
                nodes.filter((n: any) => !deleted.some(d => d.id === n.id))
              )
            }
            onEdgesDelete={(deleted) =>
              workflowContext.setEdges((edges: any) =>
                edges.filter((e: any) => !deleted.some(d => d.id === e.id))
              )
            }
            fitView>
            <MiniMap />
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 16, top: 12 }}>
        <button className='px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-200 transition' onClick={handleDeleteSelected}>Clear All</button>
      </div>
    </div>
  )
}
