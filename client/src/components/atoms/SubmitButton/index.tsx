import React from "react";

import { Spinner } from "~/shared/icons/SpinnerIcon";
import { styles } from '~/shared/twin/auth.styles'

type Props = {
  submitted: () => void;
  isSubmitting: boolean;
  text?: string;
  className?: string;
  isDisabled?: boolean;
}

const SubmitButton: React.FC<Props> = ({ submitted, isSubmitting, text = "Submit", className = "", isDisabled }) => {
  return (
    <button
      type="submit"
      onClick={submitted}
      css={styles.form_submit}
      className={`${isDisabled && "!cursor-not-allowed"} ${className}`}
      disabled={isSubmitting || isDisabled}
    >
      {isSubmitting ? <Spinner className="h-5 w-5" /> : text}
    </button>
  );
};

export default SubmitButton;
