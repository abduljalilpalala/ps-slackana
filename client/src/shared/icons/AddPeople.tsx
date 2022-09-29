import React from 'react'

type Props = {
  className?: string;
  color?: string;
}

export const AddPeople: React.FC<Props> = ({ className, color = "#F8FAFC" }): JSX.Element => {
  return (
    <svg className={className} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.91705" cy="4.47222" r="3.47222" stroke={color} />
      <rect x="11.9729" y="7.36111" width="0.722222" height="5.05556" fill={color} stroke={color} strokeWidth="0.722222" />
      <rect x="9.80594" y="10.25" width="0.722222" height="5.05556" transform="rotate(-90 9.80594 10.25)" fill={color} stroke={color} strokeWidth="0.722222" />
      <rect x="0.958876" y="12.9583" width="9.02778" height="0.361111" fill={color} stroke={color} strokeWidth="0.361111" />
      <path d="M6.55632 8.08334L2.73833 9.84549C2.17097 10.1073 1.70962 10.5545 1.43017 11.1134V11.1134C1.23912 11.4955 1.13965 11.9169 1.13965 12.3441V13.1389" stroke={color} strokeLinecap="round" />
    </svg>

  )
}
