import moment from 'moment'
import { Plus } from 'react-feather'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

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
  setEditProjectDescription,
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

const Overview: FC = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const [teamLimit, setTeamLimit] = useState<boolean>(false);
  const [membersLimit, setMembersLimit] = useState<boolean>(false);

  const {
    isLoading,
    refresher,
    overviewProject,
    projectDescription,
    userPermission: can,
    renameTeamData: getTeamData,
  } = useAppSelector((state) => state.project);

  const { name } = getTeamData || {};
  const { teamStateUpdate, projectStateUpdate, memberStateUpdate } = refresher || {};
  const { title: editTitle, description: editDescription } = projectDescription || {};
  const {
    title,
    teams,
    members,
    created_at,
    description,
    numberOfActiveMembers,
  } = overviewProject || {};

  const updateTitle = (e: any) => {
    const value = e.target.value;
    dispatch(setEditProjectTitle(value));
  };
  const updateDescription = (e: any) => {
    const value = e.target.value;
    dispatch(setEditProjectDescription(value));
  };

  const onSaveChanges = () => {
    dispatch(setEditProjectTitle(editTitle));
    dispatch(setEditProjectDescription(editDescription));

    dispatch(projectRefresher());
    dispatch(updateProjectDetails())
      .then(({ payload }) => {
        dispatch(resetRefresher());
        dispatch(getProject(id));
        darkToaster('✅', payload?.message);
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
      .then(({ payload }) => {
        darkToaster('✅', payload);
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
          value={name}
          disabled={isLoading}
          placeholder="Team name"
          css={globals.form_control}
          onChange={(e: any) => { dispatch(setTeamNewName(e.target.value)) }}
        />
      </div>
      <SubmitButton
        text="Save"
        isSubmitting={isLoading}
        submitted={renameTeamSubmit}
        className="mobile:!w-full !text-slate-50 !bg-blue-600 hover:!bg-blue-800"
      />
    </DialogBox>
  );

  const [addTeamState, setAddTeamState] = useState<boolean>(false);
  const [detectChanges, setDetectChanges] = useState<boolean>(true);
  const addTeamSubmit = (): void => {
    setAddTeamState(!addTeamState)

    dispatch(teamRefresher());
    dispatch(addNewTeam())
      .then(({ payload }) => {
        darkToaster('✅', payload);
        dispatch(getProject(id))
          .then(_ => {
            setDetectChanges(true);
            dispatch(resetRefresher());
          })
      });
  };
  const addTeamModal = (
    <DialogBox
      isOpen={addTeamState}
      closeModal={() => {
        setDetectChanges(true);
        setAddTeamState(!addTeamState)
      }}
      headerTitle="Add team"
    >
      <div css={homeStyle.tags}>
        <p css={globals.form_label} className="">
          Team <span>*</span>
        </p>
        <InputTags
          type="update"
          isSubmitting={isLoading}
          changes={setDetectChanges}
        />
      </div>
      <div className='flex gap-3'>
        <SubmitButton
          text="Cancel"
          isSubmitting={false}
          submitted={() => setAddTeamState(false)}
          className="!text-slate-900 !bg-slate-300 hover:!bg-blue-600 hover:!text-slate-50" />
        <SubmitButton
          text="Save"
          isSubmitting={isLoading}
          submitted={addTeamSubmit}
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
                      onChange={updateTitle}
                      value={editTitle || ""}
                      onBlur={() => {
                        if (editTitle?.length === 0) return dispatch(setEditProjectTitle(title));
                        if (editTitle !== title) return onSaveChanges();
                      }}
                      disabled={!can?.editProject}
                      placeholder='Title field should not be empty'
                      className='placeholder:text-[18px] text-4xl font-bold text-slate-900 truncate text-ellipsis max-w-[500px] mobile:max-w-[250px] border-none rounded-md pl-1' />
                }
                <span className='text-xl font-medium text-slate-900 mb-[12px]'>{moment(created_at).format('MMMM DD, YYYY')}</span>
              </div>
              {projectStateUpdate
                ? <div className='border border-slate-300 p-5 rounded-md h-[142px] w-full'>
                  <LineSkeleton className='w-[100%]' />
                  <LineSkeleton className='w-[80%]' />
                  <LineSkeleton className='w-[50%]' />
                  <LineSkeleton className='w-[30%]' />
                  <LineSkeleton className='w-[20%]' /></div>
                :
                <textarea
                  placeholder='Description field should not be empty'
                  name="description" rows={5}
                  disabled={!can?.editProject}
                  onChange={updateDescription}
                  value={editDescription || ""}
                  onBlur={() => {
                    if (editDescription?.length === 0) return dispatch(setEditProjectDescription(description));
                    if (editDescription !== description) return onSaveChanges();
                  }}
                  className='text-sm text-slate-500 break-words border border-slate-300 p-5 rounded-md resize-none'
                />
              }

            </div>

            <div className='w-full flex flex-col gap-3'>
              <h1 className='text-lg font-bold'>Team</h1>
              <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
                {
                  can?.addTeam && (
                    <div onClick={() => setAddTeamState(!addTeamState)} className='flex items-center gap-2 w-[200px] cursor-pointer'>
                      <div className='w-[44px] h-[44px] flex justify-center items-center rounded-full border-2 border-dotted border-slate-600'>
                        <Plus />
                      </div>
                      <button className='text-base font-semibold'>Add Team</button>
                    </div>
                  )
                }
                {
                  teamStateUpdate
                    ? <TeamTemplate data={null} loadingState={teamStateUpdate} />
                    : teams?.slice(0, teamLimit ? teams?.length : 11)
                      .map((team: any, index: number) => {
                        return <TeamTemplate key={index} data={team} callBack={renameTeam} teams={teams} />
                      })
                }
                {
                  teamStateUpdate || teams?.slice(0, 12).length === 12 &&
                  <SeeMore set={setTeamLimit} what={teamLimit} />
                }
              </div>
            </div>

            <div className='w-full flex flex-col gap-3'>
              <h1 className='text-lg font-bold'>Members</h1>
              <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
                {
                  memberStateUpdate
                    ? <MembersTemplate data={null} loadingState={memberStateUpdate} />
                    : members?.slice(0, membersLimit ? numberOfActiveMembers : 12)
                      .map((member: any, index: number) => {
                        if (!member?.is_removed) {
                          return <MembersTemplate key={index} data={member} />;
                        };
                      })
                }
                {
                  memberStateUpdate || numberOfActiveMembers >= 13 &&
                  <SeeMore set={setMembersLimit} what={membersLimit} />
                }
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
