import React, {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  FC,
} from "react";
import CheckboxOrRadioGroup from "../_CheckboxOrRadioGroup";
import { CheckboxOrRadioGroupProps } from "../_CheckboxOrRadioGroup/CheckboxOrRadioGroup";
import CheckboxOrRadioGroupCaption from "../_CheckboxOrRadioGroup/_CheckboxOrRadioGroupCaption";
import CheckboxOrRadioGroupLabel from "../_CheckboxOrRadioGroup/_CheckboxOrRadioGroupLabel";
import CheckboxOrRadioGroupValidation from "../_CheckboxOrRadioGroup/_CheckboxOrRadioGroupValidation";
import { useRenderForcingRef } from "../hooks/useRenderForcingRef";

type RadioGroupProps = {
  /**
   * An onChange handler that gets called when the selection changes
   */
  onChange?: (
    selected: string | null,
    e?: ChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * The name used to identify this group of radios
   */
  name: string;
} & CheckboxOrRadioGroupProps;

export const RadioGroupContext = createContext<{
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
} | null>(null);

const RadioGroup: FC<RadioGroupProps> = ({
  children,
  disabled,
  name,
  onChange,
  ...rest
}) => {
  const [selectedRadioValue, setSelectedRadioValue] = useRenderForcingRef<
    string | null
  >(null);

  const updateSelectedCheckboxes: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { checked, value } = e.currentTarget;

    if (checked) {
      setSelectedRadioValue(value);
      return;
    }
  };

  return (
    <RadioGroupContext.Provider
      value={{
        disabled,
        name,
        onChange: (e) => {
          if (onChange) {
            updateSelectedCheckboxes(e);
            onChange(selectedRadioValue.current, e);
          }
        },
      }}
    >
      <CheckboxOrRadioGroup disabled={disabled} {...rest}>
        {children}
      </CheckboxOrRadioGroup>
    </RadioGroupContext.Provider>
  );
};

export default Object.assign(RadioGroup, {
  Caption: CheckboxOrRadioGroupCaption,
  Label: CheckboxOrRadioGroupLabel,
  Validation: CheckboxOrRadioGroupValidation,
});
