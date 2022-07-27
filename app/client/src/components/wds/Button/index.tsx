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
import { Spinner } from "../Spinner";

type ButtonStyleProps = {
  accentColor?: string;
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
  variant?: "solid" | "outline" | "link" | "ghost";
  boxShadow?: string;
  borderRadius?: string;
  tooltip?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /**
   * size of button ( mainly used for icon buttons )
   */
  size?: number;
} & ButtonStyleProps &
  RecaptchaProps &
  HTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef): JSX.Element => {
    const {
      accentColor,
      asChild,
      borderRadius,
      boxShadow,
      children,
      className,
      isDisabled,
      isLoading,
      leadingIcon,
      tooltip,
      trailingIcon,
      variant,
      ...rest
    } = props;

    const iconOnly = Boolean(!children && (leadingIcon || trailingIcon));
    const computedClassnames = cx({
      [styles.base]: true,
      [styles[variant || "solid"]]: true,
      [className || ""]: true,
      [styles.loading]: isLoading,
      [styles["icon-only"]]: iconOnly,
    });

    const cssVariables = useMemo(() => {
      return getCSSVariables(props, "default", iconOnly);
    }, [borderRadius, accentColor, boxShadow]);

    const Component = (asChild ? Slot : "button") as "button";

    const content = useMemo(() => {
      // if button is loading, show spinner only
      if (isLoading) return <Spinner />;

      return (
        <>
          {leadingIcon && (
            <span className={styles.leadingIcon}>{leadingIcon}</span>
          )}
          {children && <span>{children}</span>}
          {trailingIcon && (
            <span className={styles.trailingIcon}>{trailingIcon}</span>
          )}
        </>
      );
    }, [isLoading, children]);

    return (
      <Component
        {...rest}
        className={computedClassnames}
        disabled={isDisabled}
        ref={forwardedRef}
        style={cssVariables}
      >
        {content}
      </Component>
    );
  },
);

export default withRecaptcha(withTooltip(Button));
