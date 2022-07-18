import React, {
  useMemo,
  forwardRef,
  useLayoutEffect,
  InputHTMLAttributes,
  ChangeEventHandler,
  CSSProperties,
  useContext,
} from "react";
import CheckIcon from "remixicon-react/CheckLineIcon";
import SubtractIcon from "remixicon-react/SubtractLineIcon";

import { darkenColor } from "widgets/WidgetUtils";
import { CheckboxGroupContext } from "../CheckboxGroup";
import { useProvidedRefOrCreate } from "../hooks/useProvidedRefOrCreate";
import { useProvidedStateOrCreate } from "../hooks/useProvidedStateOrCreate";

import styles from "./styles.module.css";

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  accentColor?: string;
  radii?: string;
  indeterminate?: boolean;
  hasError?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string;
  defaultChecked?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
} & Exclude<InputHTMLAttributes<HTMLInputElement>, "value">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      accentColor,
      checked,
      children,
      className,
      defaultChecked,
      disabled,
      hasError,
      indeterminate,
      radii,
      onChange,
      value,
      icon = <CheckIcon />,
      ...rest
    },
    ref,
  ) => {
    const checkboxRef = useProvidedRefOrCreate(
      ref as React.RefObject<HTMLInputElement>,
    );

    /**
     * indeterminate state can be set with javascript only, so here we are
     * setting the state with useLayoutEffect
     */
    useLayoutEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checked, checkboxRef]);

    const checkboxGroupContext = useContext(CheckboxGroupContext);
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

    console.log({ icon });

    return (
      <div className={styles.container}>
        <input
          aria-disabled={disabled ? "true" : "false"}
          aria-invalid={hasError ? "true" : "false"}
          checked={indeterminate ? false : checked}
          className={styles.input}
          disabled={disabled}
          name={value}
          onChange={handleOnChange}
          ref={checkboxRef}
          type="checkbox"
          value={value}
          {...rest}
        />
        <span className={styles.icon} role="presentation" style={cssVariables}>
          {indeterminate ? <SubtractIcon /> : checked ? icon : null}
        </span>
      </div>
    );
  },
);

export { Checkbox };
