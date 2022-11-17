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
import { getCSSVariables } from "./styles";
import styles from "./styles.module.css";
import cx from "clsx";
import { Spinner } from "../Spinner";

export type ButtonProps = {
  accentColor?: string;
  variant?: "filled" | "outline" | "link" | "subtle" | "white" | "light";
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
  size?: number;
} & HTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef): JSX.Element => {
    const {
      accentColor,
      asChild,
      borderRadius,
      boxShadow,
      children,
      className = "",
      isDisabled,
      isLoading,
      leadingIcon,
      tooltip,
      trailingIcon,
      variant = "filled",
      ...rest
    } = props;

    const iconOnly = Boolean(!children && (leadingIcon || trailingIcon));

    const computedClassnames = cx({
      [styles.base]: true,
      [styles.disabled]: isDisabled,
      [styles[variant]]: true,
      [className]: true,
      [styles.loading]: isLoading,
    });
    const cssVariables = getCSSVariables(props);
    const Component = (asChild ? Slot : "button") as "button";

    const content = useMemo(() => {
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

export default Button;
