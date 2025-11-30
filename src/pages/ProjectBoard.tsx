import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/auth'
import Layout from '../components/Layout'
import TaskModal from '../components/TaskModal'
import { Plus, ChevronLeft, AlertCircle, Bug, CheckCircle2, Circle } from 'lucide-react'
import { cn } from '../lib/utils'

interface Task {
  id: string
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  type: 'task' | 'bug' | 'story' | 'epic'
  assignee_id: string | null
  created_at: string
  position: number
  profiles?: {
    full_name: string | null
    email: string
  }
}

interface Project {
  id: string
  name: string
  key: string
  description: string | null
}

const STATUSES = [
  { id: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-100' },
  { id: 'done', label: 'Done', color: 'bg-green-100' },
  { id: 'blocked', label: 'Blocked', color: 'bg-red-100' }
] as const

const PRIORITY_COLORS = {
  low: 'text-gray-500',
  medium: 'text-yellow-500',
  high: 'text-orange-500',
  urgent: 'text-red-500'
}

const TYPE_ICONS = {
  task: Circle,
  bug: Bug,
  story: CheckCircle2,
  epic: AlertCircle
}

export default function ProjectBoard() {
  const { projectId } = useParams<{ projectId: string }>()
  const { user } = useAuthStore()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [creatingTaskForStatus, setCreatingTaskForStatus] = useState<string | null>(null)

  useEffect(() => {
    if (projectId) {
      loadProjectData()
    }
  }, [projectId])

  const loadProjectData = async () => {
    if (!projectId) return

    try {
      const [projectRes, tasksRes] = await Promise.all([
        supabase.from('projects').select('*').eq('id', projectId).single(),
        supabase
          .from('tasks')
          .select(`
            *,
            profiles:assignee_id (
              full_name,
              email
            )
          `)
          .eq('project_id', projectId)
          .order('position', { ascending: true })
      ])

      if (projectRes.error) throw projectRes.error
      if (tasksRes.error) throw tasksRes.error

      setProject(projectRes.data)
      setTasks(tasksRes.data || [])
    } catch (error) {
      console.error('Error loading project data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (status: string) => {
    if (!user || !projectId) return

    setCreatingTaskForStatus(status)
    setSelectedTask({
      id: '',
      title: '',
      description: null,
      status: status as any,
      priority: 'medium',
      type: 'task',
      assignee_id: null,
      created_at: new Date().toISOString(),
      position: 0
    })
    setShowTaskModal(true)
  }

  const handleTaskSaved = async () => {
    setShowTaskModal(false)
    setSelectedTask(null)
    setCreatingTaskForStatus(null)
    await loadProjectData()
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  const getTypeIcon = (type: string) => {
    const Icon = TYPE_ICONS[type as keyof typeof TYPE_ICONS] || Circle
    return <Icon className="w-4 h-4" />
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700">
            Back to projects
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                {project.key}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATUSES.map((statusCol) => (
            <div key={statusCol.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {statusCol.label}
                  <span className="text-xs text-gray-500 font-normal">
                    ({getTasksByStatus(statusCol.id).length})
                  </span>
                </h3>
                <button
                  onClick={() => handleCreateTask(statusCol.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Add task"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="space-y-2">
                {getTasksByStatus(statusCol.id).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="w-full bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={cn('mt-0.5', PRIORITY_COLORS[task.priority])}>
                        {getTypeIcon(task.type)}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 flex-1 line-clamp-2">
                        {task.title}
                      </h4>
                    </div>

                    {task.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <span className={cn('px-2 py-0.5 rounded font-medium', PRIORITY_COLORS[task.priority])}>
                        {task.priority}
                      </span>
                      {task.profiles && (
                        <span className="text-gray-500">
                          {task.profiles.full_name || task.profiles.email}
                        </span>
                      )}
                    </div>
                  </button>
                ))}

                {getTasksByStatus(statusCol.id).length === 0 && (
                  <div className="text-center py-8 text-sm text-gray-400">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTaskModal && selectedTask && projectId && (
        <TaskModal
          task={selectedTask}
          projectId={projectId}
          onClose={() => {
            setShowTaskModal(false)
            setSelectedTask(null)
            setCreatingTaskForStatus(null)
          }}
          onSave={handleTaskSaved}
        />
      )}
    </Layout>
  )
}
