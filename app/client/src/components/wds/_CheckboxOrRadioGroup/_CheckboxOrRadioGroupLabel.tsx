import cx from "clsx";
import React, { CSSProperties } from "react";

import { Slot } from "./slots";
import VisuallyHidden from "../_VisuallyHidden";
import { CheckboxOrRadioGroupContext } from "./CheckboxOrRadioGroup";

import styles from "./styles.module.css";

export type CheckboxOrRadioGroupLabelProps = {
  /**
   * Whether to visually hide the fieldset legend
   */
  visuallyHidden?: boolean;
  /**
   * Adds class names to the label
   */
  className?: string;
  /**
   * Adds font weight to the label
   */
  fontWeight?: "normal" | "bold" | "lighter" | "bolder";
  /**
   * Adds text alignment to the label
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Adds min width
   */
  minWidth?: string;
  /**
   * Adds font size
   */
  fontSize?: string;
};

const CheckboxOrRadioGroupLabel: React.FC<CheckboxOrRadioGroupLabelProps> = ({
  children,
  className,
  fontSize = "1rem",
  fontWeight = "normal",
  minWidth = "min-content",
  textAlign = "left",
  visuallyHidden,
}) => {
  return (
    <Slot name="Label">
      {({ disabled, required }: CheckboxOrRadioGroupContext) => {
        const cssProperties = {
          "--label-color": disabled ? "red" : undefined,
          "--label-font-weight": fontWeight,
          "--label-min-width": minWidth,
          "--label-text-align": textAlign,
          "--label-font-size": fontSize,
        } as CSSProperties;

        return (
          <VisuallyHidden
            className={cx(styles.label, className)}
            isVisible={!visuallyHidden}
            style={cssProperties}
            title={required ? "required field" : undefined}
          >
            {required ? (
              <span>
                <div>{children}</div>
                <span>*</span>
              </span>
            ) : (
              children
            )}
          </VisuallyHidden>
        );
      }}
    </Slot>
  );
};

CheckboxOrRadioGroupLabel.defaultProps = {
  visuallyHidden: false,
};

export default CheckboxOrRadioGroupLabel;
