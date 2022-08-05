import clsx from "clsx";
import React, { useMemo } from "react";
import TextInput from "../TextInput";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";
import styles from "./styles.module.css";

export type InputGroupProps = {
  children?: React.ReactNode;
  /**
   * Whether the control allows user input
   */
  disabled?: boolean;
  /**
   * The unique identifier for this control. Used to associate the label, validation text, and caption text
   */
  id?: string;
  /**
   * If true, the user must specify a value for the input before the owning form can be submitted
   */
  required?: boolean;
  /**
   * The direction the content flows.
   * Vertical layout is used by default, and horizontal layout is used for checkbox and radio inputs.
   */
  layout?: "horizontal" | "vertical";

  /**
   * additinal class to pass to the input group
   */
  className?: string;

  /**
   * The status of the form control
   */
  validationStatus?: FormValidationStatus;

  "aria-describedby"?: string;
};

const InputGroup: React.FC<InputGroupProps> = ({
  "aria-describedby": ariaDescribedBy,
  children,
  className,
  disabled,
  id,
  required,
  validationStatus,
  ...rest
}) => {
  const expectedInputComponents = [TextInput];

  return (
    <div className={clsx(styles["input-group"], className)}>
      {React.Children.toArray(children).map((child) => {
        if (
          React.isValidElement(child) &&
          expectedInputComponents.some(
            (inputComponent) => child.type === inputComponent,
          )
        ) {
          return React.cloneElement(child, {
            id,
            required,
            disabled,
            validationStatus,
            ["aria-describedby"]: ariaDescribedBy,
            ...child.props,
          });
        }

        return child;
      })}
    </div>
  );
};

export { InputGroup };
