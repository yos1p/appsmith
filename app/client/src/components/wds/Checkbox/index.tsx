import React, {
  createContext,
  forwardRef,
  useContext,
  ChangeEventHandler,
  InputHTMLAttributes,
  useLayoutEffect,
} from "react";
import styles from "./checkbox.module.css";
import CheckIcon from "remixicon-react/CheckLineIcon";
import SubtractIcon from "remixicon-react/SubtractLineIcon";

import { darkenColor } from "widgets/WidgetUtils";
import { useProvidedRefOrCreate } from "../hooks/useProvidedRefOrCreate";
import { useProvidedStateOrCreate } from "../hooks/useProvidedStateOrCreate";

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

export const CheckboxGroupContext = createContext<{
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}>({});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      accentColor,
      checked: providedChecked,
      defaultChecked,
      disabled,
      hasError,
      indeterminate,
      onChange,
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
    const checkboxGroupContext = useContext(CheckboxGroupContext);
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      checkboxGroupContext.onChange && checkboxGroupContext.onChange(e);
      onChange && onChange(e);
      setChecked(!checked);
    };

    useLayoutEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, checked, checkboxRef]);

    const iconStyle: any = {
      "--wds-color-accent": accentColor,
      "--wds-color-accent-hover": darkenColor(accentColor),
    };

    return (
      <>
        <input
          aria-disabled={disabled ? "true" : "false"}
          aria-invalid={hasError ? "true" : "false"}
          checked={checked}
          className={styles.input}
          disabled={disabled}
          onChange={handleOnChange}
          ref={checkboxRef}
          type="checkbox"
          value={value}
          {...rest}
        />
        <button className={styles.icon} style={iconStyle}>
          {checked && <CheckIcon />}
          {indeterminate && <SubtractIcon />}
        </button>
      </>
    );
  },
);
