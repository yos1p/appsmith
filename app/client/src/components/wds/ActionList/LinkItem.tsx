import React, { HTMLAttributes } from "react";
import { Item, ActionListItemProps } from "./Item";
import { Slot } from "@radix-ui/react-slot";

export type ActionListLinkItemProps = Pick<
  ActionListItemProps,
  "active" | "children"
> &
  HTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
  };

export const LinkItem = React.forwardRef<
  HTMLAnchorElement,
  ActionListLinkItemProps
>(({ active, asChild, ...props }, forwardedRef) => {
  const Component = (asChild ? Slot : "a") as "a";

  return (
    <Item
      _PrivateItemWrapper={({ children }) => (
        <Component {...props} ref={forwardedRef}>
          {children}
        </Component>
      )}
      active={active}
    >
      {props.children}
    </Item>
  );
});
