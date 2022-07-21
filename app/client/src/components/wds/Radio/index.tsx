import React, {
  ChangeEventHandler,
  CSSProperties,
  InputHTMLAttributes,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { FormValidationStatus } from "../utils/types/FormValidationStatus";
import { RadioGroupContext } from "../RadioGroup";
import styles from "./styles.module.css";
import { darkenColor } from "widgets/WidgetUtils";

export type RadioProps = {
  /**
   * A unique value that is never shown to the user.
   * Used during form submission and to identify which radio button in a group is selected
   */
  value: string;
  /**
   * Name attribute of the input element. Required for grouping radio inputs
   */
  name?: string;
  /**
   * Apply inactive visual appearance to the radio button
   */
  disabled?: boolean;
  /**
   * Indicates whether the radio button is selected
   */
  checked?: boolean;
  /**
   * Forward a ref to the underlying input element
   */
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * Indicates whether the radio button must be checked before the form can be submitted
   */
  required?: boolean;
  /**
   * Indicates whether the radio button validation state is non-standard
   */
  validationStatus?: FormValidationStatus;
  /**
   * The color of the radio button
   */
  accentColor?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * An accessible, native radio component for selecting one option from a list.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      accentColor,
      checked,
      disabled,
      name: nameProp,
      onChange,
      required,
      validationStatus,
      value,
      ...rest
    }: RadioProps,
    ref,
  ): ReactElement => {
    const radioGroupContext = useContext(RadioGroupContext);
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      radioGroupContext?.onChange && radioGroupContext.onChange(e);
      onChange && onChange(e);
    };
    const name = nameProp || radioGroupContext?.name;

    if (!name) {
      // eslint-disable-next-line no-console
      console.warn(
        "A radio input must have a `name` attribute. Pass `name` as a prop directly to each Radio, or nest them in a `RadioGroup` component with a `name` prop",
      );
    }

    const cssVariables = useMemo(
      () =>
        ({
          "--wds-color-accent": accentColor,
          "--wds-color-accent-hover": darkenColor(accentColor),
        } as CSSProperties),
      [accentColor],
    );

    return (
      <input
        aria-checked={checked ? "true" : "false"}
        aria-disabled={disabled ? "true" : "false"}
        aria-invalid={validationStatus === "error" ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        checked={checked}
        className={styles.input}
        disabled={disabled}
        name={name}
        onChange={handleOnChange}
        ref={ref}
        required={required}
        style={cssVariables}
        type="radio"
        value={value}
        {...rest}
      />
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
