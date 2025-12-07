'use client'

import { nodeFormConfig } from '../helpers/configs/formConfigs'

export default function DynamicNodeContent({ node }: any) {
    const config = node.data.config || {}
    const form = nodeFormConfig[node.data.nodeType]

    const primaryField = form.fields[0]?.name
    const title = config[primaryField] || node.data.nodeType.toUpperCase()

    return (
        <div style={{ textAlign: 'center', fontSize: 13 }}>
            <strong>{title}</strong>

            <div style={{ marginTop: 6, fontSize: 11, display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* Auto render rest of fields */}
                {form.fields.slice(1).map((f: any) => {
                    const val = config[f.name]
                    if (!val) return null

                    switch (f.type) {
                        case 'text':
                        case 'number':
                            return <span key={f.name}>{f.label}: {val}</span>

                        case 'select':
                            return <span key={f.name} className='bg-sky-100 px-1.5 py-0.5 rounded-md text-xs'>{val}</span>

                        case 'radio':
                            return <span key={f.name}>{f.label}: {val ? 'Yes' : 'No'}</span>

                        case 'kv':
                            const count = val.length || 0
                            return count > 0 ? (
                                <span key={f.name} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">+{count} fields</span>
                            ) : null

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

