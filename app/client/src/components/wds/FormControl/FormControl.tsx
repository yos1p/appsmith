import React, { useContext } from "react";
import { Checkbox } from "..";
import { useProvidedIdOrCreate } from "../hooks/useProvidedIdOrCreate";
import FormControlCaption from "./_FormControlCaption";
import FormControlLabel from "./_FormControlLabel";
import FormControlValidation from "./_FormControlValidation";
import { Slots } from "./slots";
import CheckboxOrRadioGroupContext from "../_CheckboxOrRadioGroup/_CheckboxOrRadioGroupContext";
import styles from "./styles.module.css";
import Radio from "../Radio";
import { ToggleSwitch } from "../ ToggleSwitch";

export type FormControlProps = {
  children?: React.ReactNode;
  /**
   * Whether the control allows user input
   */
  disabled?: boolean;
  /**
   * The unique identifier for this control. Used to associate the label, validation text, and caption text
   */
  id?: string;
  /**
   * If true, the user must specify a value for the input before the owning form can be submitted
   */
  required?: boolean;
  /**
   * The direction the content flows.
   * Vertical layout is used by default, and horizontal layout is used for checkbox and radio inputs.
   */
  layout?: "horizontal" | "vertical";
};

export interface FormControlContext
  extends Pick<FormControlProps, "disabled" | "id" | "required"> {
  captionId: string;
  validationMessageId: string;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, disabled: disabledProp, id: idProp, layout, required }, ref) => {
    const expectedInputComponents = [Checkbox, Radio, ToggleSwitch];
    const choiceGroupContext = useContext(CheckboxOrRadioGroupContext);
    const disabled = choiceGroupContext?.disabled || disabledProp;
    const id = useProvidedIdOrCreate(idProp);
    const validationChild = React.Children.toArray(children).find((child) =>
      React.isValidElement(child) && child.type === FormControlValidation
        ? child
        : null,
    );
    const captionChild = React.Children.toArray(children).find((child) =>
      React.isValidElement(child) && child.type === FormControlCaption
        ? child
        : null,
    );
    const labelChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === FormControlLabel,
    );
    const validationMessageId = validationChild && `${id}-validationMessage`;
    const captionId = captionChild && `${id}-caption`;
    const validationStatus =
      React.isValidElement(validationChild) && validationChild.props.variant;
    const InputComponent = React.Children.toArray(children).find((child) =>
      expectedInputComponents.some(
        (inputComponent) =>
          React.isValidElement(child) && child.type === inputComponent,
      ),
    );
    const inputProps =
      React.isValidElement(InputComponent) && InputComponent.props;
    const isChoiceInput =
      React.isValidElement(InputComponent) &&
      (InputComponent.type === Checkbox ||
        InputComponent.type === Radio ||
        InputComponent.type === ToggleSwitch);

    if (InputComponent) {
      if (inputProps?.id) {
        // eslint-disable-next-line no-console
        console.warn(
          `instead of passing the 'id' prop directly to the input component, it should be passed to the parent component, <FormControl>`,
        );
      }
      if (inputProps?.disabled) {
        // eslint-disable-next-line no-console
        console.warn(
          `instead of passing the 'disabled' prop directly to the input component, it should be passed to the parent component, <FormControl>`,
        );
      }
      if (inputProps?.required) {
        // eslint-disable-next-line no-console
        console.warn(
          `instead of passing the 'required' prop directly to the input component, it should be passed to the parent component, <FormControl>`,
        );
      }
    }

    if (!labelChild) {
      // eslint-disable-next-line no-console
      console.error(
        `The input field with the id ${id} MUST have a FormControl.Label child.\n\nIf you want to hide the label, pass the 'visuallyHidden' prop to the FormControl.Label component.`,
      );
    }

    if (isChoiceInput) {
      if (validationChild) {
        // eslint-disable-next-line no-console
        console.warn(
          "Validation messages are not rendered for an individual checkbox or radio. The validation message should be shown for all options.",
        );
      }

      if (
        React.Children.toArray(children).find(
          (child) => React.isValidElement(child) && child.props?.required,
        )
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          "An individual checkbox or radio cannot be a required field.",
        );
      }
    }

    return (
      <Slots
        context={{
          captionId,
          disabled,
          id,
          required,
          validationMessageId,
        }}
      >
        {(slots) => {
          const isLabelHidden =
            React.isValidElement(slots.Label) &&
            slots.Label.props.visuallyHidden;

          return isChoiceInput || layout === "horizontal" ? (
            <div className={styles.control} ref={ref}>
              <div>
                {React.isValidElement(InputComponent) &&
                  React.cloneElement(InputComponent, {
                    id,
                    disabled,
                    ["aria-describedby"]: captionId,
                  })}
                {React.Children.toArray(children).filter(
                  (child) =>
                    React.isValidElement(child) &&
                    ![Checkbox, Radio, ToggleSwitch].some(
                      (inputComponent) => child.type === inputComponent,
                    ),
                )}
              </div>
              {slots.LeadingVisual && <div>{slots.LeadingVisual}</div>}
              {(React.isValidElement(slots.Label) &&
                !slots.Label.props.visuallyHidden) ||
              slots.Caption ? (
                <div>
                  {slots.Label}
                  {slots.Caption}
                </div>
              ) : (
                <>
                  {slots.Label}
                  {slots.Caption}
                </>
              )}
            </div>
          ) : (
            <div ref={ref}>
              {slots.Label}
              {React.isValidElement(InputComponent) &&
                React.cloneElement(InputComponent, {
                  id,
                  required,
                  disabled,
                  validationStatus,
                  ["aria-describedby"]: [validationMessageId, captionId]
                    .filter(Boolean)
                    .join(" "),
                  ...InputComponent.props,
                })}
              {React.Children.toArray(children).filter(
                (child) =>
                  React.isValidElement(child) &&
                  !expectedInputComponents.some(
                    (inputComponent) => child.type === inputComponent,
                  ),
              )}
              {validationChild && slots.Validation}
              {slots.Caption}
            </div>
          );
        }}
      </Slots>
    );
  },
);

FormControl.defaultProps = {
  layout: "vertical",
};

export default Object.assign(FormControl, {
  Caption: FormControlCaption,
  Label: FormControlLabel,
  Validation: FormControlValidation,
});
