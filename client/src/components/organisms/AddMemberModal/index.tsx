import React, { useEffect, useState } from 'react'
import { ChevronDown, Search } from 'react-feather'

import { getMembers, getAllUsers, filterMembers, filterAllUser } from '~/redux/member/memberSlice'
import { useDebounceSearch } from '~/hooks/debounceSearch'
import MemberFilter from '../MemberFilter'
import { useNudgeMember } from '~/hooks/nudge'
import DialogBox from '~/components/templates/DialogBox'
import PeopleList from '~/components/molecules/PeopeList'
import MemberList from '~/components/molecules/MemberList'
import { AddMemberFilterProps } from './AddMemberFilterType'
import AddPeopleButton from '~/components/atoms/AddPeopleButton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

const AddMemberModal = ({ close }: AddMemberFilterProps) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [addPeopleModal, setAddPeopleModal] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<any>({ id: -1, name: 'Everyone' })

  const {
    member: { member, userList },
    project
  } = useAppSelector((state) => state)
  const {
    overviewProject,
    refresher: { memberStateUpdate },
    userPermission: can
  } = project || {}
  const { id: projectID, teams } = overviewProject || {}
  const { id: teamID, name } = filterData

  const debouncedSearch = useDebounceSearch(search, 500)

  const setFilter = (data: any): void => {
    setFilterData(data)
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(filterAllUser({ projectID, searchValue: debouncedSearch })).then((_) => {
      setIsLoading(false)
    })
  }, [debouncedSearch])

  useEffect(() => {
    dispatch(getMembers(projectID))
    dispatch(getAllUsers(projectID))
  }, [projectID])

  useEffect(() => {
    setIsLoading(true)
    dispatch(
      filterMembers({
        projectID,
        teamID: teamID < 0 ? 0 : teamID
      })
    ).then(() => {
      setIsLoading(false)
    })
  }, [teamID])

  useEffect(() => {
    if (memberStateUpdate) {
      dispatch(getAllUsers(projectID))
      dispatch(getMembers(projectID))
    }
  }, [memberStateUpdate])

  const { nudge } = useNudgeMember(projectID)

  const addPeopleComponent = (
    <DialogBox
      isOpen={true}
      closeModal={() => setAddPeopleModal(!addPeopleModal)}
      headerTitle="Add people"
      bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0"
    >
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b px-6 pb-3">
          <div className="flex w-full flex-row items-center rounded-md border border-slate-300 pl-2">
            <Search color="#94A3B8" />
            <input
              type="text"
              value={search || ''}
              onChange={(e) => setSearch(e.target.value)}
              className="mr-5 w-full border-none text-slate-900 focus:ring-transparent"
              placeholder="Find members"
            />
          </div>
        </div>

        <div className="mb-3 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
          {!userList || isLoading ? (
            <PeopleList isLoading={isLoading} />
          ) : userList?.length === 0 ? (
            <h1 className="text-px-18 mt-5 text-slate-600 opacity-60">No available data</h1>
          ) : (
            userList?.map((userData: any, index: number) => (
              <PeopleList
                key={index}
                data={userData}
                className={index === userList.length - 1 && 'mb-[200px]'}
              />
            ))
          )}
        </div>
      </div>
    </DialogBox>
  )

  return (
    <DialogBox
      isOpen={true}
      closeModal={() => close(false)}
      headerTitle="Add member"
      bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0"
    >
      {addPeopleModal && addPeopleComponent}
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b px-6 pb-3">
          <div className="flex flex-row items-center gap-3">
            {can?.addMember && (
              <>
                <AddPeopleButton
                  onClick={() => {
                    setAddPeopleModal(!addPeopleModal)
                  }}
                />
                <p>Add people</p>
              </>
            )}
          </div>
          <MemberFilter
            callback={(data: any) => setFilter(data)}
            data={teams}
            className="w-[42%] cursor-pointer"
          >
            <div className="flex w-full justify-between rounded-md border border-slate-300 px-3 py-1">
              <div className="w-full max-w-[130px] truncate text-left text-slate-400">{name}</div>
              <div>{<ChevronDown color="#94A3B8" />}</div>
            </div>
          </MemberFilter>
        </div>

        <div className="mb-3 h-[500px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
          {!member || isLoading ? (
            <MemberList isLoading={isLoading} />
          ) : member?.length === 0 ? (
            <h1 className="text-px-18 mt-5 text-slate-600 opacity-60">No available data</h1>
          ) : (
            member?.map((memberData: any, index: number) => (
              <MemberList
                key={index}
                data={memberData}
                filterData={teamID}
                isLast={index === member.length - 1}
                handleNudge={nudge}
              />
            ))
          )}
        </div>
      </div>
    </DialogBox>
  )
}

export default AddMemberModal
