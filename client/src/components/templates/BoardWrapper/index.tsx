import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const BoardWrapper: FC<Props> = ({ children }): JSX.Element => {
  return (
    <main className="relative flex w-full flex-1 overflow-x-auto bg-slate-50 px-4 py-3">
      {children}
    </main>
  )
}

export default BoardWrapper
