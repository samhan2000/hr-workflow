import Image from "next/image";
import FlowCanvas from "./components/FlowCanvas";
import NodePanel from "./components/NodePanel";
import SandboxPanel from "./components/SandboxPanel";
import Sidebar from "./components/Sidebar";
import WorkflowProvider from "./context/WorkflowContext";

export default function Home() {


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <WorkflowProvider>
        <Sidebar />
        <div style={{ flex: 1, padding: 12 }}>
          <FlowCanvas />
        </div>
        <NodePanel />
        <SandboxPanel />
      </WorkflowProvider>
    </div>
  )
}
