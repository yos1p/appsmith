import React, {
  useMemo,
  forwardRef,
  useLayoutEffect,
  InputHTMLAttributes,
  ChangeEventHandler,
  CSSProperties,
} from "react";
import CheckIcon from "remixicon-react/CheckLineIcon";
import SubtractIcon from "remixicon-react/SubtractLineIcon";

import { darkenColor } from "widgets/WidgetUtils";
import { useProvidedRefOrCreate } from "../hooks/useProvidedRefOrCreate";
import { useProvidedStateOrCreate } from "../hooks/useProvidedStateOrCreate";

import styles from "./checkbox.module.css";

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
  onCheckedChange?(checked?: boolean): void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
} & Exclude<InputHTMLAttributes<HTMLInputElement>, "value">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      accentColor,
      checked: providedChecked,
      children,
      className,
      defaultChecked,
      disabled,
      hasError,
      indeterminate,
      onCheckedChange,
      radii,
      value,
      icon = <CheckIcon />,
      ...rest
    },
    ref,
  ) => {
    const checkboxRef = useProvidedRefOrCreate(
      ref as React.RefObject<HTMLInputElement>,
    );
    const [checked, setChecked] = useProvidedStateOrCreate(
      providedChecked,
      onCheckedChange,
      defaultChecked,
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

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setChecked(e.target.checked);
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
      <label
        className={`${styles.container} ${className}`}
        style={cssVariables}
      >
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
        <span className={styles.icon} role="presentation">
          {indeterminate ? <SubtractIcon /> : checked ? icon : null}
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);

export { Checkbox };
