import cx from "clsx";
import React, { forwardRef, Fragment } from "react";

import { InputError } from "../InputError/InputError";
import { InputLabel } from "../InputLabel/InputLabel";

import styles from "./styles.module.css";

export interface InputWrapperBaseProps {
  /** Input label, displayed before input */
  label?: React.ReactNode;

  /** Input description, displayed after label */
  description?: React.ReactNode;

  /** Displays error message after input */
  error?: React.ReactNode;

  /** Adds required attribute to the input and red asterisk on the right side of label */
  required?: boolean;

  /** Determines whether required asterisk should be rendered, overrides required prop, does not add required attribute to the input */
  withAsterisk?: boolean;

  /** Props spread to label element */
  labelProps?: Record<string, any>;

  /** Props spread to description element */
  descriptionProps?: Record<string, any>;

  /** Props spread to error element */
  errorProps?: Record<string, any>;

  /** Input container component, defaults to React.Fragment */
  inputContainer?(children: React.ReactNode): React.ReactNode;

  /** Controls order of the Input.Wrapper elements */
  inputWrapperOrder?: ("label" | "input" | "description" | "error")[];

  labelPosition?: "top" | "left";
}

export interface InputWrapperProps
  extends InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<"div"> {
  /** Input that should be wrapped */
  children: React.ReactNode;

  /** htmlFor label prop */
  id?: string;

  /** Render label as label with htmlFor or as div */
  labelElement?: "label" | "div";
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
  (props, ref) => {
    const {
      children,
      description,
      descriptionProps,
      error,
      errorProps,
      id,
      inputContainer = (children) => children,
      inputWrapperOrder = ["label", "description", "input", "error"],
      label,
      labelProps,
      required,
      withAsterisk,
      labelPosition = "top",
      ...others
    } = props;

    const isRequired =
      typeof withAsterisk === "boolean" ? withAsterisk : required;

    const _label = label && (
      <InputLabel
        htmlFor={id}
        id={id ? `${id}-label` : undefined}
        key="label"
        {...labelProps}
      >
        {isRequired && (
          <span aria-hidden className="is-required">
            {" *"}
          </span>
        )}
        {label}
      </InputLabel>
    );

    const _description = description && (
      <p key="description" {...descriptionProps}>
        {description}
      </p>
    );

    const _input = <Fragment key="input">{inputContainer(children)}</Fragment>;

    const _error = typeof error !== "boolean" && error && (
      <InputError {...errorProps} key="error">
        {error}
      </InputError>
    );

    const content = inputWrapperOrder.map((part) => {
      switch (part) {
        case "input":
          return _input;
        case "label":
          return _label;
        case "description":
          return _description;
        case "error":
          return _error;
        default:
          return null;
      }
    });

    const computedClassnames = cx({
      [styles.wrapper]: true,
      [styles.vertical]: labelPosition === "top",
      [styles.horizontal]: labelPosition !== "top",
    });

    return (
      <div ref={ref} {...others} className={computedClassnames}>
        {content}
      </div>
    );
  },
);

InputWrapper.displayName = "@mantine/core/InputWrapper";
