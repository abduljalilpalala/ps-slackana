import React from 'react'

type Props = {
  className?: string;
  isActive?: boolean;
}

export const ActiveStatus: React.FC<Props> = ({ className, isActive = true }): JSX.Element => {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" fill={isActive ? "#007A5A" : "#94A3B8"} />
    </svg>
  )
}
