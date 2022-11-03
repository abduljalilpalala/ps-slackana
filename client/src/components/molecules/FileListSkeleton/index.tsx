import React, { FC } from 'react'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

type FileSkeletonProps = {
  length: number
}

const FileListSkeleton: FC<FileSkeletonProps> = ({ length }): JSX.Element => {
  return (
    <table className="w-full divide-y divide-slate-300 border-t border-slate-300 text-left text-sm leading-normal">
      <thead>
        <tr className="bg-slate-50">
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
            Filename
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
            Size
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-300 text-sm text-slate-600">
        {Array.from({ length }, (_, i) => (
          <tr key={i}>
            <td className="whitespace-nowrap px-6 py-4">
              <LineSkeleton />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <LineSkeleton />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <LineSkeleton />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <LineSkeleton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FileListSkeleton
