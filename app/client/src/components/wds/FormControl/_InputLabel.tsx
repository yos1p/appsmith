import React, { CSSProperties } from "react";
import cx from "clsx";

import VisuallyHidden from "../_VisuallyHidden";

import styles from "./styles.module.css";

interface Props extends React.HTMLProps<HTMLLabelElement> {
  disabled?: boolean;
  required?: boolean;
  visuallyHidden?: boolean;
  textAlign?: "left" | "center" | "right";
}

const InputLabel: React.FC<Props> = ({
  children,
  disabled,
  htmlFor,
  required,
  textAlign = "left",
  visuallyHidden,
}) => {
  const cssVariables = {
    "--cursor": disabled ? "default" : "pointer",
    "--text-align": textAlign,
  } as CSSProperties;

  return (
    <VisuallyHidden
      asChild
      className={styles.label}
      isVisible={!visuallyHidden}
      style={cssVariables}
    >
      <label htmlFor={htmlFor}>
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
  );
};

export default InputLabel;
