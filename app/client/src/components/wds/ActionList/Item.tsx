import { ForwardRefComponent as PolymorphicForwardRefComponent } from "@radix-ui/react-polymorphic";
import clsx from "clsx";
import React, { CSSProperties, PropsWithChildren } from "react";
import { useProvidedIdOrCreate } from "../hooks/useProvidedIdOrCreate";
import createSlots from "../utils/create-slots";
import { AriaRole } from "../utils/types";
import { ActionListContainerContext } from "./ActionListContainerContext";
import { ActionListGroupProps, GroupContext } from "./Group";
import { ActionListProps, ListContext } from "./List";
import { Selection } from "./Selection";

import styles from "./styles.module.css";

export const getVariantStyles = (
  variant: ActionListItemProps["variant"],
  disabled: ActionListItemProps["disabled"],
) => {
  if (disabled) {
    return {
      color: "primer.fg.disabled",
      iconColor: "primer.fg.disabled",
      annotationColor: "primer.fg.disabled",
    };
  }

  switch (variant) {
    case "danger":
      return {
        color: "danger.fg",
        iconColor: "danger.fg",
        annotationColor: "fg.muted",
        hoverColor: "actionListItem.danger.hoverText",
      };
    default:
      return {
        color: "fg.default",
        iconColor: "fg.muted",
        annotationColor: "fg.muted",
        hoverColor: "fg.default",
      };
  }
};

export type ActionListItemProps = {
  /**
   * Primary content for an Item
   */
  children?: React.ReactNode;
  /**
   * Callback that will trigger both on click selection and keyboard selection.
   */
  onSelect?: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
  /**
   * Is the `Item` is currently selected?
   */
  selected?: boolean;
  /**
   * Indicate whether the item is active. There should never be more than one active item.
   */
  active?: boolean;
  /**
   * Style variations associated with various `Item` types.
   *
   * - `"default"` - An action `Item`.
   * - `"danger"` - A destructive action `Item`.
   */
  variant?: "default" | "danger";
  /**
   * Items that are disabled can not be clicked, selected, or navigated through.
   */
  disabled?: boolean;
  /**
   * The ARIA role describing the function of `Item` component. `option` is a common value.
   */
  role?: AriaRole;
  /**
   * id to attach to the root element of the Item
   */
  id?: string;
  /**
   * Private API for use internally only. Used by LinkItem to wrap contents in an anchor
   */
  _PrivateItemWrapper?: React.FC;

  className?: string;
};

const { Slot, Slots } = createSlots([
  "LeadingVisual",
  "InlineDescription",
  "BlockDescription",
  "TrailingVisual",
]);
export { Slot };
export type ItemContext = Pick<ActionListItemProps, "variant" | "disabled"> & {
  inlineDescriptionId: string;
  blockDescriptionId: string;
};

export const TEXT_ROW_HEIGHT = "20px"; // custom value off the scale

export const Item = React.forwardRef<HTMLLIElement, ActionListItemProps>(
  (
    {
      variant = "default",
      disabled = false,
      selected = undefined,
      active = false,
      onSelect,
      id,
      role,
      _PrivateItemWrapper,
      className,
      ...props
    },
    forwardedRef,
  ): JSX.Element => {
    const {
      selectionVariant: listSelectionVariant,
      showDividers,
      variant: listVariant,
    } = React.useContext(ListContext);
    const { selectionVariant: groupSelectionVariant } = React.useContext(
      GroupContext,
    );
    const { afterSelect, container, selectionAttribute } = React.useContext(
      ActionListContainerContext,
    );

    let selectionVariant:
      | ActionListProps["selectionVariant"]
      | ActionListGroupProps["selectionVariant"];
    if (typeof groupSelectionVariant !== "undefined")
      selectionVariant = groupSelectionVariant;
    else selectionVariant = listSelectionVariant;

    /** Infer item role based on the container */
    let itemRole: ActionListItemProps["role"];
    if (container === "ActionMenu" || container === "DropdownMenu") {
      if (selectionVariant === "single") itemRole = "menuitemradio";
      else if (selectionVariant === "multiple") itemRole = "menuitemcheckbox";
      else itemRole = "menuitem";
    }

    const clickHandler = React.useCallback(
      (event) => {
        if (disabled) return;
        if (!event.defaultPrevented) {
          if (typeof onSelect === "function") onSelect(event);
          // if this Item is inside a Menu, close the Menu
          if (typeof afterSelect === "function") afterSelect();
        }
      },
      [onSelect, disabled, afterSelect],
    );

    const keyPressHandler = React.useCallback(
      (event) => {
        if (disabled) return;
        if (!event.defaultPrevented && [" ", "Enter"].includes(event.key)) {
          if (typeof onSelect === "function") onSelect(event);
          // if this Item is inside a Menu, close the Menu
          if (typeof afterSelect === "function") afterSelect();
        }
      },
      [onSelect, disabled, afterSelect],
    );

    // use props.id if provided, otherwise generate one.
    const labelId = useProvidedIdOrCreate(id);
    const inlineDescriptionId = useProvidedIdOrCreate(
      id && `${id}--inline-description`,
    );
    const blockDescriptionId = useProvidedIdOrCreate(
      id && `${id}--block-description`,
    );

    const ItemWrapper = _PrivateItemWrapper || React.Fragment;

    return (
      <Slots
        context={{ variant, disabled, inlineDescriptionId, blockDescriptionId }}
      >
        {(slots) => (
          <li
            aria-describedby={
              slots.BlockDescription ? blockDescriptionId : undefined
            }
            aria-disabled={disabled ? true : undefined}
            aria-labelledby={`${labelId} ${
              slots.InlineDescription ? inlineDescriptionId : ""
            }`}
            onClick={clickHandler}
            onKeyPress={keyPressHandler}
            ref={forwardedRef}
            role={role || itemRole}
            tabIndex={disabled || _PrivateItemWrapper ? undefined : 0}
            {...(selectionAttribute && { [selectionAttribute]: selected })}
            className={clsx(
              styles.item,
              className,
              listVariant === "inset" && styles.inset,
            )}
            style={
              {
                "--divider-width": showDividers ? "1px" : 0,
              } as CSSProperties
            }
            {...props}
          >
            <ItemWrapper>
              <Selection selected={selected} />
              {slots.LeadingVisual}
              <div
                className="flex flex-col min-w-0 grow"
                data-component="ActionList.Item--DividerContainer"
              >
                <ConditionalBox
                  className="flex grow"
                  if={Boolean(slots.TrailingVisual)}
                >
                  <ConditionalBox
                    className="flex items-baseline min-w-0 grow"
                    if={Boolean(slots.InlineDescription)}
                  >
                    <span
                      className={clsx(slots.InlineDescription ? "" : "grow")}
                      id={labelId}
                    >
                      {props.children}
                    </span>
                    {slots.InlineDescription}
                  </ConditionalBox>
                  {slots.TrailingVisual}
                </ConditionalBox>
                {slots.BlockDescription}
              </div>
            </ItemWrapper>
          </li>
        )}
      </Slots>
    );
  },
) as PolymorphicForwardRefComponent<"li", ActionListItemProps>;

Item.displayName = "ActionList.Item";

type ConditionalBoxProps = {
  if: boolean;
  children?: any;
  className?: string;
};

const ConditionalBox = (props: ConditionalBoxProps) => {
  const { if: condition, ...rest } = props;

  if (condition) return <div {...rest}>{props.children}</div>;
  else return props.children;
};
