import React, { KeyboardEventHandler, useCallback } from "react";
import { useSSRSafeId } from "@react-aria/ssr";
import { AnchoredOverlay, AnchoredOverlayProps } from "../AnchoredOverlay";
import { OverlayProps } from "../Overlay";
import {
  useProvidedRefOrCreate,
  useProvidedStateOrCreate,
  useMenuInitialFocus,
  useMnemonics,
} from "../hooks";
import { ActionListContainerContext } from "../ActionList/ActionListContainerContext";
import Button, { ButtonProps } from "../Button";
import { MandateProps } from "../utils/types";

import { Icon } from "../Icon";
import TextInput from "../TextInput";

type MenuContextProps = Pick<
  AnchoredOverlayProps,
  "anchorRef" | "renderAnchor" | "open" | "onOpen" | "onClose" | "anchorId"
>;
const MenuContext = React.createContext<MenuContextProps>({
  renderAnchor: null,
  open: false,
});

export type ActionMenuProps = {
  /**
   * Recommended: `ActionMenu.Button` or `ActionMenu.Anchor` with `ActionMenu.Overlay`
   */
  children: React.ReactElement[] | React.ReactElement;

  /**
   * If defined, will control the open/closed state of the overlay. Must be used in conjunction with `onOpenChange`.
   */
  open?: boolean;

  /**
   * If defined, will control the open/closed state of the overlay. Must be used in conjunction with `open`.
   */
  onOpenChange?: (s: boolean) => void;
} & Pick<AnchoredOverlayProps, "anchorRef">;

const Menu: React.FC<ActionMenuProps> = ({
  anchorRef: externalAnchorRef,
  children,
  onOpenChange,
  open,
}: ActionMenuProps) => {
  const [combinedOpenState, setCombinedOpenState] = useProvidedStateOrCreate(
    open,
    onOpenChange,
    false,
  );
  const onOpen = React.useCallback(() => setCombinedOpenState(true), [
    setCombinedOpenState,
  ]);
  const onClose = React.useCallback(() => setCombinedOpenState(false), [
    setCombinedOpenState,
  ]);

  const anchorRef = useProvidedRefOrCreate(externalAnchorRef);
  const anchorId = useSSRSafeId();
  let renderAnchor: AnchoredOverlayProps["renderAnchor"] = null;

  // 🚨 Hack for good API!
  // we strip out Anchor from children and pass it to AnchoredOverlay to render
  // with additional props for accessibility
  const contents = React.Children.map(children, (child) => {
    if (child.type === SelectButton || child.type === Anchor) {
      renderAnchor = (anchorProps) => React.cloneElement(child, anchorProps);
      return null;
    }
    return child;
  });

  return (
    <MenuContext.Provider
      value={{
        anchorRef,
        renderAnchor,
        anchorId,
        open: combinedOpenState,
        onOpen,
        onClose,
      }}
    >
      {contents}
    </MenuContext.Provider>
  );
};

export type SelectMenuAnchorProps = { children: React.ReactElement };
const Anchor = React.forwardRef<
  AnchoredOverlayProps["anchorRef"],
  SelectMenuAnchorProps
>(({ children, ...anchorProps }, anchorRef) => {
  return React.cloneElement(children, { ...anchorProps, ref: anchorRef });
});

/** this component is syntactical sugar 🍭 */
export type SelectMenuButtonProps = ButtonProps;
const SelectButton = React.forwardRef<
  AnchoredOverlayProps["anchorRef"],
  SelectMenuButtonProps
>(({ ...props }, anchorRef) => {
  return (
    <Anchor ref={anchorRef}>
      <Button trailingIcon={<Icon name="plus" />} type="button" {...props} />
    </Anchor>
  );
});

type MenuOverlayProps = Partial<OverlayProps> &
  Pick<AnchoredOverlayProps, "align"> & {
    /**
     * Recommended: `ActionList`
     */
    children: React.ReactElement[] | React.ReactElement;
    filterValue?: string;
    // onFilterChange: (
    //   value: string,
    //   e: React.ChangeEvent<HTMLInputElement>,
    // ) => void;
  };
const Overlay: React.FC<MenuOverlayProps> = ({
  align = "start",
  children,
  filterValue: externalFilterValue,
  // onFilterChange,
  ...overlayProps
}) => {
  // we typecast anchorRef as required instead of optional
  // because we know that we're setting it in context in Menu
  const {
    anchorId,
    anchorRef,
    onClose,
    onOpen,
    open,
    renderAnchor,
  } = React.useContext(MenuContext) as MandateProps<
    MenuContextProps,
    "anchorRef"
  >;

  const [filterValue, setInternalFilterValue] = useProvidedStateOrCreate(
    externalFilterValue,
    undefined,
    "",
  );
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // onFilterChange(value, e);
      setInternalFilterValue(value);
    },
    [setInternalFilterValue],
  );
  const containerRef = React.createRef<HTMLDivElement>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const activeDescendantRef = React.useRef<HTMLElement>();
  const onInputKeyPress: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === "Enter" && activeDescendantRef.current) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();

        // Forward Enter key press to active descendant so that item gets activated
        const activeDescendantEvent = new KeyboardEvent(
          event.type,
          event.nativeEvent,
        );
        activeDescendantRef.current.dispatchEvent(activeDescendantEvent);
      }
    },
    [activeDescendantRef],
  );

  useMnemonics(open, containerRef);

  return (
    <AnchoredOverlay
      align={align}
      anchorId={anchorId}
      anchorRef={anchorRef}
      focusTrapSettings={{
        initialFocusRef: inputRef,
      }}
      focusZoneSettings={{
        containerRef: containerRef,
        focusOutBehavior: "wrap",
        focusableElementFilter: (element) => {
          return !(element instanceof HTMLInputElement);
        },
        activeDescendantFocus: inputRef,
        onActiveDescendantChanged: (current, previous, directlyActivated) => {
          activeDescendantRef.current = current;
        },
      }}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      overlayProps={overlayProps}
      renderAnchor={renderAnchor}
    >
      <TextInput
        onChange={onInputChange}
        onKeyPress={onInputKeyPress}
        ref={inputRef}
      />
      <div ref={containerRef}>
        <ActionListContainerContext.Provider
          value={{
            container: "ActionMenu",
            listRole: "menu",
            listLabelledBy: anchorId,
            selectionAttribute: "aria-checked", // Should this be here?
            afterSelect: onClose,
          }}
        >
          {children}
        </ActionListContainerContext.Provider>
      </div>
    </AnchoredOverlay>
  );
};

Menu.displayName = "ActionMenu";
export const Select = Object.assign(Menu, {
  Button: SelectButton,
  Anchor,
  Overlay,
});
