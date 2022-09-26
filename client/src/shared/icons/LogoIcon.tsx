import React, { FC } from 'react'

type Props = {
  className?: string
}

const LogoIcon: FC<Props> = (props): JSX.Element => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="11.9048"
        y="7.14282"
        width="4.76191"
        height="11.9048"
        transform="rotate(90 11.9048 7.14282)"
        fill="#36C5F0"
      />
      <rect x="7.14282" y="1.19043" width="4.7619" height="4.7619" fill="#2EB67D" />
      <rect x="13.0952" width="4.7619" height="11.9048" fill="#2EB67D" />
      <rect x="19.0476" y="7.14282" width="4.7619" height="4.7619" fill="#ECB22E" />
      <rect
        x="25"
        y="13.0952"
        width="4.76191"
        height="11.9048"
        transform="rotate(90 25 13.0952)"
        fill="#ECB22E"
      />
      <rect x="13.0952" y="19.0476" width="4.7619" height="4.7619" fill="#E01E5A" />
      <rect x="7.14282" y="13.0952" width="4.7619" height="11.9048" fill="#E01E5A" />
      <rect x="1.19043" y="13.0952" width="4.7619" height="4.7619" fill="#36C5F0" />
    </svg>
  )
}

export default LogoIcon
