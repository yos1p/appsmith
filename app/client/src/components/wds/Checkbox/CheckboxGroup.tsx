import React, { forwardRef } from "react";
import { useUncontrolled } from "@mantine/hooks";

import { InputsGroup } from "./InputsGroup";
import { InputWrapper } from "../Input/InputWrapper/InputWrapper";
import { CheckboxGroupProvider } from "./CheckboxGroup.context";
import { InputWrapperBaseProps } from "../Input/InputWrapper/InputWrapper";

export interface CheckboxGroupProps
  extends InputWrapperBaseProps,
    Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  /** <Checkbox /> components only */
  children: React.ReactNode;

  /** Value of currently selected checkbox */
  value?: string[];

  /** Initial value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?(value: string[]): void;

  /** Horizontal or vertical orientation */
  orientation?: "horizontal" | "vertical";

  /** Props spread to InputWrapper */
  wrapperProps?: Record<string, any>;
  labelPosition?: "top" | "left";
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (props: CheckboxGroupProps, ref) => {
    const {
      children,
      defaultValue,
      onChange,
      orientation = "horizontal",
      value,
      wrapperProps,
      ...others
    } = props;

    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: [],
      onChange,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const itemValue = event.currentTarget.value;

      setValue(
        _value.includes(itemValue)
          ? _value.filter((item) => item !== itemValue)
          : [..._value, itemValue],
      );
    };

    // console.log({ value, _value });

    return (
      <CheckboxGroupProvider value={{ value: _value, onChange: handleChange }}>
        <InputWrapper ref={ref} {...wrapperProps} {...others}>
          <InputsGroup orientation={orientation}>{children}</InputsGroup>
        </InputWrapper>
      </CheckboxGroupProvider>
    );
  },
);

CheckboxGroup.displayName = "@mantine/core/CheckboxGroup";
