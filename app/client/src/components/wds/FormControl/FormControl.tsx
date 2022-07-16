import React, { useContext } from "react";
import { Checkbox } from "..";
import { useProvidedIdOrCreate } from "../hooks/useProvidedIdOrCreate";
import FormControlLabel from "./_FormControlLabel";
import FormControlValidation from "./_FormControlValidation";
import { Slots } from "./slots";
import ValidationAnimationContainer from "../_ValidationAnimationContainer";
import { get } from "../constants";
import FormControlLeadingVisual from "./_FormControlLeadingVisual";
import { SxProp } from "../sx";
import CheckboxOrRadioGroupContext from "../_CheckboxOrRadioGroup/_CheckboxOrRadioGroupContext";

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
} & SxProp;

export interface FormControlContext
  extends Pick<FormControlProps, "disabled" | "id" | "required"> {
  captionId: string;
  validationMessageId: string;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    { children, disabled: disabledProp, id: idProp, layout, required, sx },
    ref,
  ) => {
    const expectedInputComponents = [Checkbox];
    const choiceGroupContext = useContext(CheckboxOrRadioGroupContext);
    const disabled = choiceGroupContext?.disabled || disabledProp;
    const id = useProvidedIdOrCreate(idProp);
    const validationChild = React.Children.toArray(children).find((child) =>
      React.isValidElement(child) && child.type === FormControlValidation
        ? child
        : null,
    );
    const labelChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === FormControlLabel,
    );
    const validationMessageId = validationChild && `${id}-validationMessage`;
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
      React.isValidElement(InputComponent) && InputComponent.type === Checkbox;

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
    } else {
      if (
        React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            child.type === FormControlLeadingVisual,
        )
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          "A leading visual is only rendered for a checkbox or radio form control. If you want to render a leading visual inside of your input, check if your input supports a leading visual.",
        );
      }
    }

    return (
      <Slots
        context={{
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
            <div ref={ref}>
              <div>
                {React.isValidElement(InputComponent) &&
                  React.cloneElement(InputComponent, {
                    id,
                    disabled,
                  })}
                {React.Children.toArray(children).filter(
                  (child) =>
                    React.isValidElement(child) &&
                    ![Checkbox].some(
                      (inputComponent) => child.type === inputComponent,
                    ),
                )}
              </div>
              {!isLabelHidden ? (
                <div>{slots.Label}</div>
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
                  ...InputComponent.props,
                })}
              {React.Children.toArray(children).filter(
                (child) =>
                  React.isValidElement(child) &&
                  !expectedInputComponents.some(
                    (inputComponent) => child.type === inputComponent,
                  ),
              )}
              {validationChild && (
                <ValidationAnimationContainer show>
                  {slots.Validation}
                </ValidationAnimationContainer>
              )}
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
  Label: FormControlLabel,
  LeadingVisual: FormControlLeadingVisual,
  Validation: FormControlValidation,
});
