import React, {
  useMemo,
  forwardRef,
  useCallback,
  useLayoutEffect,
  InputHTMLAttributes,
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
} & Exclude<InputHTMLAttributes<HTMLInputElement>, "value">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      accentColor,
      checked: providedChecked,
      defaultChecked,
      disabled,
      hasError,
      indeterminate,
      onCheckedChange,
      radii,
      value,
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
     * indeterminate state can be state with javascript, so here we are
     * setting the state with useLayoutEffect
     */
    useLayoutEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checked, checkboxRef]);

    const onClickCheckbox = useCallback(() => setChecked(!checked), [
      checked,
      setChecked,
    ]);

    const iconStyles: any = useMemo(
      () => ({
        "--wds-color-accent": accentColor,
        "--wds-color-accent-hover": darkenColor(accentColor),
        "--wds-radii": radii,
      }),
      [radii, accentColor],
    );

    return (
      <div className={styles.container}>
        <input
          aria-disabled={disabled ? "true" : "false"}
          aria-invalid={hasError ? "true" : "false"}
          checked={indeterminate ? false : checked}
          className={styles.input}
          disabled={disabled}
          name={value}
          ref={checkboxRef}
          type="checkbox"
          value={value}
          {...rest}
        />
        <button
          className={styles.icon}
          onClick={onClickCheckbox}
          style={iconStyles}
        >
          {indeterminate ? <SubtractIcon /> : checked ? <CheckIcon /> : null}
        </button>
      </div>
    );
  },
);
