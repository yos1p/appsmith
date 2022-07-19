import React from "react";
import InputLabel, { InputLabelProps } from "./_InputLabel";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

export type Props = Pick<
  InputLabelProps,
  | "textAlign"
  | "fontSize"
  | "visuallyHidden"
  | "fontWeight"
  | "color"
  | "minWidth"
>;

const FormControlLabel: React.FC<{ htmlFor?: string } & Props> = ({
  children,
  color,
  fontSize = "1rem",
  fontWeight,
  htmlFor,
  minWidth = "min-content",
  textAlign,
  visuallyHidden,
}) => (
  <Slot name="Label">
    {({ disabled, id, required }: FormControlContext) => (
      <InputLabel
        color={color}
        disabled={disabled}
        fontSize={fontSize}
        fontWeight={fontWeight}
        htmlFor={htmlFor || id}
        minWidth={minWidth}
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
