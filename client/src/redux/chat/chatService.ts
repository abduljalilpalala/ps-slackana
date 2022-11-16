import {
  AddMessageThreadType,
  AddMessageType,
  Chat,
  DeleteMessageThreadType,
  DeleteMessageType,
  MessageThreadResponse,
  UpdateMessageThreadType,
  UpdateMessageType
} from './chatType'
import { axios } from '~/shared/lib/axios'


  /* Chat Messages */

const getMessages = async (projectId: number | string): Promise<Chat[]> => {
  const response = await axios.get(`/api/project/${projectId}/message`)
  return response.data
}

const showMessage = async (projectId: number, messageId: number): Promise<string> => {
  const response = await axios.get(`/api/project/${projectId}/message/${messageId}`)
  return response.data
}

const addMessage = async (payload: AddMessageType): Promise<any> => {
  const { projectId, message } = payload
  const response = await axios.post(`/api/project/${projectId}/message`, { message })
  return response.data
}

const updateMessage = async (payload: UpdateMessageType): Promise<Chat> => {
  const { projectId, messageId, message } = payload
  const response = await axios.put(`/api/project/${projectId}/message/${messageId}`, { message })
  return response.data
}

const deleteMessage = async (payload: DeleteMessageType): Promise<number> => {
  const { projectId, messageId } = payload
  const response = await axios.delete(`/api/project/${projectId}/message/${messageId}`)
  return response.data
}

/* Thread Messages */

const getThreads = async (messageId: number): Promise<Chat[]> => {
  const response = await axios.get(`/api/project/message/${messageId}/thread`)
  return response.data
}

const addThread = async (payload: AddMessageThreadType): Promise<MessageThreadResponse> => {
  const { projectId, messageId, message } = payload
  const request = { project: projectId, message }
  const response = await axios.post(`/api/project/message/${messageId}/thread`, request)
  return response.data
}

const updateThread = async (payload: UpdateMessageThreadType): Promise<MessageThreadResponse> => {
  const { messageId, threadId, message } = payload
  const response = await axios.put(`/api/project/message/${messageId}/thread/${threadId}`, {
    message
  })
  return response.data
}

const deleteThread = async (payload: DeleteMessageThreadType): Promise<MessageThreadResponse> => {
  const { messageId, threadId } = payload
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
