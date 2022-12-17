import React, { forwardRef } from "react";

import { createPolymorphicComponent } from "@mantine/utils";
import { Box } from "../Box";

export interface UnstyledButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const _UnstyledButton = forwardRef<
  HTMLDivElement,
  UnstyledButtonProps & { component?: any }
>((props, ref) => {
  const { component = "button", ...others } = props;

  return (
    <Box
      component={component}
      ref={ref}
      type={component === "button" ? "button" : undefined}
      {...others}
    />
  );
});

_UnstyledButton.displayName = "@mantine/core/UnstyledButton";

export const UnstyledButton = createPolymorphicComponent<
  "button",
  UnstyledButtonProps
>(_UnstyledButton);
