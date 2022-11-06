import { Chat } from './chatType'
import { axios } from '~/shared/lib/axios'

const getMessages = async (projectId: number | string): Promise<Chat[]> => {
  const response = await axios.get(`/api/project/${projectId}/message`)
  return response.data
}

const addMessage = async (
  projectId: number,
  payload: { member_id: number; message: string }
): Promise<any> => {
  const response = await axios.post(`/api/project/${projectId}/message`, payload)

  return response.data
}

const updateMessage = async (
  projectId: number,
  memberId: number,
  message: string
): Promise<string> => {
  const response = await axios.put(`/api/project/${projectId}/message/${memberId}`, {
    member_id: memberId,
    message
  })
  return response.data
}

const deleteMessage = async (projectId: number, messageId: number): Promise<string> => {
  const response = await axios.delete(`/api/project/${projectId}/message/${messageId}`)
  return response.data
}

const chatService = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage
}

export default chatService
