import React from 'react'

export interface IconName {
  className?: string
}

export const ThreeDot: React.FC<IconName> = ({ className }): JSX.Element => {
  return (
    <svg className={className} width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#0F172A" />
      <circle cx="8.5" cy="1.5" r="1.5" fill="#0F172A" />
      <circle cx="14.5" cy="1.5" r="1.5" fill="#0F172A" />
    </svg>
  )
}
