import React, { CSSProperties } from "react";
import { FormControlContext } from "./FormControl";
import { Slot } from "./slots";

import VisuallyHidden from "../_VisuallyHidden";

import styles from "./styles.module.css";

export interface Props extends React.HTMLProps<HTMLLabelElement> {
  disabled?: boolean;
  required?: boolean;
  visuallyHidden?: boolean;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: "normal" | "bold" | "lighter" | "bolder";
  color?: string;
  minWidth?: string;
  fontStyle?: "normal" | "italic";
  direction?: "top" | "left" | "right" | "auto";
}

const FormControlLabel: React.FC<{ htmlFor?: string } & Props> = ({
  children,
  color,
  disabled,
  fontSize = "0.875rem",
  fontStyle = "normal",
  fontWeight,
  htmlFor,
  minWidth = "min-content",
  textAlign,
  visuallyHidden,
}) => {
  const cssVariables = {
    "--label-cursor": disabled ? "default" : "pointer",
    "--label-text-align": textAlign,
    "--label-font-size": fontSize,
    "--label-font-weight": fontWeight,
    "--label-color": color,
    "--label-min-width": minWidth,
    "--label-font-style": fontStyle,
  } as CSSProperties;
  return (
    <Slot name="Label">
      {({ id, required }: FormControlContext) => (
        <VisuallyHidden
          asChild
          className={styles.label}
          isVisible={!visuallyHidden}
          style={cssVariables}
        >
          <label htmlFor={htmlFor || id}>
            {required ? (
              <span className="flex">
                <div className="mr-1">{children}</div>
                <span aria-hidden="true">*</span>
              </span>
            ) : (
              children
            )}
          </label>
        </VisuallyHidden>
      )}
    </Slot>
  );
};

export default FormControlLabel;
