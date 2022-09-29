import React from 'react'

type Props = {
  className?: string;
  color?: string;
}

export const CheckIcon: React.FC<Props> = ({ className, color = "#F8FAFC" }): JSX.Element => {
  return (
    <svg className={className} width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33317 1.5L3.74984 6.08333L1.6665 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
