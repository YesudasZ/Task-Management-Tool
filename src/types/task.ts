export type TaskStatus = "todo" | "in-progress" | "completed"
export type TaskCategory = "work" | "personal"

export interface Task {
  id: string
  title: string
  description: string
  category: TaskCategory
  status: TaskStatus
  dueDate: string
  attachmentUrl?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateTaskData {
  title: string
  description: string
  category: TaskCategory
  status: TaskStatus
  dueDate: string
  attachment?: File
}

export interface TaskSection {
  status: Task["status"]
  title: string
  tasks: Task[]
  color: string
}