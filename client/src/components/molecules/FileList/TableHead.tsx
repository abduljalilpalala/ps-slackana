import React, { FC } from 'react'

import SortIcon from '~/shared/icons/SortIcon'

type Props = {}

const TableHead: FC<Props> = (): JSX.Element => {
  return (
    <thead className="text-slate-700">
      <tr>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            Filename
            <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            Size
            <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            Type
            <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="line-clamp-1">Date Upload</span>
            <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">Actions</th>
      </tr>
    </thead>
  )
}

export default TableHead
