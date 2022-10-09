import React, { useState } from "react";
import { useRouter } from "next/router";

import { setProjectTeam, setAddTeam, setProjectId } from '~/redux/project/projectSlice'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxSelector'

type Props = {
  isSubmitting: boolean;
  type: string;
  changes?: any;
}

const InputTags: React.FC<Props> = ({ isSubmitting, type, changes = () => { } }) => {
  const router = useRouter()
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const {
    newProject: { teams: newTeams },
    overviewProject: { teams: editTeams }
  } = useAppSelector((state) => state.project)

  const teamData = type.toLocaleLowerCase() === "create"
    ? newTeams?.map((team: { name: string }) => { return team.name })
    : editTeams?.map((team: { name: string }) => { return team.name });

  const [tags, setTags] = useState<any>(teamData);

  const addTags = (e: any) => {
    const value = e.target.value;

    if (e.key !== 'Enter') return;
    if (!value.trim()) return;

    setTags([...tags, value]);
    changes(false);
    switch (type.toLocaleLowerCase()) {
      case "create": {
        dispatch(setProjectTeam([...newTeams, { name: value }]));
        break;
      }
      case "update": {
        dispatch(setAddTeam([...tags, value]));

        dispatch(setProjectId(id));
        break;
      }

      default: {
        alert("Error! no functionality yet.");
        break;
      }
    }

    e.target.value = ''
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((tag: any, i: number) => i !== index));
    changes(false);

    switch (type.toLocaleLowerCase()) {
      case "create": {
        dispatch(setProjectTeam(newTeams.filter((team: any, i: number) => i !== index)));
        break;
      }
      case "update": {
        dispatch(setAddTeam(tags.filter((team: any, i: number) => i !== index)));
        dispatch(setProjectId(id));
        break;
      }

      default: {
        alert("Error! no functionality yet.");
        break;
      }
    }
  }

  const isDisabled = tags.length === 1;

  return (
    <div className="border w-full flex flex-wrap gap-2 items-center p-3 rounded-md">
      <input onKeyDown={addTags} type="text" className="placeholder-slate-400 w-full rounded-lg border-none h-[30px]" placeholder="Hit enter to add tags..." disabled={isSubmitting} />

      {tags.map((tag: any, index: number) => {
        return (
          <button
            disabled={isDisabled || isSubmitting}
            key={index}
            className={`${(isDisabled || isSubmitting) && 'opacity-50'} cursor-default flex flex-row justify-between text-slate-50 bg-slate-500 gap-2 w-fit px-3 py-1 rounded-lg text-[12px]`}>
            {tag}
            {type === "create" &&
              <span
                onClick={() => isDisabled || removeTag(index)}
                className={`${isDisabled && 'cursor-not-allowed'} close rounded-full px-1 text-center align-center hover:bg-slate-300 cursor-pointer text-slate-50 font-medium`}>
                &times;
              </span>}
          </button>
        )
      })}
    </div>
  );
};

export default InputTags;
