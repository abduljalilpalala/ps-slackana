import React, { useState } from "react";
import Image from 'next/image'
import { Bell } from "react-feather";

import { ActiveStatus } from "~/shared/icons/ActiveStatus";
import { ThreeDot } from "~/shared/icons/ThreeDotIcon";
import MemberOption from "~/components/organisms/MemberOption";

const MemberList = ({ data, className }: any) => {
  const [optionState, setOptionState] = useState<boolean>(false);

  const nudge = () => {
    console.log('Integrate Ping');
  }

  const dropDownOption = (value: any) => {
    console.log('Integrate Dropdown', value);
  }

  const moreOption = (
    <>
      <Bell fill={false ? '#2563EB' : 'transparent'} color="#2563EB" className="cursor-pointer" onClick={nudge} />
      <MemberOption data={['Set as Team Lead', 'Edit Team', 'Leave Project', 'Remove member']} callback={dropDownOption}>
        <div className='hover:bg-slate-100 rotate-90 z-0 mb-[3px] cursor-pointer w-[26px] h-[26px] flex items-center justify-center rounded-[3px] border border-slate-500'>
          <ThreeDot />
        </div>
      </MemberOption>
    </>
  )

  return (
    <div onMouseOverCapture={() => setOptionState(true)} onMouseOut={() => setOptionState(false)} className={`relative flex items-center justify-between hover:bg-slate-200 px-6 py-2 ${className}`}>
      <div className="flex flex-row gap-3 items-center justify-start min-w-[150px] mobile:w-[75%] truncate text-ellipsis">
        <div className="mobile:min-w-[36px] flex items-center justify-center">
          <Image
            src={'/images/animated-avatar.jpg'}
            alt="user-icon"
            width={36}
            height={36}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-row gap-3 mobile:!gap-0 items-center flex-wrap">
            <div className="flex items-center gap-3 justify-center">
              <p className="text-slate-900 tracking-tighter font-medium text-[16px] text-left">Chance Vaccaro</p>
              <ActiveStatus isActive={true} className="mr-3" />
            </div>
            <p className="text-slate-400">Team Lead</p>
          </div>
          <p className="text-slate-400">Backend / Frontend</p>
        </div>
      </div>
      <div className="flex gap-4 mr-2 items-center h-full mobile:absolute mobile:right-4">
        {optionState && moreOption}
      </div>
    </div>
  );
};

export default MemberList;
