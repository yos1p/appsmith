import React from "react";
import InputCaption from "./_InputCaption";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

const FormControlCaption: React.FC<{ id?: string }> = ({ children, id }) => (
  <Slot name="Caption">
    {({ captionId, disabled }: FormControlContext) => (
      <InputCaption disabled={disabled} id={id || captionId}>
        {children}
      </InputCaption>
    )}
  </Slot>
);

export default FormControlCaption;
