import React, { useState } from "react";
import { Bell } from "react-feather";
import Image from 'next/image'
import { ActiveStatus } from "~/shared/icons/ActiveStatus";
import { ThreeDot } from "~/shared/icons/ThreeDotIcon";
import MemberOption from "~/components/organisms/MemberOption";
import AddPeopleButton from "~/components/atoms/AddPeopleButton";
import PeopleOption from "~/components/organisms/PeopleOption";

const PeopleList = ({ data, className }: any) => {
  const [optionState, setOptionState] = useState<boolean>(false);

  const addPeople = () => {
    console.log('Integrate Add people');
  }

  const dropDownOption = (value: any) => {
    console.log('Integrate Dropdown', value);
  }

  const moreOption = (
    <>
      <AddPeopleButton onClick={addPeople} isSolid={false} isHeader={false} />
      <PeopleOption callback={dropDownOption}>
        <div className='hover:bg-slate-100 rotate-90 z-0 cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[3px] border border-slate-500 mb-[2px]'>
          <ThreeDot />
        </div>
      </PeopleOption>
    </>
  )

  return (
    <div onMouseOverCapture={() => setOptionState(true)} onMouseOut={() => setOptionState(false)} className={`flex items-center justify-between hover:bg-slate-200 px-6 py-2 ${className}`}>
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
          <div className="flex flex-row gap-3 items-center">
            <p className="text-slate-900 tracking-tighter font-medium text-[16px]">Chance Vaccaro</p>
            <ActiveStatus isActive={true} />
          </div>
        </div>
      </div>
      <div className="flex gap-3 mr-1 items-center ml-[3px]">
        {optionState && moreOption}
      </div>
    </div>
  );
};

export default PeopleList;
