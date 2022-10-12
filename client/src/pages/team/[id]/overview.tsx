import moment from 'moment'
import { Plus } from 'react-feather'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import {
  setID,
  addNewTeam,
  getProject,
  renameTeamData,
  setTeamNewName,
  setEditProjectID,
  setEditProjectTitle,
  updateProjectDetails,
  setEditProjectDescription,
  resetRefresher,
  startRefresher,
  projectRefresher,
  teamRefresher,
} from '~/redux/project/projectSlice'
import SeeMore from '~/components/atoms/SeeMore'
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

const Overview: FC = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const [teamLimit, setTeamLimit] = useState<boolean>(false);
  const [membersLimit, setMembersLimit] = useState<boolean>(false);

  const { overviewProject, renameTeamData: getTeamData, projectDescription, isLoading, refresher } = useAppSelector((state) => state.project);
  const { title, description, created_at, teams, members } = overviewProject || {};
  const { teamStateUpdate, projectStateUpdate, memberStateUpdate } = refresher || {};
  const { title: editTitle, description: editDescription } = projectDescription || {};
  const { name } = getTeamData || {};

  useEffect(() => {
    setTeamLimit(false);
    dispatch(startRefresher());
    dispatch(setEditProjectID(id));
    dispatch(setEditProjectTitle(title));
    dispatch(setEditProjectDescription(description));
    dispatch(getProject(id))
      .then(_ => {
        dispatch(resetRefresher());
      });
  }, [id, title])

  const updateTitle = (e: any) => {
    const value = e.target.value;
    dispatch(setEditProjectTitle(value));
  };
  const updateDescription = (e: any) => {
    const value = e.target.value;
    dispatch(setEditProjectDescription(value));
  };
  const [saveChanges, setSaveChanges] = useState<boolean>(false);
  const onSaveChanges = () => {
    setSaveChanges(true);
    dispatch(projectRefresher());
    dispatch(updateProjectDetails())
      .then(_ => {
        setSaveChanges(false);
        dispatch(resetRefresher());
      });
  };

  const [renameTeamState, setRenameTeamState] = useState<boolean>(false);
  const renameTeam = (teamID?: number): void => {
    dispatch(setID({ projectID: id, teamID }))
    setRenameTeamState(!renameTeamState);
  };
  const renameTeamSubmit = (): void => {
    setRenameTeamState(!renameTeamState);

    dispatch(teamRefresher());
    dispatch(renameTeamData())
      .then(_ => {
        dispatch(getProject(id))
          .then(_ => {
            dispatch(resetRefresher());
          })
      });
  };
  const renameModal = (
    <DialogBox isOpen={renameTeamState} closeModal={renameTeam} headerTitle="Rename team">
      <div >
        <label htmlFor="tite" css={globals.form_label} className="float-left">
          Team <span>*</span>
        </label>
        <input
          type="text"
          name="tite"
          css={globals.form_control}
          disabled={isLoading}
          placeholder="Team name"
          value={name}
          onChange={(e: any) => {
            dispatch(setTeamNewName(e.target.value))
          }}
        />
      </div>
      <SubmitButton text="Save" submitted={renameTeamSubmit} isSubmitting={isLoading} className="mobile:!w-full !text-slate-50 !bg-blue-600 hover:!bg-blue-800" />
    </DialogBox>
  );

  const [detectChanges, setDetectChanges] = useState<boolean>(true);
  const [addTeamState, setAddTeamState] = useState<boolean>(false);
  const addTeamSubmit = (): void => {
    setAddTeamState(!addTeamState)

    dispatch(teamRefresher());
    dispatch(addNewTeam())
      .then(_ => {
        dispatch(getProject(id))
          .then(_ => {
            dispatch(resetRefresher());
          })
      });
  };
  const addTeamModal = (
    <DialogBox isOpen={addTeamState} closeModal={() => setAddTeamState(!addTeamState)} headerTitle="Add team">
      <div css={homeStyle.tags}>
        <p css={globals.form_label} className="">
          Team <span>*</span>
        </p>
        <InputTags isSubmitting={isLoading} type="update" changes={setDetectChanges} />
      </div>
      <div className='flex gap-3'>
        <SubmitButton
          text="Cancel"
          submitted={() => setAddTeamState(false)}
          isSubmitting={false}
          className="!text-slate-900 !bg-slate-300 hover:!bg-blue-600 hover:!text-slate-50" />
        <SubmitButton
          text="Save"
          submitted={addTeamSubmit}
          isSubmitting={isLoading}
          isDisabled={detectChanges}
          className={`!text-slate-50 !bg-blue-600 hover:!bg-blue-600 opacity-60 hover:!opacity-100 ${detectChanges && "hover:!opacity-60 !cursor-not-allowed"}`} />
      </div>
    </DialogBox>
  );

  return (
    <ProjectLayout metaTitle="Overview">
      {renameModal}
      {addTeamModal}
      <div className="pb-40 grid h-screen w-full px-10 overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
        <div className='flex justify-center items-start mt-[60px] w-full'>
          <div className='max-w-[900px] flex flex-col gap-10 items-start justify-start w-full'>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex justify-between items-end mobile:!flex-wrap'>
                {
                  projectStateUpdate
                    ? <div className='mobile:!w-full w-[500px] flex justify-start items-center pt-2'>
                      <LineSkeleton className='w-[200px] !h-[38px] !rounded-lg' />
                    </div>
                    : <input
                      type="text"
                      name="title"
                      value={editTitle || ""}
                      onChange={updateTitle}
                      placeholder='Title field should not be empty'
                      className='placeholder:text-[18px] text-4xl font-bold text-slate-900 truncate text-ellipsis max-w-[500px] mobile:max-w-[250px] border-none rounded-md pl-1' />
                }
                <span className='text-xl font-medium text-slate-900'>{moment(created_at).format('MMMM DD, YYYY')}</span>
              </div>
              {
                projectStateUpdate
                  ? <div className='border border-slate-300 p-5 rounded-md h-[142px] w-full'>
                    <LineSkeleton className='w-[100%]' />
                    <LineSkeleton className='w-[80%]' />
                    <LineSkeleton className='w-[50%]' />
                    <LineSkeleton className='w-[30%]' />
                    <LineSkeleton className='w-[20%]' /></div>
                  : <textarea placeholder='No project description...' onChange={updateDescription} value={editDescription || ""} name="description" rows={5} className='text-sm text-slate-500 break-words border border-slate-300 p-5 rounded-md' />
              }
              <div className='flex w-full items-end justify-end'>
                <SubmitButton
                  text="Save"
                  submitted={onSaveChanges}
                  isSubmitting={saveChanges}
                  isDisabled={editDescription?.length === 0 || editTitle?.length === 0}
                  className="!w-[175px] mobile:!w-full !text-slate-600 !bg-slate-200 hover:!bg-blue-600 hover:!text-slate-50" />
              </div>
            </div>

            <div className='w-full flex flex-col gap-3'>
              <h1 className='text-lg font-bold'>Team</h1>
              <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
                <div onClick={() => setAddTeamState(!addTeamState)} className='flex items-center gap-2 w-[200px] cursor-pointer'>
                  <div className='w-[44px] h-[44px] flex justify-center items-center rounded-full border-2 border-dotted border-slate-600'>
                    <Plus />
                  </div>
                  <button className='text-base font-semibold'>Add Team</button>
                </div>
                {
                  teamStateUpdate
                    ? <TeamTemplate data={null} loadingState={teamStateUpdate} />
                    : teams?.slice(0, teamLimit ? teams?.length : 11)
                      .map((team: any, index: number) => {
                        return <TeamTemplate key={index} data={team} callBack={renameTeam} teamCount={teams?.length} />
                      })
                }
                {teamStateUpdate || teams?.slice(0, 12).length === 12 && <SeeMore set={setTeamLimit} what={teamLimit} />}
              </div>
            </div>

            <div className='w-full flex flex-col gap-3'>
              <h1 className='text-lg font-bold'>Members</h1>
              <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
                {
                  memberStateUpdate
                    ? <MembersTemplate data={null} loadingState={memberStateUpdate} />
                    : members?.slice(0, membersLimit ? members?.length : 12)
                      .map((member: any, index: number) => {
                        return <MembersTemplate key={index} data={member} />
                      })
                }
                {memberStateUpdate || members?.slice(0, 13).length === 13 && (<SeeMore set={setMembersLimit} what={membersLimit} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout >
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Overview
