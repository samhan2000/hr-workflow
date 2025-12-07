'use client'
import React, { useEffect, useState } from 'react'
import DynamicForm from './DynamicForm'
import { useWorkflowContext } from '../context/WorkflowContext'
import { nodeFormConfig } from '../helpers/configs/formConfigs'

const initMaster = {
  "roles": [
    { label: "Manager", value: "manager" },
    { label: "HRBP", value: "hrbp" },
    { label: "Director", value: "director" }
  ],
  "showSummary": [
    { id: "true_summary", label: "True", value: true },
    { id: "false_summary", label: "False", value: false }
  ]
}


export default function NodePanel() {

  const { nodes, selectedNodeId, updateNodeConfig } = useWorkflowContext()
  const [masterData, setMasterData] = useState(initMaster)


  useEffect(() => {
    const fetchMasterData = async () => {
      await fetch('/api/automations')
        .then(res => res.json())
        .then(data => {
          console.log(data, "Data")
          setMasterData((prevConfig) => ({ ...prevConfig, "automation": data }))
        }).catch(err => {
          console.error(`Error occured while fetching automations, ${err}`)
        })
    }

    fetchMasterData()
  }, [])


  const selectedNode = nodes.find((n: any) => n.id === selectedNodeId)
  console.log(selectedNode, "Selected")

  if (!selectedNode) {
    return <aside className="node-panel">Select a node to edit</aside>
  }

  const config = selectedNode.data.config || {}
  const nodeType = selectedNode.data.nodeType

  return (
    <aside className="node-panel">
      <h3>Node Editor - {selectedNode?.data?.config?.title}</h3>
      <DynamicForm
        masterData={masterData}
        formConfig={nodeFormConfig[nodeType]}
        formData={config}
        onChange={(updated) => updateNodeConfig(selectedNode.id, updated)}
      />
    </aside>
  )
}
