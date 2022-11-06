import { Chat } from './chatType'
import { axios } from '~/shared/lib/axios'

{
  /* Chat Messages */
}
const getMessages = async (projectId: number | string): Promise<Chat[]> => {
  const response = await axios.get(`/api/project/${projectId}/message`)
  return response.data
}

const showMessage = async (projectId: number, messageId: number): Promise<string> => {
  const response = await axios.get(`/api/project/${projectId}/message/${messageId}`)
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

{
  /* Thread Messages */
}
const getThreads = async (messageId: number): Promise<Chat[]> => {
  const response = await axios.get(`/api/project/message/${messageId}/thread`)
  return response.data
}

const addThread = async (
  messageId: number,
  payload: { member_id: number; message: string }
): Promise<any> => {
  const response = await axios.post(`/api/project/message/${messageId}/thread`, payload)

  return response.data
}

const updateThread = async (
  message_id: number,
  thread_id: number,
  payload: {
    member_id: number
    message: string
  }
): Promise<string> => {
  const response = await axios.put(`/api/project/message/${message_id}/thread/${thread_id}`, {
    member_id: payload.member_id,
    message: payload.message
  })
  return response.data
}

const deleteThread = async (messageId: number, threadId: number): Promise<string> => {
  const response = await axios.delete(`/api/project/message/${messageId}/thread/${threadId}`)
  return response.data
}

const chatService = {
  getMessages,
  showMessage,
  addMessage,
  updateMessage,
  deleteMessage,
  getThreads,
  addThread,
  updateThread,
  deleteThread
}

export default chatService
