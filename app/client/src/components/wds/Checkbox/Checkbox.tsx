import { useId } from "@mantine/hooks";
import React, { forwardRef, CSSProperties, useMemo } from "react";

import { InlineInput } from "../InlineInput";
import { CheckboxGroup } from "./CheckboxGroup";
import CheckIcon from "remixicon-react/CheckLineIcon";
import SubtractIcon from "remixicon-react/SubtractLineIcon";
import { useCheckboxGroupContext } from "./CheckboxGroup.context";

import styles from "./styles.module.css";
import { darkenColor } from "widgets/WidgetUtils";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  /** Key of theme.radius or number to set border-radius in px */

  /** Checkbox label */
  label?: React.ReactNode;

  /** Indeterminate state of checkbox, overwrites checked */
  indeterminate?: boolean;

  /** Props spread to wrapper element */
  wrapperProps?: Record<string, any>;

  /** id to connect label with input */
  id?: string;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Icon rendered when checkbox has checked or indeterminate state */
  icon?: React.ReactNode;

  /** Position of label */
  labelPosition?: "left" | "right";

  /** description, displayed after label */
  description?: React.ReactNode;

  /** Displays error message after input */
  error?: React.ReactNode;

  /** sets the input disabled */
  isDisabled?: boolean;

  /** sets the checkbox raidus */
  borderRadius?: string;

  /** sets the checkbox accent color */
  accentColor?: string;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      checked,
      className,
      description,
      isDisabled: disabled,
      error,
      icon = <CheckIcon />,
      id,
      indeterminate,
      label,
      labelPosition = "right",
      value,
      wrapperProps,
      borderRadius,
      accentColor,
      ...others
    } = props;

    const ctx = useCheckboxGroupContext();
    const uuid = useId(id);

    const contextProps = ctx
      ? {
          checked: ctx.value.includes(value as string),
          onChange: ctx.onChange,
        }
      : {};

    const cssVariables = useMemo(
      () =>
        ({
          "--wds-color-accent": accentColor,
          "--wds-color-accent-hover": darkenColor(accentColor),
          "--wds-radii": borderRadius,
        } as CSSProperties),
      [borderRadius, accentColor],
    );

    return (
      <InlineInput
        className={className}
        data-checked={contextProps.checked || undefined}
        description={description}
        disabled={disabled}
        error={error}
        id={uuid}
        label={label}
        labelPosition={labelPosition}
        {...wrapperProps}
      >
        <div className={styles.container}>
          <input
            checked={checked}
            className={styles.input}
            disabled={disabled}
            id={uuid}
            ref={ref}
            type="checkbox"
            value={value}
            {...others}
            {...contextProps}
          />

          <span
            className={styles.icon}
            role="presentation"
            style={cssVariables}
          >
            {indeterminate ? <SubtractIcon /> : icon}
          </span>
        </div>
      </InlineInput>
    );
  },
) as any;

Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup;
