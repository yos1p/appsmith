import React from "react";
import InputLabel, { InputLabelProps } from "./_InputLabel";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

export type Props = Pick<
  InputLabelProps,
  "textAlign" | "fontSize" | "visuallyHidden" | "fontWeight"
>;

const FormControlLabel: React.FC<{ htmlFor?: string } & Props> = ({
  children,
  fontSize = "1rem",
  fontWeight,
  htmlFor,
  textAlign,
  visuallyHidden,
}) => (
  <Slot name="Label">
    {({ disabled, id, required }: FormControlContext) => (
      <InputLabel
        disabled={disabled}
        fontSize={fontSize}
        fontWeight={fontWeight}
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
