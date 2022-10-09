
import { axios } from '~/shared/lib/axios'

const updateProfileDetails = async (profileDetails: any): Promise<any> => {
  const response = await axios.put('/api/user/change-details', profileDetails)

  if (response.status === 200) {
    return response.data;
  }

  return "Something went wrong";
};
const updatePassword = async (passwordDetails: any): Promise<any> => {
  const response = await axios.put('/api/user/change-password', passwordDetails)

  if (response.status === 200) {
    return response.data;
  }

  return "Something went wrong";
};
const updateNotification = async (notificationDetails: any): Promise<any> => {
  const { id, status } = notificationDetails

  const response = await axios.put(`/api/user/setting/${id}`, { status })

  if (response.status === 200) {
    return response.data;
  }

  return "Something went wrong";
};
const uploadPhoto = async (photoData: any): Promise<any> => {
  const formData = new FormData();
  formData.append('avatar', photoData);
  formData.append("_method", "POST");

  const response = await axios.post('/api/user/setting', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (response.status === 200) {
    return response.data;
  }

  return "Something went wrong";
};
const removePhoto = async (photoData: any): Promise<any> => {
  const response = await axios.post('/api/user/setting', photoData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (response.status === 200) {
    return response.data;
  }

  return "Something went wrong";
};

const authService = {
  uploadPhoto,
  removePhoto,
  updatePassword,
  updateNotification,
  updateProfileDetails,
}

export default authService
