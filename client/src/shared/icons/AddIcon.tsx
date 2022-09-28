import React from 'react'

export interface IconName {
  className?: string
}

export const Add: React.FC<IconName> = ({ className }): JSX.Element => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6.91357" y="0.651367" width="1.90947" height="15.6718" fill="#6D6E6F" />
      <rect x="0.230469" y="9.4668" width="1.95897" height="15.2757" transform="rotate(-90 0.230469 9.4668)" fill="#6D6E6F" />
    </svg>

  )
}
