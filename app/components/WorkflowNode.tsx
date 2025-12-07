import { Handle, Position } from 'reactflow'
import DynamicNodeContent from './DynamicNodeContent'

export default function WorkflowNode({ data, id }: any) {
    return (
        <div className='px-2.5 py-2 bg-white border border-gray-300 rounded-lg min-w-[130px]'>
            <DynamicNodeContent node={{ id, data }} />

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    )
}
