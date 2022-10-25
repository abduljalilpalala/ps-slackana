import React, { FC } from 'react'

type Props = {}

const AvatarList: FC<Props> = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center py-5 opacity-70">
      <div className="flex -space-x-4">
        <img
          className="h-10 w-10 rounded-full border-2 border-white"
          src="https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-32"
          alt=""
        />
        <img
          className="h-10 w-10 rounded-full border-2 border-white"
          src="https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-32"
          alt=""
        />
        <img
          className="h-10 w-10 rounded-full border-2 border-white"
          src="https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-32"
          alt=""
        />
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs font-medium text-white hover:bg-gray-600"
          href="#"
        >
          +3
        </a>
      </div>
      <h1 className="py-3 text-sm font-medium text-slate-400">Team 6 Digits</h1>
    </div>
  )
}

export default AvatarList
