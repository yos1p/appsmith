import React from "react";
import InputValidation from "../FormControl/_InputValidation";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";
import { CheckboxOrRadioGroupContext } from "./CheckboxOrRadioGroup";
import { Slot } from "./slots";

export type CheckboxOrRadioGroupValidationProps = {
  /** Changes the visual style to match the validation status */
  variant: FormValidationStatus;
};

const CheckboxOrRadioGroupValidation: React.FC<CheckboxOrRadioGroupValidationProps> = ({
  children,
  variant,
}) => (
  <Slot name="Validation">
    {({ validationMessageId = "" }: CheckboxOrRadioGroupContext) => (
      <InputValidation id={validationMessageId} validationStatus={variant}>
        {children}
      </InputValidation>
    )}
  </Slot>
);

export default CheckboxOrRadioGroupValidation;
