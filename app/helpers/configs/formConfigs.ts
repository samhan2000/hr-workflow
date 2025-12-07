export const nodeFormConfig: Record<string, any> = {
    start: {
        fields: [
            { name: "title", label: "Start Title", type: "text", placeholder: "Workflow kickoff" },
            { name: "metadata", label: "Metadata", type: "kv" }
        ]
    },

    task: {
        fields: [
            { name: "title", label: "Title", type: "text", placeholder: "Task title" },
            { name: "description", label: "Description", type: "text" },
            { name: "assignee", label: "Assignee", type: "text", placeholder: "Email or name" },
            { name: "dueDate", label: "Due Date", type: "text", placeholder: "YYYY-MM-DD" },
            { name: "customFields", label: "Custom Fields", type: "kv" }
        ]
    },

    approval: {
        fields: [
            { name: "title", label: "Approval Step Title", type: "text" },
            {
                name: "role",
                label: "Approver Role",
                type: "select",
                options: "roles"
            },
            {
                name: "threshold",
                label: "Auto-approve threshold (₹)",
                type: "number",
                min: 0
            }
        ]
    },

    auto: {
        fields: [
            { name: "title", label: "Automated Step Title", type: "text" },
            {
                name: "action",
                label: "Automation Action",
                type: "select",
                options: "automation"
            },
            {
                name: "actionParams",
                label: "Parameters",
                type: "kv"
            }
        ]
    },

    end: {
        fields: [
            { name: "message", label: "End Message", type: "text", placeholder: "Workflow completed" },
            {
                name: "showSummary", label: "Show Summary", type: "radio", options: "showSummary"
            }
        ]
    }
}
