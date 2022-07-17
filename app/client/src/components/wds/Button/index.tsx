import React, { useMemo, forwardRef, HTMLAttributes } from "react";
import { IconName } from "@blueprintjs/icons";
import { withTooltip } from "components/wds";

import { Slot } from "@radix-ui/react-slot";

import _ from "lodash";
import {
  ButtonPlacement,
  ButtonVariant,
  ButtonVariantTypes,
} from "components/constants";
import {
  getComplementaryGrayscaleColor,
  lightenColor,
} from "widgets/WidgetUtils";
import { borderRadiusOptions } from "constants/ThemeConstants";
import withRecaptcha, { RecaptchaProps } from "./withRecaptcha";
import { getCSSVariables } from "./styles";
import styles from "./styles.module.css";
import cx from "clsx";

type ButtonStyleProps = {
  buttonColor?: string;
  buttonVariant?: ButtonVariant;
  iconName?: IconName;
  placement?: ButtonPlacement;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

export type ButtonProps = {
  variant?: keyof typeof VariantTypes;
  boxShadow?: string;
  borderRadius?: string;
  tooltip?: string;
  children?: React.ReactNode;
  leftIcon?: IconName;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  asChild?: boolean;
} & ButtonStyleProps &
  RecaptchaProps &
  HTMLAttributes<HTMLButtonElement>;

export enum VariantTypes {
  solid = "solid",
  outline = "outline",
  ghost = "ghost",
  link = "link",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef): JSX.Element => {
    const {
      asChild,
      borderRadius,
      boxShadow,
      buttonColor,
      children,
      className,
      isDisabled,
      tooltip,
      variant,
      ...rest
    } = props;
    const computedClassnames = cx({
      [styles.base]: true,
      [styles[variant || "solid"]]: true,
      [className || ""]: true,
    });

    const cssVariables = useMemo(() => {
      return getCSSVariables(props, "default");
    }, [borderRadius, buttonColor, boxShadow]);

    const Component = (asChild ? Slot : "button") as "button";

    return (
      <Component
        {...rest}
        className={computedClassnames}
        disabled={isDisabled}
        ref={forwardedRef}
        style={cssVariables}
      >
        {children}
      </Component>
    );
  },
);

Button.defaultProps = {
  buttonVariant: ButtonVariantTypes.PRIMARY,
  disabled: false,
  text: "Button Text",
  minimal: true,
  variant: "solid",
  buttonColor: "#553DE9",
  borderRadius: borderRadiusOptions.md,
  justifyContent: "center",
} as ButtonProps;

export default withRecaptcha(withTooltip(Button));
