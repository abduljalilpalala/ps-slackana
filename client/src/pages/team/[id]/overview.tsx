import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Plus, Edit3 } from 'react-feather'
import ReactTextareaAutosize from 'react-textarea-autosize'

import {
  setID,
  addNewTeam,
  getProject,
  teamRefresher,
  setTeamNewName,
  resetRefresher,
  renameTeamData,
  projectRefresher,
  setEditProjectTitle,
  updateProjectDetails,
  setEditProjectDescription
} from '~/redux/project/projectSlice'
import SeeMore from '~/components/atoms/SeeMore'
import { darkToaster } from '~/utils/darkToaster'
import { globals } from '~/shared/twin/globals.styles'
import InputTags from '~/components/molecules/InputTags'
import DialogBox from '~/components/templates/DialogBox'
import SubmitButton from '~/components/atoms/SubmitButton'
import TeamTemplate from '~/components/molecules/TeamTemplate'
import ProjectLayout from '~/components/templates/ProjectLayout'
import MembersTemplate from '~/components/molecules/MembersTemplate'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import Tooltip from '~/components/templates/Tooltip'
import { NextPage } from 'next'

const Overview: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()

  const [teamLimit, setTeamLimit] = useState<boolean>(false)
  const [membersLimit, setMembersLimit] = useState<boolean>(false)

  const {
    isLoading,
    refresher,
    overviewProject,
    projectDescription,
    userPermission: can,
    renameTeamData: getTeamData
  } = useAppSelector((state) => state.project)

  const { name } = getTeamData || {}
  const { teamStateUpdate, projectStateUpdate, memberStateUpdate } = refresher || {}
  const { title: editTitle, description: editDescription } = projectDescription || {}
  const { title, teams, members, created_at, description, numberOfActiveMembers } =
    overviewProject || {}

  const updateTitle = (e: any) => {
    const value = e.target.value
    dispatch(setEditProjectTitle(value))
  }
  const updateDescription = (e: any) => {
    const value = e.target.value
    dispatch(setEditProjectDescription(value))
  }

  const onSaveBlur = (e: any) => {
    onSaveProjectDetails()
  }

  const onSaveKeyUp = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onSaveProjectDetails()
    }
  }

  const onSaveProjectDetails = () => {
    dispatch(setEditProjectTitle(editTitle))
    dispatch(setEditProjectDescription(editDescription))

    dispatch(projectRefresher())
    dispatch(updateProjectDetails()).then(({ payload }: any) => {
      dispatch(resetRefresher())
      dispatch(getProject(id))
      darkToaster('✅', payload?.message)
    })
  }

  const [renameTeamState, setRenameTeamState] = useState<boolean>(false)
  const renameTeam = (teamID?: number): void => {
    dispatch(setID({ projectID: id, teamID }))
    setRenameTeamState(!renameTeamState)
  }
  const renameTeamSubmit = (): void => {
    setRenameTeamState(!renameTeamState)

    dispatch(teamRefresher())
    dispatch(renameTeamData()).then(({ payload }: any) => {
      darkToaster('✅', payload)
      dispatch(getProject(id)).then((_: any) => {
        dispatch(resetRefresher())
      })
    })
  }
  const renameModal = (
    <DialogBox isOpen={renameTeamState} closeModal={renameTeam} headerTitle="Rename team">
      <div>
        <label htmlFor="tite" css={globals.form_label} className="float-left">
          Team <span>*</span>
        </label>
        <input
          type="text"
          name="tite"
          value={name}
          disabled={isLoading}
          placeholder="Team name"
          css={globals.form_control}
          onChange={(e: any) => {
            dispatch(setTeamNewName(e.target.value))
          }}
        />
      </div>
      <SubmitButton
        text="Save"
        isSubmitting={isLoading}
        submitted={renameTeamSubmit}
        className="!bg-blue-600 !text-slate-50 hover:!bg-blue-800 mobile:!w-full"
      />
    </DialogBox>
  )

  const [addTeamState, setAddTeamState] = useState<boolean>(false)
  const [detectChanges, setDetectChanges] = useState<boolean>(true)
  const addTeamSubmit = (): void => {
    setAddTeamState(!addTeamState)

    dispatch(teamRefresher())
    dispatch(addNewTeam()).then(({ payload }: any) => {
      darkToaster('✅', payload)
      dispatch(getProject(id)).then((_: any) => {
        setDetectChanges(true)
        dispatch(resetRefresher())
      })
    })
  }
  const addTeamModal = (
    <DialogBox
      isOpen={addTeamState}
      closeModal={() => {
        setDetectChanges(true)
        setAddTeamState(!addTeamState)
      }}
      headerTitle="Add team"
    >
      <div css={homeStyle.tags}>
        <p css={globals.form_label} className="">
          Team <span>*</span>
        </p>
        <InputTags type="update" isSubmitting={isLoading} changes={setDetectChanges} />
      </div>
      <div className="flex gap-3">
        <SubmitButton
          text="Cancel"
          isSubmitting={false}
          submitted={() => setAddTeamState(false)}
          className="!bg-slate-300 !text-slate-900 hover:!bg-blue-600 hover:!text-slate-50"
        />
        <SubmitButton
          text="Save"
          isSubmitting={isLoading}
          submitted={addTeamSubmit}
          isDisabled={detectChanges}
          className={`!bg-blue-600 !text-slate-50 opacity-60 hover:!bg-blue-600 hover:!opacity-100 ${
            detectChanges && '!cursor-not-allowed hover:!opacity-60'
          }`}
        />
      </div>
    </DialogBox>
  )

  return (
    <ProjectLayout metaTitle="Overview">
      {renameModal}
      {addTeamModal}
      <div className="grid h-screen w-full overflow-y-scroll px-10 pb-40 text-slate-800 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
        <div className="mt-[60px] flex w-full items-start justify-center">
          <div className="flex w-full max-w-[900px] flex-col items-start justify-start gap-10">
            <div className="flex w-full flex-col gap-6">
              <div className="flex items-end justify-between sm:space-x-4 mobile:!flex-wrap">
                {projectStateUpdate ? (
                  <div className="flex w-[500px] items-center justify-start pt-2 mobile:!w-full">
                    <LineSkeleton className="!h-[38px] w-[200px] !rounded-lg" />
                  </div>
                ) : (
                  <Tooltip text={editTitle || ''}>
                    <label
                      htmlFor="title"
                      className="group relative flex flex-shrink-0 items-center md:-mx-2"
                    >
                      <input
                        id="title"
                        name="title"
                        onChange={updateTitle}
                        value={editTitle || ''}
                        onBlur={(e) => {
                          if (editTitle?.length === 0) return dispatch(setEditProjectTitle(title))
                          if (editTitle !== title) return onSaveBlur(e)
                        }}
                        onKeyUp={(e) => onSaveKeyUp(e)}
                        onFocus={(e) => (e.target.value = editTitle)}
                        disabled={!can?.editProject}
                        placeholder={editTitle}
                        className={`
                          w-full max-w-[500px] flex-shrink-0 resize-none overflow-hidden text-ellipsis rounded-md border
                          border-transparent py-2 pl-2 pr-8 text-4xl font-bold transition duration-150 ease-in-out 
                          line-clamp-1 placeholder:text-slate-900 focus-within:border-slate-200 focus-within:bg-slate-50 
                          focus:outline-slate-400 group-focus:pr-4 hover:border-slate-200 lg:max-w-[500px] 
                        `}
                      />
                      <span className="insert-y-0 absolute right-0 cursor-text px-2 py-4 opacity-100 group-focus-within:opacity-0 group-hover:border-slate-200">
                        <Edit3 className="h-6 w-6 text-slate-600" />
                      </span>
                    </label>
                  </Tooltip>
                )}
                <span className="mb-[12px] text-xl font-medium text-slate-500 line-clamp-1">
                  {moment(created_at).format('MMMM DD, YYYY')}
                </span>
              </div>
              {projectStateUpdate ? (
                <div className="h-[142px] w-full rounded-md border border-slate-300 p-5">
                  <LineSkeleton className="w-[100%]" />
                  <LineSkeleton className="w-[80%]" />
                  <LineSkeleton className="w-[50%]" />
                  <LineSkeleton className="w-[30%]" />
                  <LineSkeleton className="w-[20%]" />
                </div>
              ) : (
                <label className="group relative flex items-start md:-mx-2" htmlFor="description">
                  <ReactTextareaAutosize
                    id="description"
                    placeholder="No Project Description..."
                    name="description"
                    rows={5}
                    disabled={!can?.editProject}
                    onChange={updateDescription}
                    value={editDescription || ''}
                    onBlur={(e) => {
                      if (editDescription?.length === 0)
                        return dispatch(setEditProjectDescription(description))
                      if (editDescription !== description) return onSaveBlur(e)
                    }}
                    className={`
                        min-h-[140px] w-full resize-none break-words rounded-md border-transparent px-2 py-3 pr-10 text-sm
                        text-slate-500 outline-none transition duration-150 ease-in-out focus:border-slate-200
                      focus:bg-slate-50 focus:ring-slate-400 hover:border-slate-200
                    `}
                  />
                  <span className="insert-y-0 absolute top-3 right-4 cursor-text opacity-100 group-focus-within:opacity-0">
                    <Edit3 className="h-4 w-5 text-slate-600" />
                  </span>
                </label>
              )}
            </div>

            <div className="flex w-full flex-col gap-3 text-slate-700">
              <h1 className="text-lg font-bold">Team</h1>
              <div className="grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1">
                {can?.addTeam && (
                  <div
                    onClick={() => setAddTeamState(!addTeamState)}
                    className="flex w-[200px] cursor-pointer items-center gap-2 active:scale-95"
                  >
                    <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-dotted border-slate-500">
                      <Plus />
                    </div>
                    <button className="text-base font-semibold">Add Team</button>
                  </div>
                )}
                {teamStateUpdate ? (
                  <TeamTemplate data={null} loadingState={teamStateUpdate} />
                ) : (
                  teams
                    ?.slice(0, teamLimit ? teams?.length : 11)
                    .map((team: any, index: number) => {
                      return (
                        <TeamTemplate key={index} data={team} callBack={renameTeam} teams={teams} />
                      )
                    })
                )}
                {teamStateUpdate ||
                  (teams?.slice(0, 12).length === 12 && (
                    <SeeMore set={setTeamLimit} what={teamLimit} />
                  ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 text-slate-700">
              <h1 className="text-lg font-bold">Members</h1>
              <div className="grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1">
                {memberStateUpdate ? (
                  <MembersTemplate data={null} loadingState={memberStateUpdate} />
                ) : (
                  members
                    ?.slice(0, membersLimit ? numberOfActiveMembers : 12)
                    .map((member: any, index: number) => {
                      if (!member?.is_removed) {
                        return <MembersTemplate key={index} data={member} />
                      }
                    })
                )}
                {memberStateUpdate ||
                  (numberOfActiveMembers >= 13 && (
                    <SeeMore set={setMembersLimit} what={membersLimit} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Overview
