import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { ChevronDown } from 'react-feather'
import { Menu, Transition } from '@headlessui/react'

import {
  removeTeam,
  getProject,
  teamRefresher,
  resetRefresher,
  setTeamNewName,
  setRemoveTeamID
} from '~/redux/project/projectSlice'
import ReactTooltip from 'react-tooltip'
import { darkToaster } from '~/utils/darkToaster'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { dummyTeamIcon } from '~/shared/jsons/dummyTeamIcon'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import handleImageError from '~/helpers/handleImageError'

const TeamTemplate = ({ data, callBack, teams, loadingState }: any) => {
  const dispatch = useAppDispatch()
  const { userPermission: can } = useAppSelector((state) => state.project)

  const router = useRouter()
  const { id: projectID } = router.query

  const { id: teamID, name, icon, members } = data || {}
  const isDisabled = members !== 0

  const renameTeam = (): void => {
    callBack(teamID)
    dispatch(setTeamNewName(name))
  }

  const deleteTeam = (): void => {
    dispatch(teamRefresher())
    dispatch(removeTeam()).then(({ payload }) => {
      darkToaster('✅', payload)
      dispatch(getProject(projectID)).then((_) => {
        dispatch(resetRefresher())
      })
    })
  }

  return (
    <>
      {loadingState ? (
        <>
          {[...Array(7)].map((_) => {
            return (
              <Menu key={Math.random()} as="div" className="relative inline-block text-left">
                <div
                  onClick={() => dispatch(setRemoveTeamID({ teamID, projectID }))}
                  className="flex h-[45px] w-[200px] items-center gap-2 truncate mobile:!w-full"
                >
                  <div className=" flex !max-h-[44px] !max-w-[44px] items-center justify-center rounded-full border">
                    <ImageSkeleton className="!h-[44px] !w-[44px] rounded-full" />
                  </div>
                  <LineSkeleton className="!mt-[10px] !w-[90px]" />
                </div>
              </Menu>
            )
          })}
        </>
      ) : (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button disabled={!can?.removeTeam && !can?.editTeam}>
              {({ open }) => (
                <div
                  onClick={() => dispatch(setRemoveTeamID({ teamID, projectID }))}
                  className="group flex w-[200px] items-center gap-2 truncate active:scale-95 mobile:!w-full"
                >
                  <div className="flex max-h-[44px] max-w-[44px] items-center justify-center rounded-full border">
                    <img
                      src={icon?.url}
                      onError={(e) => handleImageError(e, dummyTeamIcon[7])}
                      alt="team-icon"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <span
                    data-tip={name.length >= 15 ? name : null}
                    className="truncate text-base font-semibold"
                  >
                    {name}
                  </span>
                  <ChevronDown
                    className={`
                    h-5 w-5 stroke-2 opacity-0 transition duration-75 ease-in-out group-hover:opacity-100
                    ${open ? 'opacity-100' : ''}
                  `}
                  />
                  <ReactTooltip />
                </div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                {can?.editTeam && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={renameTeam}
                        className={`
                      ${active ? 'bg-blue-600 text-white' : 'text-gray-900'} 
                      group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Rename
                      </button>
                    )}
                  </Menu.Item>
                )}
                {can?.removeTeam && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteTeam}
                        disabled={isDisabled}
                        className={`
                      ${isDisabled && 'cursor-not-allowed opacity-60'} 
                      ${active ? 'bg-red-600 !text-white' : 'text-gray-900'} 
                      group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                      >
                        Remove Team
                      </button>
                    )}
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  )
}

export default TeamTemplate
