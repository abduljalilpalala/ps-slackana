import React from "react";

import { styles } from '~/shared/twin/home-content.style'

type Props = {
  set: (value: boolean) => void,
  what: boolean
}

const SeeMore: React.FC<Props> = ({ set, what }) => {
  return (
    <div onClick={() => set(!what)} css={styles.more}>
      <span>Show {what ? 'less' : 'more'}</span>
    </div>
  );
};

export default SeeMore;
