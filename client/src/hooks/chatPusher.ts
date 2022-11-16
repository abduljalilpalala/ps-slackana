import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import {
  setAddedMessage,
  setUpdatedMessage,
  removeMessage,
  setAddedThreadMessage,
  setUpdatedThreadMessage,
  removeThreadMessage,
  setMessageLoading
} from '~/redux/chat/chatSlice'
import { pusher } from '~/shared/lib/pusher'
import { Chat } from '~/redux/chat/chatType'
import { useAppDispatch } from './reduxSelector'
import { ERROR_MESSAGE } from '~/utils/messages'

type ChatPusherResponse = {
  data: Chat | number
  type: ACTIONS.ADD_MESSAGE | ACTIONS.UPDATE_MESSAGE | ACTIONS.DELETE_MESSAGE
}

type ThreadPusherResponse = {
  message: Chat
  threadMessage: Chat | number
  type: ACTIONS.ADD_MESSAGE | ACTIONS.UPDATE_MESSAGE | ACTIONS.DELETE_MESSAGE
}

enum ACTIONS {
  ADD_MESSAGE = 'ADD_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE'
}

const useChatPusher = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id, chat_id } = router.query

  useEffect(() => {
    const channel = pusher.subscribe(`project.${id}.chat`)
    channel.bind('SendProjectMessage', ({ data, type }: ChatPusherResponse) => {
      switch (type) {
        case ACTIONS.ADD_MESSAGE:
          dispatch(setAddedMessage(data))
          dispatch(setMessageLoading(true))
          break
        case ACTIONS.UPDATE_MESSAGE:
          dispatch(setUpdatedMessage(data))
          break
        case ACTIONS.DELETE_MESSAGE:
          dispatch(removeMessage(data))
          break
        default:
          toast.error(ERROR_MESSAGE)
      }
    })
    return () => {
      pusher.unsubscribe(`project.${id}.chat`)
    }
  }, [])

  useEffect(() => {
    const channel = pusher.subscribe(`chat.${chat_id}.thread`)
    channel.bind('SendProjectMessageThread', (data: ThreadPusherResponse) => {
      const { message, threadMessage, type } = data
      switch (type) {
        case ACTIONS.ADD_MESSAGE:
          if (typeof threadMessage !== 'number') {
            dispatch(setAddedThreadMessage({ message, threadMessage }))
          }
          break
        case ACTIONS.UPDATE_MESSAGE:
          if (typeof threadMessage !== 'number') {
            dispatch(setUpdatedThreadMessage(threadMessage))
          }
          break
        case ACTIONS.DELETE_MESSAGE:
          if (typeof threadMessage === 'number') {
            dispatch(removeThreadMessage({ message, threadMessage }))
          }
          break
        default:
          toast.error(ERROR_MESSAGE)
      }
    })
    return () => {
      pusher.unsubscribe(`chat.${chat_id}.thread`)
    }
  }, [])
}

export default useChatPusher
