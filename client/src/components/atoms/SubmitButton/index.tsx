import React from "react";
import { Spinner } from "~/shared/icons/SpinnerIcon";
import { styles } from '~/shared/twin/auth.styles'

type Props = {
  submitted: () => void;
  isSubmitting: boolean;
  text?: string;
  className?: string;
}

const SubmitButton: React.FC<Props> = ({ submitted, isSubmitting, text = "Submit", className = "" }) => {
  return (
    <button onClick={submitted} type="submit" css={styles.form_submit} disabled={isSubmitting} className={className}>
      {isSubmitting ? <Spinner className="h-5 w-5" /> : text}
    </button>
  );
};

export default SubmitButton;
