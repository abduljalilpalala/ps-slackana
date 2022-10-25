import { axios } from '~/shared/lib/axios'

const getTasks = async (project_id: number, section_id: number): Promise<any> => {
  const response = await axios.get(`/api/project/${project_id}/section/${section_id}/task`)
  return response.data
}
const createTask = async (project_id: number, section_id: number, data: any): Promise<any> => {
  const response = await axios.post(`/api/project/${project_id}/section/${section_id}/task`, data)
  return response.data
}
const removeTask = async (
  project_id: number,
  section_id: number,
  task_id: number
): Promise<any> => {
  const response = await axios.delete(
    `/api/project/${project_id}/section/${section_id}/task/${task_id}`
  )
  return response.data
}
const reorderTasks = async (project_id: number, section_id: number): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/section/${section_id}/reorder-tasks`)
  return response.data
}
const updateDueDate = async (project_id: number, task_id: number, due_date: any): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/due-date`, {
    due_date
  })
  return response.data
}
const updateAssignee = async (
  project_id: number,
  task_id: number,
  project_member_id: number
): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/assign`, {
    project_member_id
  })
  return response.data
}
const renameTask = async (
  project_id: number,
  section_id: number,
  task_id: number,
  name: number
): Promise<any> => {
  const response = await axios.put(
    `/api/project/${project_id}/section/${section_id}/task/${task_id}`,
    {
      name
    }
  )
  return response.data
}
const completeTask = async (project_id: number, task_id: number): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/complete`)
  return response.data
}
const getTask = async (project_id: number, task_id: number): Promise<any> => {
  const response = await axios.get(`/api/project/${project_id}/task/${task_id}/details`)
  return response.data
}
const updateTaskDetails = async (project_id: number, task_id: number, data: any): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/details`, data)
  return response.data
}

const updateTaskPosition = async (project_id: number, tasks: any): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/position`, { tasks })
  return response.data
}

const updateTaskSection = async (
  project_id: number,
  section_id: number,
  task_id: number
): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/move-section`, {
    section_id
  })
  return response.data
}
const taskService = {
  getTasks,
  createTask,
  removeTask,
  reorderTasks,
  updateDueDate,
  updateAssignee,
  renameTask,
  completeTask,
  getTask,
  updateTaskDetails,
  updateTaskPosition,
  updateTaskSection
}

export default taskService
