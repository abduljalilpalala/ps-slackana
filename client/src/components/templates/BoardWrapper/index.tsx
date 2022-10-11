import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const BoardWrapper: FC<Props> = ({ children }): JSX.Element => {
  return (
    <main className="flex w-full flex-1 space-x-4 overflow-x-auto bg-slate-50 px-4 py-5">
      {children}
    </main>
  )
}

export default BoardWrapper
