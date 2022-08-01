import clsx from "clsx";
import React from "react";
import { AriaRole } from "../utils/types";
import { ActionListContainerContext } from "./ActionListContainerContext";

import styles from "./styles.module.css";

export type ActionListProps = {
  /**
   * `inset` children are offset (vertically and horizontally) from `List`’s edges, `full` children are flush (vertically and horizontally) with `List` edges
   */
  variant?: "inset" | "full";
  /**
   * Whether multiple Items or a single Item can be selected.
   */
  selectionVariant?: "single" | "multiple";
  /**
   * Display a divider above each `Item` in this `List` when it does not follow a `Header` or `Divider`.
   */
  showDividers?: boolean;
  /**
   * The ARIA role describing the function of `List` component. `listbox` or `menu` are a common values.
   */
  role?: AriaRole;
  children?: React.ReactNode;
  className?: string;
};

type ContextProps = Pick<
  ActionListProps,
  "variant" | "selectionVariant" | "showDividers" | "role"
>;
export const ListContext = React.createContext<ContextProps>({});

export const List = React.forwardRef<HTMLUListElement, ActionListProps>(
  (
    {
      className,
      role,
      selectionVariant,
      showDividers = false,
      variant = "inset",
      ...props
    },
    forwardedRef,
  ): JSX.Element => {
    /** if list is inside a Menu, it will get a role from the Menu */
    const {
      listLabelledBy,
      listRole,
      selectionVariant: containerSelectionVariant, // TODO: Remove after DropdownMenu2 deprecation
    } = React.useContext(ActionListContainerContext);

    return (
      <ul
        aria-labelledby={listLabelledBy}
        className={clsx(
          className,
          styles.list,
          variant === "inset" && styles.inset,
        )}
        role={role || listRole}
        {...props}
        ref={forwardedRef}
      >
        <ListContext.Provider
          value={{
            variant,
            selectionVariant: selectionVariant || containerSelectionVariant,
            showDividers,
            role: role || listRole,
          }}
        >
          {props.children}
        </ListContext.Provider>
      </ul>
    );
  },
);

List.displayName = "ActionList";
