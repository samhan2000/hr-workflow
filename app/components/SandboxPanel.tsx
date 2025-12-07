'use client'
import React, { useState } from 'react'
import { useWorkflowContext } from '../context/WorkflowContext'

export default function SandboxPanel() {
  const [log, setLog] = useState('')
  const { nodes, edges } = useWorkflowContext()

  async function runSimulation() {

    const payload = {
      nodes,
      edges
    }
    const res = await fetch('/api/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const json = await res.json()
    setLog(JSON.stringify(json, null, 2))
  }

  return (
    <aside className="sandbox-panel">
      <h3>Sandbox</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={runSimulation}>Run simulate</button>
        <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>{log}</pre>
      </div>
    </aside>
  )
}
