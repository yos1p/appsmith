import clsx from "clsx";
import React, { forwardRef } from "react";
import { createPolymorphicComponent } from "@mantine/utils";
import { Box } from "../Box";
import { InputWrapper } from "./InputWrapper/InputWrapper";

import { InputLabel } from "./InputLabel/InputLabel";
import { InputError } from "./InputError/InputError";

import styles from "./styles.module.css";
import InputInnerVisualSlot from "./_InputInnerVisualSlot";

export type InputVariant = "default" | "filled" | "unstyled";

export interface InputSharedProps {
  /** Adds icon on the left side of input */
  icon?: React.ReactNode;

  /** Width of icon section in px */
  iconWidth?: number;

  loaderPosition?: "auto" | "leading" | "trailing";

  /** Adds icon on the right side of input */
  trailingVisual?: React.ReactNode;

  /** Adds icon on the left side of input */
  leadingVisual?: React.ReactNode;

  /** Properties spread to root element */
  wrapperProps?: Record<string, any>;

  /** Sets required on input element */
  required?: boolean;

  /** Input border-radius from theme or number to set border-radius in px */
  radius?: string;

  /** Defines input appearance, defaults to default in light color scheme and filled in dark */
  variant?: InputVariant;

  /** Disabled input state */
  isDisabled?: boolean;

  /** Class for input */
  className?: string;

  isLoading?: boolean;
}

export interface InputProps extends InputSharedProps {
  /** Static css selector base */
  __staticSelector?: string;

  /** Sets border color to red and aria-invalid=true on input element */
  invalid?: boolean;

  /** Will input have multiple lines? */
  multiline?: boolean;

  /** Determines whether cursor on input should be pointer */
  pointer?: boolean;
}

export const _Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    icon,
    iconWidth,
    invalid,
    isDisabled: disabled,
    isLoading: loading,
    leadingVisual,
    loaderPosition = "auto",
    multiline,
    pointer,
    radius,
    required,
    trailingVisual,
    variant = "filled",
    wrapperProps,
    ...others
  } = props;

  const showLeadingLoadingIndicator =
    loading &&
    (loaderPosition === "leading" ||
      Boolean(leadingVisual && loaderPosition !== "trailing"));
  const showTrailingLoadingIndicator =
    loading &&
    (loaderPosition === "trailing" ||
      Boolean(loaderPosition === "auto" && !leadingVisual));

  return (
    <Box
      className={clsx(styles.container, {
        [styles.withIcon]: icon,
        [styles.invalid]: invalid,
        [styles.disabled]: disabled,
      })}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <InputInnerVisualSlot
        hasLoadingIndicator={
          typeof loading === "boolean" && Boolean(showLeadingLoadingIndicator)
        }
        showLoadingIndicator={showLeadingLoadingIndicator}
        visualPosition="leading"
      >
        {leadingVisual}
      </InputInnerVisualSlot>

      <Box
        component="input"
        {...others}
        aria-invalid={invalid}
        className={clsx(styles.input)}
        disabled={disabled}
        ref={ref}
        required={required}
      />

      <InputInnerVisualSlot
        hasLoadingIndicator={
          typeof loading === "boolean" && Boolean(showTrailingLoadingIndicator)
        }
        showLoadingIndicator={showTrailingLoadingIndicator}
        visualPosition="trailing"
      >
        {trailingVisual}
      </InputInnerVisualSlot>
    </Box>
  );
}) as any;

_Input.displayName = "@mantine/core/Input";
_Input.Wrapper = InputWrapper;
_Input.Label = InputLabel;
_Input.Error = InputError;

export const Input = createPolymorphicComponent<
  "input",
  InputProps,
  {
    Wrapper: typeof InputWrapper;
    Label: typeof InputLabel;
    Error: typeof InputError;
  }
>(_Input);
