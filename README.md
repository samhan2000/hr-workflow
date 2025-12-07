# Workflow Builder

A visual workflow designer built with **Next.js App Router + React Flow + Tailwind**, featuring dynamic node configuration and real workflow simulation.

Users can design, configure, and simulate business workflows — similar to enterprise workflow automation tools.

---

## Key Features

- Drag-and-drop workflow builder
- 5 custom workflow node types
- Dynamic form rendering based on JSON metadata
- Node configuration preview inside node UI
- In-browser workflow serialization & validation
- Real graph-based workflow simulation (BFS traversal)
- Basic rule engine (Start/End validation logic)
- Delete Individual nodes & edges using backspace
- Clear all option to fresh new
- Clean and scalable code architecture
- Mock API integration for automation steps

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Workflow Canvas | React Flow |
| State | React Context API |
| Styling | TailwindCSS |
| API | Next.js Route Handlers |
| Simulation Engine | BFS Graph Traversal |

---

## Getting Started

```bash
npm install
npm run dev
