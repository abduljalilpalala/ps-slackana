import React, { useState } from "react";

import { teamTempoData } from '~/shared/jsons/teamTempoData'

const InputTags = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const teamList = teamTempoData.map((team) => {
    return team.team;
  });

  const [tags, setTags] = useState(teamList);

  console.log(tags);

  const addTags = (e: any) => {
    const value = e.target.value;

    if (e.key !== 'Enter') return;
    if (!value.trim()) return;

    setTags([...tags, value]);
    e.target.value = ''
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((tag, i) => i !== index));
  }

  const isDisabled = tags.length === 1;

  return (
    <div className="border w-full flex flex-wrap gap-3 items-center p-3 rounded-md">
      <input onKeyDown={addTags} type="text" className="placeholder-slate-400 w-full rounded-lg border-none h-[30px]" placeholder="Input tags..." disabled={isSubmitting} />

      {tags.map((tag, index) => {
        return <div key={index} className={`${(isDisabled || isSubmitting) && 'opacity-50'} flex flex-row justify-between text-slate-50 bg-slate-500 gap-2 w-fit px-3 py-1 rounded-lg text-[12px]`}>
          {tag}
          <button disabled={isDisabled || isSubmitting} onClick={() => removeTag(index)} className={`${isDisabled && 'cursor-not-allowed'} close rounded-full px-1 text-center align-center hover:bg-slate-300 cursor-pointer text-slate-50 font-medium`}>&times;</button>
        </div>
      })}
    </div>
  );
};

export default InputTags;
