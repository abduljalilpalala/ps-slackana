import React from "react";
import Image from 'next/image'

const MembersTemplate = ({ data }: any) => {
  return (
    <div className='flex items-center gap-2 '>
      <div className={`min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border-4 ${data.isActive ? "border-green-600" : "border-slate-400"}`}>
        <Image
          src="/images/animated-avatar.jpg"
          alt="members-icon"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-start items-start">
        <span className='text-base font-semibold w-[150px] mobile:!w-full truncate'>{data.name}</span>
        <span className='text-slate-500 w-[150px] mobile:!w-full truncate'>{data.team}</span>
      </div>
    </div>
  );
};

export default MembersTemplate;
