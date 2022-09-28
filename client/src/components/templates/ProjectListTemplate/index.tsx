import React from "react";
import Image from 'next/image'
import { ProjectStatus } from "~/shared/icons/ProjectStatus";

type ProjectTemplateType = {
  data: {
    team_name: string;
    icon: string;
    date: string;
    status: string;
  };
  className?: string;
  onClick?: () => void;
}

const ProjectTemplate = ({ data, className, onClick }: ProjectTemplateType): JSX.Element => {
  const { team_name, icon, date, status } = data;

  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-3 h-px-48 ${status === "archive" && 'opacity-50'} ${className}`}>
      <Image
        src={icon}
        alt="team-icon"
        width={48}
        height={48}
        className="cursor-pointer"
      />
      <div>
        <div className='flex flex-row justify-ceter items-center gap-2'>
          <ProjectStatus status={status} />
          <p className='text-slate-900'>{team_name}</p>
        </div>
        <p className='text-slate-600'>{date}</p>
      </div>
    </div>
  );
}

export default ProjectTemplate;
