import React from "react";
import { Spinner } from "~/shared/icons/SpinnerIcon";
import { styles } from '~/shared/twin/auth.styles'

type SubmitButtonType = {
  submitted: () => void;
  isSubmitting: boolean;
  text: string
}

const SubmitButton = ({ submitted, isSubmitting, text = "Submit" }: SubmitButtonType) => {
  return (
    <button onClick={submitted} type="submit" css={styles.form_submit} disabled={isSubmitting}>
      {isSubmitting ? <Spinner className="h-5 w-5" /> : text}
    </button>
  );
};

export default SubmitButton;
