
export const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  const now = new Date()
  const taskDate = new Date(date)
  const diffDays = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(date)
}

export const statusConfig = {
  pending: {
    label: 'Pending',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    ringColor: 'ring-amber-500',
    dotColor: 'bg-amber-500',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-amber-500'
  },
  in_progress: {
    label: 'In Progress',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    ringColor: 'ring-blue-500',
    dotColor: 'bg-blue-500',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-500'
  },
  completed: {
    label: 'Completed',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    ringColor: 'ring-emerald-500',
    dotColor: 'bg-emerald-500',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-emerald-500'
  }
}

export const getStatusConfig = (status) => {
  return statusConfig[status?.toLowerCase()] || statusConfig.pending
}

export const getOutputSummary = (outputs) => {
  if (!outputs || outputs.length === 0) return 'No updates yet'
  const latest = outputs[outputs.length - 1]
  return latest.output.length > 50 ? latest.output.substring(0, 50) + '...' : latest.output
}

export const sortTasks = (assignments, sortBy, sortOrder) => {
  const sorted = [...assignments]

  sorted.sort((a, b) => {
    let aVal, bVal

    switch(sortBy) {
      case 'created_at':
        aVal = new Date(a.created_at)
        bVal = new Date(b.created_at)
        break
      case 'software':
        aVal = a.software?.name || ''
        bVal = b.software?.name || ''
        break
      case 'assignee':
        aVal = a.assigned_person?.name || ''
        bVal = b.assigned_person?.name || ''
        break
      default:
        aVal = a[sortBy] || ''
        bVal = b[sortBy] || ''
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return sorted
}
