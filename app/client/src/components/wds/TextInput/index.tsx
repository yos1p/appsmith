import classnames from "classnames";
import React, { MouseEventHandler, useCallback, useState } from "react";

import TextInputInnerVisualSlot from "./_TextInputInnerVisualSlot";
import { useProvidedRefOrCreate } from "../hooks/useProvidedRefOrCreate";
import { Merge } from "../utils/types/Merge";

import styles from "./styles.module.css";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";
import clsx from "clsx";

export type TextInputNonPassthroughProps = {
  /** @deprecated Use `leadingVisual` or `trailingVisual` prop instead */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether the to show a loading indicator in the input */
  loading?: boolean;
  /**
   * Which position to render the loading indicator
   * 'auto' (default): at the end of the input, unless a `leadingVisual` is passed. Then, it will render at the beginning
   * 'leading': at the beginning of the input
   * 'trailing': at the end of the input
   **/
  loaderPosition?: "auto" | "leading" | "trailing";
  /**
   * A visual that renders inside the input before the typing area
   */
  leadingVisual?: React.ReactNode;
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingVisual?: React.ReactNode;
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingAction?: React.ReactElement<React.HTMLProps<HTMLButtonElement>>;

  validationStatus?: FormValidationStatus;
};

export type TextInputProps = Merge<
  React.ComponentPropsWithoutRef<"input">,
  TextInputNonPassthroughProps
>;

// using forwardRef is important so that other components (ex. SelectMenu) can autofocus the input
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      disabled,
      icon: IconComponent,
      leadingVisual: LeadingVisual,
      loaderPosition,
      loading,
      onBlur,
      onFocus,
      size: sizeProp,
      trailingAction,
      // start deprecated props
      trailingVisual: TrailingVisual,
      validationStatus,
      width: widthProp,
      // end deprecated props
      ...inputProps
    },
    ref,
  ) => {
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const inputRef = useProvidedRefOrCreate(
      ref as React.RefObject<HTMLInputElement>,
    );
    // this class is necessary to style FilterSearch, plz no touchy!
    const showLeadingLoadingIndicator =
      loading &&
      (loaderPosition === "leading" ||
        Boolean(LeadingVisual && loaderPosition !== "trailing"));
    const showTrailingLoadingIndicator =
      loading &&
      (loaderPosition === "trailing" ||
        Boolean(loaderPosition === "auto" && !LeadingVisual));
    const focusInput: MouseEventHandler = () => {
      inputRef.current?.focus();
    };
    const handleInputFocus = useCallback(
      (e) => {
        setIsInputFocused(true);
        onFocus && onFocus(e);
      },
      [onFocus],
    );
    const handleInputBlur = useCallback(
      (e) => {
        setIsInputFocused(false);
        onBlur && onBlur(e);
      },
      [onBlur],
    );

    return (
      <span
        aria-busy={Boolean(loading)}
        aria-live="polite"
        className={clsx(
          className,
          styles.base,
          LeadingVisual && styles["with-leading-visual"],
          TrailingVisual && styles["with-trailing-visual"],
          trailingAction && styles["with-trailing-action"],
          disabled && styles.disabled,
        )}
        onClick={focusInput}
      >
        {IconComponent && <IconComponent className="TextInput-icon" />}
        <TextInputInnerVisualSlot
          hasLoadingIndicator={
            typeof loading === "boolean" && Boolean(showLeadingLoadingIndicator)
          }
          showLoadingIndicator={showLeadingLoadingIndicator}
          visualPosition="leading"
        >
          {LeadingVisual}
        </TextInputInnerVisualSlot>
        <input
          className={styles.unstyled}
          disabled={disabled}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          ref={inputRef}
          {...inputProps}
          data-component="input"
        />
        <TextInputInnerVisualSlot
          hasLoadingIndicator={
            typeof loading === "boolean" &&
            Boolean(showTrailingLoadingIndicator)
          }
          showLoadingIndicator={showTrailingLoadingIndicator}
          visualPosition="trailing"
        >
          {TrailingVisual}
        </TextInputInnerVisualSlot>
        {trailingAction}
      </span>
    );
  },
);

TextInput.defaultProps = {
  type: "text",
  loaderPosition: "auto",
};

TextInput.displayName = "TextInput";

export default TextInput;
