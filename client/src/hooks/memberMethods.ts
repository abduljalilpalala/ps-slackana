import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { filterMembersByName, getAllUsers, getMembers } from '~/redux/member/memberSlice'

export const useMemberMethods = (projectID: number) => {
  const [isMemberLoading, setIsMemberLoading] = useState(false)
  const {
    member: { member: members }
  } = useAppSelector((state) => state)

  const dispatch = useAppDispatch()
  useEffect(() => {
    setIsMemberLoading(true), dispatch(getMembers(projectID)).then((_) => setIsMemberLoading(false))
  }, [projectID])

  const filterMembersName = async (projectID: number, name: string) => {
    setIsMemberLoading(true)
    dispatch(filterMembersByName({ projectID, name })).then((_) => setIsMemberLoading(false))
  }

  return {
    members,
    isMemberLoading,
    filterMembersName
  }
}
