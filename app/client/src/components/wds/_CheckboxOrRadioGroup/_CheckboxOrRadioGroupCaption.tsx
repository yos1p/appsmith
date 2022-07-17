import React from "react";

import { Slot } from "./slots";
import { CheckboxOrRadioGroupContext } from "./CheckboxOrRadioGroup";

const CheckboxOrRadioGroupCaption: React.FC<Record<string, never>> = ({
  children,
}) => (
  <Slot name="Caption">
    {({ captionId, disabled }: CheckboxOrRadioGroupContext) => (
      <p color={disabled ? "fg.muted" : "fg.subtle"} id={captionId}>
        {children}
      </p>
    )}
  </Slot>
);

export default CheckboxOrRadioGroupCaption;
