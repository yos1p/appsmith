import React from "react";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";
import InputValidation from "./_InputValidation";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

export type FormControlValidationProps = {
  variant: FormValidationStatus;
  id?: string;
};

const FormControlValidation: React.FC<FormControlValidationProps> = ({
  children,
  id,
  variant,
}) => (
  <Slot name="Validation">
    {({ validationMessageId }: FormControlContext) => (
      <InputValidation
        id={id || validationMessageId}
        validationStatus={variant}
      >
        {children}
      </InputValidation>
    )}
  </Slot>
);

export default FormControlValidation;
