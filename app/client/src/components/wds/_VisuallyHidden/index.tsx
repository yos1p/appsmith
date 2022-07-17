import cx from "clsx";
import React, { HtmlHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

import styles from "./styles.module.css";

interface Props {
  isVisible?: boolean;
  asChild?: boolean;
}

const VisuallyHidden: React.FC<HtmlHTMLAttributes<HTMLDivElement> & Props> = ({
  asChild,
  className,
  isVisible,
  ...rest
}) => {
  const Component = (asChild ? Slot : "div") as "div";

  return (
    <Component
      className={cx(!isVisible && styles.hidden, className)}
      {...rest}
    />
  );
};

VisuallyHidden.defaultProps = {
  isVisible: false,
};

export default VisuallyHidden;
