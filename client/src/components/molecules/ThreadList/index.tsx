import React, { FC } from 'react'

import Tooltip from '~/components/templates/Tooltip'
import MessageOptionDropdown from './../MessageOptionDropdown'

type Props = {}

const ThreadList: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex flex-col">
      <section className="mt-2 flex items-start space-x-2 px-4 py-2 transition duration-75 ease-in-out">
        <header className="flex-shrink-0">
          <img
            src="https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-32"
            className="h-8 w-8 rounded-md"
            alt=""
          />
        </header>
        <main className="text-sm text-slate-900">
          <header className="flex items-end space-x-2">
            <h3 className="font-bold line-clamp-1">Abdul Jalil (AJ)</h3>
            <p className="text-xs text-slate-500 line-clamp-1">Sept. 29 2022 3:01 PM</p>
          </header>
          <section>
            <p className="font-normal leading-6">
              I have merged the PR below. Please update your develop branch in you local machine and
              rebase as well
            </p>
          </section>
        </main>
      </section>
      <Divider />
      <section className="group-message relative flex items-start space-x-2 px-6 py-2 transition duration-75 ease-in-out hover:bg-slate-100">
        <header className="flex-shrink-0">
          <img
            src="https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-32"
            className="h-8 w-8 rounded-md"
            alt=""
          />
        </header>
        <main className="text-sm text-slate-900">
          <header className="flex items-end space-x-2">
            <h3 className="font-bold line-clamp-1">John Paul Banera</h3>
            <p className="text-xs text-slate-500 line-clamp-1">Sept. 30 2022 11:50 AM</p>
          </header>
          <section>
            <p className="font-normal leading-6">
              just ping me lang mga sir if need mag meet sa gather, inaalis ko kasi headset ko
              sumasakit kasi ulo ko pag laging nakasuot.
            </p>
          </section>
        </main>
        <aside
          className={`
              absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
              border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
            `}
        >
          <Tooltip text="Options">{/* <MessageOptionDropdown /> */}</Tooltip>
        </aside>
      </section>
    </div>
  )
}

function Divider() {
  return (
    <div className="px-6 py-3">
      <div className="relative flex items-center border-b border-slate-200">
        <span className="absolute bg-white pr-2 text-xs font-medium text-slate-500">1 reply</span>
      </div>
    </div>
  )
}

export default ThreadList
