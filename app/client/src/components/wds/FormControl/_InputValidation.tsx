import React from "react";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";

type Props = {
  id: string;
  validationStatus?: FormValidationStatus;
};

const InputValidation: React.FC<Props> = ({
  children,
  id,
  validationStatus,
}) => {
  return (
    <p>
      <span id={id}>{children}</span>
    </p>
  );
};

export default InputValidation;
