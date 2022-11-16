import React from 'react'

import { styles } from '~/shared/twin/home-content.style'

type Props = {
  set: (value: boolean) => void
  what: boolean
}

const SeeMore: React.FC<Props> = ({ set, what }) => {
  return (
    <div onClick={() => set(!what)} css={styles.more}>
      <span className="text-sm text-slate-500 hover:text-slate-600">
        Show {what ? 'less' : 'more'}
      </span>
    </div>
  )
}

export default SeeMore
