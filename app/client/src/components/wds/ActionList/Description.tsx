import React from "react";
import { Slot, ItemContext } from "./Item";

export type ActionListDescriptionProps = {
  /**
   * Secondary text style variations.
   *
   * - `"inline"` - Secondary text is positioned beside primary text.
   * - `"block"` - Secondary text is positioned below primary text.
   */
  variant?: "inline" | "block";
};

export const Description: React.FC<ActionListDescriptionProps> = ({
  variant = "inline",
  ...props
}) => {
  const styles = {
    fontSize: 0,
    lineHeight: "16px",
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    marginLeft: variant === "block" ? 0 : 2,
  };

  return (
    <Slot name={variant === "block" ? "BlockDescription" : "InlineDescription"}>
      {({ blockDescriptionId, disabled, inlineDescriptionId }: ItemContext) =>
        variant === "block" ? (
          <span id={blockDescriptionId}>{props.children}</span>
        ) : (
          <span id={inlineDescriptionId} title={props.children as string}>
            {props.children}
          </span>
        )
      }
    </Slot>
  );
};
