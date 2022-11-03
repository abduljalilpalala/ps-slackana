import React from 'react'

export const BlankSlateTableIcon: React.FC = (): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      height={24}
      viewBox="0 0 24 24"
      version="1.1"
      width={24}
      data-view-component="true"
      className="octicon octicon-table blankslate-icon"
    >
      <path
        fillRule="evenodd"
        d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75zM3.5 9v11.25c0 .138.112.25.25.25H7.5V9h-4zm4-1.5h-4V3.75a.25.25 0 01.25-.25H7.5v4zM9 9v11.5h11.25a.25.25 0 00.25-.25V9H9zm11.5-1.5H9v-4h11.25a.25.25 0 01.25.25V7.5z"
      />
    </svg>
  )
}
