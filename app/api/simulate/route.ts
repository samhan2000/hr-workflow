import { NextResponse } from 'next/server'

function describe(node: any) {
    const cfg = node.data.config || {}
    switch (node.data.nodeType) {
        case "start": return `Start: ${cfg.title || 'Step'}`
        case "task": return `${cfg.title || 'Task'} (Assignee: ${cfg.assignee || 'NA'})`
        case "approval": return `Approval by ${cfg.role || 'Approver'}`
        case "auto": return `Run Automation: ${cfg.action || 'Action'}`
        case "end": return `End: ${cfg.message || 'Completed'}`
        default: return node.type
    }
}

export async function POST(req: Request) {
    const workflow = await req.json()
    console.log(workflow.edges, "NODES")
    const nodes = workflow.nodes || []
    const edges = workflow.edges || []


    const startNode = nodes.find((n: any) => n.data.nodeType === 'start')
    if (!startNode) return NextResponse.json({ error: 'Missing start node' }, { status: 400 })

    const steps: any[] = []
    const visited = new Set()
    const queue = [startNode.id]

    while (queue.length) {
        const nodeId = queue.shift()
        if (visited.has(nodeId)) continue
        visited.add(nodeId)

        const node = nodes.find((n: any) => n.id === nodeId)
        if (!node) continue

        steps.push({
            id: node.id,
            type: node.data.nodeType,
            config: node.config,
            message: describe(node),
            status: "ok"
        })

        const outgoing = edges.filter((e: any) => e.source === node.id)
        outgoing.forEach((e: any) => queue.push(e.target))
    }

    return NextResponse.json({ steps })
}
