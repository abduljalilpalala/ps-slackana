import React, { FC } from 'react'

import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

const PaginationSkeleton: FC = (): JSX.Element => {
  return (
    <section className="paginate-section text-gray-500">
      <div className="inline-flex -space-x-px text-sm">
        <div className="paginate-link rounded-l-md">
          <LineSkeleton />
        </div>
        <div className="paginate-link">
          <LineSkeleton />
        </div>
        <div className="paginate-link rounded-l-md">
          <LineSkeleton />
        </div>
      </div>
    </section>
  )
}

export default PaginationSkeleton
