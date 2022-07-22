import React, {
  useMemo,
  forwardRef,
  useLayoutEffect,
  InputHTMLAttributes,
  ChangeEventHandler,
  CSSProperties,
  useContext,
} from "react";

import { darkenColor } from "widgets/WidgetUtils";
import { CheckboxGroupContext } from "../CheckboxGroup";
import { useProvidedRefOrCreate } from "../hooks/useProvidedRefOrCreate";

import styles from "./styles.module.css";

type ToggleSwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  accentColor?: string;
  radii?: string;
  indeterminate?: boolean;
  hasError?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string;
} & Exclude<InputHTMLAttributes<HTMLInputElement>, "value">;

const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  (
    {
      accentColor,
      checked,
      className,
      disabled,
      hasError,
      indeterminate,
      onChange,
      radii,
      value,
      ...rest
    },
    ref,
  ) => {
    const toggleSwitchRef = useProvidedRefOrCreate(
      ref as React.RefObject<HTMLInputElement>,
    );

    /**
     * indeterminate state can be set with javascript only, so here we are
     * setting the state with useLayoutEffect
     */
    useLayoutEffect(() => {
      if (toggleSwitchRef.current) {
        toggleSwitchRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checked, toggleSwitchRef]);

    const checkboxGroupContext = useContext(CheckboxGroupContext);

    /**
     *  handleOnChange is the handler for the onChange event
     *
     * @param e event
     */
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      checkboxGroupContext.onChange && checkboxGroupContext.onChange(e);
      onChange && onChange(e);
    };

    const cssVariables = useMemo(
      () =>
        ({
          "--wds-color-accent": accentColor,
          "--wds-color-accent-hover": darkenColor(accentColor),
          "--wds-radii": radii,
        } as CSSProperties),
      [radii, accentColor],
    );

    return (
      <input
        aria-disabled={disabled ? "true" : "false"}
        aria-invalid={hasError ? "true" : "false"}
        checked={indeterminate ? false : checked}
        className={styles.input}
        disabled={disabled}
        name={value}
        onChange={handleOnChange}
        ref={toggleSwitchRef}
        style={cssVariables}
        type="checkbox"
        value={value}
        {...rest}
      />
    );
  },
);

export { ToggleSwitch };
