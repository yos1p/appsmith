import React, { useMemo, forwardRef, HTMLAttributes } from "react";
import { IconName } from "@blueprintjs/icons";
import { withTooltip } from "components/wds";

import { Slot } from "@radix-ui/react-slot";

import {
  ButtonPlacement,
  ButtonVariant,
  ButtonVariantTypes,
} from "components/constants";
import {
  getComplementaryGrayscaleColor,
  lightenColor,
} from "widgets/WidgetUtils";
import { createPolymorphicComponent } from "@mantine/utils";
import { getCSSVariables } from "./styles";
import styles from "./styles.module.css";
import cx from "clsx";
import { Spinner } from "../Spinner";
import { UnstyledButton } from "../UnstyledButton";

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

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

    const cssVariables = getCSSVariables(props);

    const content = useMemo(() => {
      if (isLoading) return <Spinner />;

      return (
        <>
          {leadingIcon && (
            <span className={styles.leadingIcon} data-component="leadingIcon">
              {leadingIcon}
            </span>
          )}
          {children && <span data-component="text">{children}</span>}
          {trailingIcon && (
            <span className={styles.trailingIcon} data-component="trailingIcon">
              {trailingIcon}
            </span>
          )}
        </>
      );
    }, [isLoading, children, trailingIcon, leadingIcon]);

    return (
      <UnstyledButton
        {...rest}
        className={`${cx(styles.container, className, styles[variant])}`}
        data-disabled={isDisabled || undefined}
        data-loading={isLoading || undefined}
        disabled={isDisabled || undefined}
        ref={forwardedRef}
        style={cssVariables}
      >
        {content}
      </UnstyledButton>
    );
  },
);

_Button.displayName = "@appsmith/wds/Button";

export const Button = createPolymorphicComponent<"button", ButtonProps>(
  _Button,
);

export default Button;
