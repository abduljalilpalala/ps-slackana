import { axios } from '~/shared/lib/axios'

const getTasks = async (project_id: number, section_id: number): Promise<any> => {
  const response = await axios.get(`/api/project/${project_id}/section/${section_id}/task`)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const createTask = async (project_id: number, section_id: number, data: any): Promise<any> => {
  const response = await axios.post(`/api/project/${project_id}/section/${section_id}/task`, data)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const removeTask = async (
  project_id: number,
  section_id: number,
  task_id: number
): Promise<any> => {
  const response = await axios.delete(
    `/api/project/${project_id}/section/${section_id}/task/${task_id}`
  )

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const reorderTasks = async (project_id: number, section_id: number): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/section/${section_id}/reorder-tasks`)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const updateDueDate = async (project_id: number, task_id: number, due_date: any): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/due-date`, {
    due_date
  })

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const updateAssignee = async (
  project_id: number,
  task_id: number,
  project_member_id: number
): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/assign`, {
    project_member_id
  })

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
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

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const completeTask = async (project_id: number, task_id: number): Promise<any> => {
  const response = await axios.put(`/api/project/${project_id}/task/${task_id}/complete`)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}

const taskService = {
  getTasks,
  createTask,
  removeTask,
  reorderTasks,
  updateDueDate,
  updateAssignee,
  renameTask,
  completeTask
}

export default taskService
