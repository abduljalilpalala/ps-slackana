import Image from 'next/image'
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react'

import {
  removeTeam,
  getProject,
  teamRefresher,
  resetRefresher,
  setTeamNewName,
  setRemoveTeamID,
} from "~/redux/project/projectSlice";
import { useAppDispatch } from '~/hooks/reduxSelector'
import { dummyTeamIcon } from "~/shared/jsons/dummyTeamIcon";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";

const TeamTemplate = ({ data, callBack, teamCount, loadingState }: any) => {
  const router = useRouter()
  const { id: projectID } = router.query;
  const dispatch = useAppDispatch();

  const { id: teamID, name, icon } = data || {};

  const renameTeam = (): void => {
    callBack(teamID)
    dispatch(setTeamNewName(name))
  }

  const deleteTeam = (): void => {
    dispatch(teamRefresher());
    dispatch(removeTeam())
      .then(_ => {
        dispatch(getProject(projectID))
          .then(_ => {
            dispatch(resetRefresher());
          })
      });
  }

  return (
    <>
      {
        loadingState
          ?
          <>
            {[...Array(7)].map(_ => {
              return (
                <Menu key={Math.random()} as="div" className="relative inline-block text-left">
                  <div onClick={() => dispatch(setRemoveTeamID({ teamID, projectID }))} className='flex items-center gap-2 w-[200px] mobile:!w-full h-[45px] truncate'>
                    <div className=' !max-w-[44px] !max-h-[44px] flex justify-center items-center rounded-full border'>
                      <ImageSkeleton className='rounded-full !h-[44px] !w-[44px]' />
                    </div>
                    <LineSkeleton className="!w-[90px] !mt-[10px]" />
                  </div>
                </Menu>
              )
            })}
          </>
          :
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                <div onClick={() => dispatch(setRemoveTeamID({ teamID, projectID }))} className='flex items-center gap-2 w-[200px] mobile:!w-full truncate'>
                  <div className='max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border'>
                    <Image
                      src={icon || dummyTeamIcon[7]}
                      alt="team-icon"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <span className='text-base font-semibold truncate'>{name}</span>
                </div>
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
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={renameTeam}
                        className={`${active ? 'bg-blue-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Rename
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteTeam}
                        disabled={teamCount === 1}
                        className={`${teamCount === 1 && "cursor-not-allowed opacity-60"} ${active ? 'bg-red-600 !text-white' : 'text-gray-900'} text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Remove Team
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
      }
    </>
  );
};

export default TeamTemplate;
