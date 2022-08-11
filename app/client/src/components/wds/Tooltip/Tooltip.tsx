import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";

export type TooltipProps = {
  direction?: "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";
  text?: string;
  noDelay?: boolean;
  align?: "left" | "right";
  wrap?: boolean;
  clasName?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

function Tooltip({
  align,
  children,
  className,
  direction = "n",
  noDelay,
  text,
  wrap,
  ...rest
}: TooltipProps) {
  const classes = clsx(
    className,
    styles.tooltip,
    styles[`tooltip-${direction}`],
    align && styles[`tooltip-align-${align}-2`],
    noDelay && styles["tooltip-no-delay"],
    wrap && styles["tooltip-multiline"],
  );

  return (
    <span aria-label={text} role="tooltip" {...rest} className={classes}>
      {children}
    </span>
  );
}

Tooltip.alignments = ["left", "right"];

Tooltip.directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

export default Tooltip;
