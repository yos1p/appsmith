import React from "react";
import { AriaRole } from "../utils/types";
import { ListContext, ActionListProps } from "./List";
import { useProvidedIdOrCreate } from "../hooks/useProvidedIdOrCreate";

export type ActionListGroupProps = {
  /**
   * Style variations. Usage is discretionary.
   *
   * - `"filled"` - Superimposed on a background, offset from nearby content
   * - `"subtle"` - Relatively less offset from nearby content
   */
  variant?: "subtle" | "filled";
  /**
   * Primary text which names a `Group`.
   */
  title?: string;
  /**
   * Secondary text which provides additional information about a `Group`.
   */
  auxiliaryText?: string;
  /**
   * The ARIA role describing the function of the list inside `Group` component. `listbox` or `menu` are a common values.
   */
  role?: AriaRole;
} & {
  /**
   * Whether multiple Items or a single Item can be selected in the Group. Overrides value on ActionList root.
   */
  selectionVariant?: ActionListProps["selectionVariant"] | false;
};

type ContextProps = Pick<ActionListGroupProps, "selectionVariant">;
export const GroupContext = React.createContext<ContextProps>({});

export const Group: React.FC<ActionListGroupProps> = ({
  auxiliaryText,
  role,
  selectionVariant,
  title,
  variant = "subtle",
  ...props
}) => {
  const labelId = useProvidedIdOrCreate();
  const { role: listRole } = React.useContext(ListContext);

  return (
    <li role={listRole ? "none" : undefined} {...props}>
      {title && (
        <Header
          auxiliaryText={auxiliaryText}
          labelId={labelId}
          title={title}
          variant={variant}
        />
      )}
      <GroupContext.Provider value={{ selectionVariant }}>
        <ul
          aria-labelledby={title ? labelId : undefined}
          role={role || (listRole && "group")}
        >
          {props.children}
        </ul>
      </GroupContext.Provider>
    </li>
  );
};

export type HeaderProps = Pick<
  ActionListGroupProps,
  "variant" | "title" | "auxiliaryText"
> & {
  labelId: string;
};

/**
 * Displays the name and description of a `Group`.
 *
 * For visual presentation only. It's hidden from screen readers.
 */
const Header: React.FC<HeaderProps> = ({
  auxiliaryText,
  labelId,
  title,
  variant,
  ...props
}) => {
  const { variant: listVariant } = React.useContext(ListContext);

  // const styles = {
  //   paddingY: "6px",
  //   paddingX: listVariant === "full" ? 2 : 3,
  //   fontSize: 0,
  //   fontWeight: "bold",
  //   color: "fg.muted",
  //   ...(variant === "filled" && {
  //     backgroundColor: "canvas.subtle",
  //     marginX: 0,
  //     marginBottom: 2,
  //     borderTop: "1px solid",
  //     borderBottom: "1px solid",
  //     borderColor: "neutral.muted",
  //   }),
  // };

  return (
    <div aria-hidden="true" role="presentation" {...props}>
      <span id={labelId}>{title}</span>
      {auxiliaryText && <span>{auxiliaryText}</span>}
    </div>
  );
};
