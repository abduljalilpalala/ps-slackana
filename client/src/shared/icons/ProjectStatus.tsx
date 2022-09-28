import React from 'react'

export interface IconName {
  className?: string;
  status: string;
}

export const ProjectStatus: React.FC<IconName> = ({ className, status }): JSX.Element => {
  const projectStatus = () => {
    switch (status) {
      case 'all': {
        return (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L3.5 6.5L1 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      }
      case 'on-track': {
        return <circle cx="5" cy="5" r="5" fill="#007A5A" />
      }
      case 'off-track': {
        return <circle cx="5" cy="5" r="5" fill="#DC2626" />
      }
      case 'at-risk': {
        return <circle cx="5" cy="5" r="5" fill="#E97911" />
      }
      case 'on-hold': {
        return <circle cx="5" cy="5" r="5" fill="#2563EB" />
      }
      case 'complete': {
        return (
          <>
            <circle cx="5" cy="5" r="5" fill="#007A5A" />
            <path d="M7 3.75L4.25 6.95833L3 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      }

      default: {
        return <circle cx="5" cy="5" r="4.5" fill="#F8FAFC" stroke="#94A3B8" />
      }
    }
  }

  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      {projectStatus()}
    </svg>
  )
}
