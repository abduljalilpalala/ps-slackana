import { axios } from '~/shared/lib/axios'
import { ProjectFileType } from '~/redux/files/fileType'

const getProjectFiles = async (projectId: number): Promise<Array<ProjectFileType> | string> => {
  const response = await axios.get(`/api/project/${projectId}/file`)
  return response.data
}

const getProjectFile = async (projectId: number, fileId: string): Promise<Blob | string> => {
  const response = await axios.get(`/api/project/${projectId}/file/${fileId}`, {
    responseType: 'blob'
  })
  return response.data
}

const addProjectFile = async (projectId: number, file: any): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(`/api/project/${projectId}/file`, formData)
    return response.data.message
  } catch (error: unknown) {
    return 'Unprocessable Content'
  }
}

const renameProjectFile = async (
  projectId: number,
  fileId: string,
  name: string
): Promise<string> => {
  const response = await axios.put(`/api/project/${projectId}/file/${fileId}`, { name })
  return response.data.message
}

const deleteProjectFile = async (projectId: number, fileId: string): Promise<string> => {
  const response = await axios.delete(`/api/project/${projectId}/file/${fileId}`)
  return response.data.message
}

const fileService = {
  getProjectFiles,
  getProjectFile,
  addProjectFile,
  renameProjectFile,
  deleteProjectFile
}

export default fileService
