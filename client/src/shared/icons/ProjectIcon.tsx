import React from 'react'

export interface IconName {
  className?: string
}

export const ProjectIcon: React.FC<IconName> = ({ className }): JSX.Element => {
  return (
    <div className='bg-slate-600 w-12 h-12 rounded-lg flex items-center justify-center'>
      <svg className={className} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.411621" y="0.753906" width="15.2757" height="5.87692" fill="white" />
        <rect x="4.23047" y="9.56934" width="15.2757" height="5.87692" fill="#27344E" />
        <rect x="8.04932" y="18.3848" width="15.2757" height="5.87692" fill="white" />
      </svg>
    </div>
  )
}
