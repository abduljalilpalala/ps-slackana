import React, { FC, ReactNode, memo } from 'react'

type Props = {
  children: ReactNode
  text: string
}

const Tooltip: FC<Props> = memo((props): JSX.Element => {
  return (
    <span className="group-tooltip relative">
      <span
        className={`
          pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2.5 py-2 text-xs 
          font-semibold text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 
          before:border-4 before:border-transparent before:border-t-black before:content-[''] group-tooltip-hover:opacity-100
      `}
      >
        {props.text}
      </span>
      {props.children}
    </span>
  )
})

export default Tooltip
