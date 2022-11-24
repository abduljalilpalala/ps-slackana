import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useAppDispatch } from './reduxSelector'
import { getMoreMessages } from '~/redux/chat/chatSlice'
import { AxiosResponseError } from '~/shared/types'

const useChatLazyLoad = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const [onLoad, setOnLoad] = useState<boolean>(false)

  const handleOnLoad = () => {
    if (pageNumber !== 1) {
      dispatch(getMoreMessages({ projectId: id, pageNumber }))
    }
  }

  useEffect(() => {
    handleOnLoad()
  }, [pageNumber])

  return {
    setPageNumber
  }
}

export default useChatLazyLoad
