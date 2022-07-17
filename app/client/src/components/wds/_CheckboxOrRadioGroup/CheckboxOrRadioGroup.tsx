import React, { CSSProperties } from "react";
import CheckboxOrRadioGroupCaption from "./_CheckboxOrRadioGroupCaption";
import CheckboxOrRadioGroupLabel from "./_CheckboxOrRadioGroupLabel";
import CheckboxOrRadioGroupValidation from "./_CheckboxOrRadioGroupValidation";
import { Slots } from "./slots";
import styled from "styled-components";
import CheckboxOrRadioGroupContext from "./_CheckboxOrRadioGroupContext";
import VisuallyHidden from "../_VisuallyHidden";
import { useProvidedIdOrCreate } from "../hooks/useProvidedIdOrCreate";

import styles from "./styles.module.css";

export type CheckboxOrRadioGroupProps = {
  /**
   * Used when associating the input group with a label other than `CheckboxOrRadioGroup.Label`
   */
  ["aria-labelledby"]?: string;
  /**
   * Whether the input group allows user input
   */
  disabled?: boolean;
  /**
   * The unique identifier for this input group. Used to associate the label, validation text, and caption text.
   * You may want a custom ID to make it easier to select elements in integration tests.
   */
  id?: string;
  /**
   * If true, the user must make a selection before the owning form can be submitted
   */
  required?: boolean;
  /**
   * The direction the content flows.
   */
  layout?: "horizontal" | "vertical";
};

export type CheckboxOrRadioGroupContext = {
  validationMessageId?: string;
  captionId?: string;
} & CheckboxOrRadioGroupProps;

const Body = styled.div``;

const CheckboxOrRadioGroup: React.FC<CheckboxOrRadioGroupProps> = ({
  "aria-labelledby": ariaLabelledby,
  children,
  disabled,
  id: idProp,
  layout = "horizontal",
  required,
}) => {
  const labelChild = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) && child.type === CheckboxOrRadioGroupLabel,
  );
  const validationChild = React.Children.toArray(children).find((child) =>
    React.isValidElement(child) && child.type === CheckboxOrRadioGroupValidation
      ? child
      : null,
  );
  const captionChild = React.Children.toArray(children).find((child) =>
    React.isValidElement(child) && child.type === CheckboxOrRadioGroupCaption
      ? child
      : null,
  );
  const id = useProvidedIdOrCreate(idProp);
  const validationMessageId = validationChild && `${id}-validationMessage`;
  const captionId = captionChild && `${id}-caption`;

  if (!labelChild && !ariaLabelledby) {
    // eslint-disable-next-line no-console
    console.warn(
      "A choice group must be labelled using a `CheckboxOrRadioGroup.Label` child, or by passing `aria-labelledby` to the CheckboxOrRadioGroup component.",
    );
  }

  return (
    <Slots
      context={{
        disabled,
        required,
        captionId,
        validationMessageId,
      }}
    >
      {(slots) => {
        const isLegendVisible =
          React.isValidElement(labelChild) && !labelChild.props.visuallyHidden;

        return (
          <CheckboxOrRadioGroupContext.Provider value={{ disabled }}>
            <div>
              <fieldset>
                <div
                  className={styles.fieldset}
                  style={
                    {
                      "--layout": layout === "horizontal" ? "row" : "column",
                    } as CSSProperties
                  }
                >
                  {labelChild ? (
                    /*
                    Placing the caption text and validation text in the <legend> provides a better user
                    experience for more screenreaders.

                    Reference: https://blog.tenon.io/accessible-validation-of-checkbox-and-radiobutton-groups/
                  */
                    <legend>
                      {slots.Label}
                      {slots.Caption}
                      {React.isValidElement(slots.Validation) &&
                        slots.Validation.props.children && (
                          <VisuallyHidden>
                            {slots.Validation.props.children}
                          </VisuallyHidden>
                        )}
                    </legend>
                  ) : (
                    /*
                    If CheckboxOrRadioGroup.Label wasn't passed as a child, we don't render a <legend>
                    but we still want to render a caption
                  */
                    slots.Caption
                  )}

                  <div
                    {...(!labelChild && {
                      ["aria-labelledby"]: ariaLabelledby,
                      ["aria-describedby"]: [validationMessageId, captionId]
                        .filter(Boolean)
                        .join(" "),
                      as: "div",
                      role: "group",
                    })}
                    className={styles.group}
                  >
                    {React.Children.toArray(children).filter((child) =>
                      React.isValidElement(child),
                    )}
                  </div>
                </div>
              </fieldset>
              {validationChild && slots.Validation}
            </div>
          </CheckboxOrRadioGroupContext.Provider>
        );
      }}
    </Slots>
  );
};

CheckboxOrRadioGroup.defaultProps = {
  disabled: false,
  required: false,
};

export default Object.assign(CheckboxOrRadioGroup, {
  Caption: CheckboxOrRadioGroupCaption,
  Label: CheckboxOrRadioGroupLabel,
  Validation: CheckboxOrRadioGroupValidation,
});
