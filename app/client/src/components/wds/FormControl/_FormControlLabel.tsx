import React from "react";
import InputLabel from "./_InputLabel";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

export type Props = {
  /**
   * Whether the label should be visually hidden
   */
  visuallyHidden?: boolean;
  /**
   * text align for form control label
   */
  textAlign?: "left" | "center" | "right";
};

const FormControlLabel: React.FC<{ htmlFor?: string } & Props> = ({
  children,
  htmlFor,
  textAlign,
  visuallyHidden,
}) => (
  <Slot name="Label">
    {({ disabled, id, required }: FormControlContext) => (
      <InputLabel
        disabled={disabled}
        htmlFor={htmlFor || id}
        required={required}
        textAlign={textAlign}
        visuallyHidden={visuallyHidden}
      >
        {children}
      </InputLabel>
    )}
  </Slot>
);

export default FormControlLabel;
