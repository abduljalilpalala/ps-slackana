import { axios } from '~/shared/lib/axios'

const updateProfileDetails = async (profileDetails: any): Promise<any> => {
  const response = await axios.put('/api/user/change-details', profileDetails)
  return response.data
}
const updatePassword = async (passwordDetails: any): Promise<any> => {
  const response = await axios.put('/api/user/change-password', passwordDetails)
  return response.data
}

const updateNotification = async (notificationDetails: any): Promise<any> => {
  const { id, status } = notificationDetails

  const response = await axios.put(`/api/user/setting/${id}`, { status })
  return response.data
}
const uploadPhoto = async (photoData: any): Promise<any> => {
  const formData = new FormData()
  formData.append('avatar', photoData)
  formData.append('_method', 'POST')

  const response = await axios.post('/api/user/setting', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

const removePhoto = async (id: number): Promise<any> => {
  const response = await axios.delete(`/api/user/setting/${id}`)

  return response.data
}

const authService = {
  uploadPhoto,
  removePhoto,
  updatePassword,
  updateNotification,
  updateProfileDetails
}

export default authService
