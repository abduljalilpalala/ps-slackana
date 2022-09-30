import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Plus } from 'react-feather'

import ProjectLayout from '~/components/templates/ProjectLayout'
import SubmitButton from '~/components/atoms/SubmitButton'
import TeamTemplate from '~/components/molecules/TeamTemplate'
import MembersTemplate from '~/components/molecules/MembersTemplate'
import { membersData } from '~/shared/jsons/membersData'
import { teamTempoData } from '~/shared/jsons/teamTempoData'
import DialogBox from '~/components/templates/DialogBox'
import { globals } from '~/shared/twin/globals.styles'
import InputTags from '~/components/molecules/InputTags'
import { styles as homeStyle } from '~/shared/twin/home-content.style'

const Overview: FC = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [teamLimit, setTeamLimit] = useState<boolean>(false);
  const [membersLimit, setMembersLimit] = useState<boolean>(false);

  const [addTeamState, setAddTeamState] = useState<boolean>(false);
  const [renameTeamState, setRenameTeamState] = useState<boolean>(false);

  const [renameThis, setRenameThis] = useState<string>("");

  const router = useRouter()
  const { id } = router.query;

  const addTeam = (): void => {
    setAddTeamState(!addTeamState);
  }

  const addTeamSubmit = (): void => {
    console.log("Integrate add team save");
    setIsSubmitting(true);
  }

  const renameTeam = (team?: string): void => {
    console.log("Integrate rename team for", team);
    setRenameThis(team || "");
    setRenameTeamState(!renameTeamState);
  }

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
          disabled={isSubmitting}
          placeholder="Team name"
          value={renameThis}
          onChange={(e: any) => {
            setRenameThis(e.target.value)
          }}
        />
      </div>
      <SubmitButton text="Save" submitted={addTeamSubmit} isSubmitting={isSubmitting} className="mobile:!w-full !text-slate-50 !bg-blue-600 hover:!bg-blue-800" />
    </DialogBox>
  );

  return (
    <ProjectLayout metaTitle="Overview">
      {renameModal}
      <div className="pb-40 grid h-screen place-items-center w-full px-10 overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
        <div className='py-20 max-w-[900px] flex flex-col gap-10 items-start justify-center'>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-end mobile:!flex-wrap'>
              <h1 className='text-4xl font-bold text-slate-900'>Team 6 Digits</h1>
              <span className='text-xl font-medium text-slate-900'>September 21, 2022</span>
            </div>
            <p className='text-sm text-slate-500'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a arcu et tortor dictum finibus sed id odio.
              Praesent sed massa lectus . Nam suscipit diam non condimentum luctus. Praesent pharetra turpis in ligula faucibus maximus.
            </p>
            <div className='flex w-full items-end justify-end'>
              <SubmitButton text="Save" submitted={() => console.log("save")} isSubmitting={false} className="!w-[175px] mobile:!w-full !text-slate-600 !bg-slate-200 hover:!bg-blue-600 hover:!text-slate-50" />
            </div>
          </div>

          <div className='w-full flex flex-col gap-3'>
            <h1 className='text-lg font-bold'>Team</h1>
            <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
              <div onClick={addTeam} className='flex items-center gap-2 w-[200px] cursor-pointer'>
                <div className='w-[44px] h-[44px] flex justify-center items-center rounded-full border-2 border-dotted border-slate-600'>
                  <Plus />
                </div>
                <button className='text-base font-semibold'>Add Team</button>
              </div>
              {teamTempoData
                .slice(0, teamLimit ? teamTempoData.length : 11)
                .map((team: any, index: number) => {
                  return <TeamTemplate key={index} data={team} callBack={renameTeam} />
                })}
              {teamTempoData.slice(0, 11).length === 11 && (
                <div onClick={() => setTeamLimit(!teamLimit)} css={homeStyle.more}>
                  <span>Show {teamLimit ? 'less' : 'more'}</span>
                </div>
              )}
            </div>
          </div>

          <div className='w-full flex flex-col gap-3'>
            <h1 className='text-lg font-bold'>Members</h1>
            <div className='grid grid-cols-4 gap-6 tablet:!grid-cols-2 mobile:!grid-cols-1'>
              {membersData
                .slice(0, membersLimit ? membersData.length : 12)
                .map((member: any, index: number) => {
                  return <MembersTemplate key={index} data={member} />
                })}
              {membersData.slice(0, 12).length === 12 && (
                <div onClick={() => setMembersLimit(!membersLimit)} css={homeStyle.more}>
                  <span>Show {membersLimit ? 'less' : 'more'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout >
  )
}

export default Overview
