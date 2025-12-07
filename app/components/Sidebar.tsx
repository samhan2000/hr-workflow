'use client'
import React from 'react'

const nodes = [
  { type: 'start', label: 'Start Node' },
  { type: 'task', label: 'Task Node' },
  { type: 'approval', label: 'Approval Node' },
  { type: 'auto', label: 'Automated Step' },
  { type: 'end', label: 'End Node' }
]

export default function Sidebar() {
  function onDragStart(ev: any, nodeType: any) {
    ev.dataTransfer.setData('application/reactflow', nodeType)
    ev.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="sidebar">
      <h3 className='mt-15'>Nodes</h3>
      <div>
        {nodes.map(n => (
          <div key={n.type} draggable onDragStart={(e) => onDragStart(e, n.type)} style={{ padding: 8, margin: 6, background: '#fafafa', border: '1px solid #ddd', cursor: 'grab' }}>
            {n.label}
          </div>
        ))}
      </div>
      <p style={{ color: '#666', fontSize: 12, marginTop: 12 }}>Drag a node onto the canvas</p>
    </aside>
  )
}
