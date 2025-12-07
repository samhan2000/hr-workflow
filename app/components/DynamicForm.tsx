'use client'

import styles from '../styles/DynamicForm.module.css'

export interface FieldConfig {
    name: string
    label: string
    type: 'text' | 'number' | 'select' | 'kv' | 'radio'
    placeholder?: string
    min?: number
    options?: Array<{ label: string; value: string }>
}

export interface FormConfig {
    fields: FieldConfig[]
}

interface FormProps {
    masterData: any
    formConfig: FormConfig
    formData: Record<string, any>
    onChange: (updated: Record<string, any>) => void
}

const DynamicForm = ({ masterData, formConfig, formData, onChange }: FormProps) => {
    const updateField = (name: string, value: any) => {
        onChange({ ...formData, [name]: value })
    }

    console.log(masterData, "master data")

    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] ?? ''

        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <input
                        className={styles.input}
                        type={field.type}
                        value={value}
                        min={field.min}
                        placeholder={field.placeholder}
                        onChange={(e) => updateField(field.name, e.target.value)}
                    />
                )

            case 'select':
                return (
                    <select
                        className={styles.input}
                        value={value}
                        onChange={(e) => updateField(field.name, e.target.value)}
                    >
                        <option value="">Select...</option>
                        {field?.options && typeof field?.options === "string" && masterData[field.options].map((opt: any) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )

            case 'radio':
                return (
                    <div className={styles.radioGroup}>
                        {field?.options && typeof field?.options === "string" && masterData[field.options].map((opt: any) => {
                            const id = `${field.name}-${opt.value}`
                            return (
                                <label htmlFor={id} key={opt.value} className={styles.radioOption}>
                                    <input
                                        id={id}
                                        type="radio"
                                        name={field.name}
                                        checked={value === opt.value}
                                        value={opt.value}
                                        onChange={() => updateField(field.name, opt.value)}
                                    />
                                    {opt.label}
                                </label>
                            )
                        })}
                    </div>
                )

            case 'kv':
                const kvList: { key: string; value: string }[] = value || []
                return (
                    <div className={styles.kvWrapper}>
                        {kvList.map((item, idx) => (
                            <div key={idx} className={styles.kvRow}>
                                <input
                                    className={styles.input}
                                    placeholder="Key"
                                    value={item.key}
                                    onChange={(e) => {
                                        const updated = [...kvList]
                                        updated[idx].key = e.target.value
                                        updateField(field.name, updated)
                                    }}
                                />
                                <input
                                    className={styles.input}
                                    placeholder="Value"
                                    value={item.value}
                                    onChange={(e) => {
                                        const updated = [...kvList]
                                        updated[idx].value = e.target.value
                                        updateField(field.name, updated)
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateField(field.name, kvList.filter((_, i) => i !== idx))
                                    }
                                    className={styles.removeBtn}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => updateField(field.name, [...kvList, { key: '', value: '' }])}
                            className={styles.addBtn}
                        >
                            + Add Row
                        </button>
                    </div>
                )
        }
    }

    return (
        <form className={styles.form}>
            {formConfig.fields.map((field) => (
                <div key={field.name} className={styles.fieldWrapper}>
                    <label className={styles.label}>{field.label}</label>
                    {renderField(field)}
                </div>
            ))}
        </form>
    )
}

export default DynamicForm
