import React from 'react'
import handleImageError from '~/helpers/handleImageError'
import { ProjectStatus } from '~/shared/icons/ProjectStatus'

type ProjectTemplateType = {
  data: {
    team_name: string
    icon: string
    date: string
    status: string
  }
  className?: string
  onClick?: () => void
}

const ProjectTemplate = ({ data, className, onClick }: ProjectTemplateType): JSX.Element => {
  const { team_name, icon, date, status } = data

  return (
    <div
      onClick={onClick}
      className={`flex h-px-48 flex-row gap-3 ${status === 'archive' && 'opacity-50'} ${className}`}
    >
      <img
        src={icon}
        onError={(e) => handleImageError(e, '/images/image-dummy.png')}
        alt="team-icon"
        width={48}
        height={48}
        className="cursor-pointer"
      />
      <div>
        <div className="justify-ceter flex flex-row items-center gap-2">
          <ProjectStatus status={status} />
          <p className="text-slate-900">{team_name}</p>
        </div>
        <p className="text-slate-600">{date}</p>
      </div>
    </div>
  )
}

export default ProjectTemplate
