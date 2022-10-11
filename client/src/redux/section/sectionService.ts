import { axios } from '~/shared/lib/axios'
import { SectionFormFields } from '~/shared/types'

const getSections = async (project_id: number): Promise<any> => {
  const response = await axios.get(`/api/project/${project_id}/section`)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const createSection = async (project_id: number, name: string): Promise<any> => {
  const response = await axios.post(`/api/project/${project_id}/section`, { name })

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const renameSection = async (section: SectionFormFields): Promise<any> => {
  const { project_id, id, name } = section
  const response = await axios.put(`/api/project/${project_id}/section/${id}`, { name })

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}
const removeSection = async (section: SectionFormFields): Promise<any> => {
  const { project_id, id } = section

  const response = await axios.delete(`/api/project/${project_id}/section/${id}`)

  if (response.status === 200) {
    return response.data
  }
  return 'Something went wrong'
}

const sectionService = {
  getSections,
  createSection,
  renameSection,
  removeSection
}

export default sectionService
