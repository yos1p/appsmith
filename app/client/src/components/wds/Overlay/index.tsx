import React, {
  ComponentPropsWithRef,
  ReactElement,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { AriaRole, Merge } from "../utils/types";
import { useOnEscapePress, useOverlay } from "../hooks";
import { TouchOrMouseEvent } from "../hooks/useOnOutsideClick";
import Portal from "../Portal";
import { useCombinedRefs } from "../hooks/useCombinedRefs";
import { AnchorSide } from "../behaviours/anchored-position";

import styles from "./styles.module.css";
import { FocusTrapHookSettings, useFocusTrap } from "../hooks/useFocusTrap";
import { FocusZoneHookSettings, useFocusZone } from "../hooks/useFocusZone";
import { useOnOutsideClick } from "../hooks/useOnOutsideClick";

type StyledOverlayProps = {
  width?: keyof typeof widthMap;
  height?: keyof typeof heightMap;
  maxHeight?: keyof Omit<typeof heightMap, "auto" | "initial">;
  visibility?: "visible" | "hidden";
  anchorSide?: AnchorSide;
};

const heightMap = {
  xsmall: "192px",
  small: "256px",
  medium: "320px",
  large: "432px",
  xlarge: "600px",
  auto: "auto",
  initial: "auto", // Passing 'initial' initially applies 'auto'
};

const widthMap = {
  small: "256px",
  medium: "320px",
  large: "480px",
  xlarge: "640px",
  xxlarge: "960px",
  auto: "auto",
};

function getSlideAnimationStartingVector(
  anchorSide?: AnchorSide,
): { x: number; y: number } {
  if (anchorSide?.endsWith("bottom")) {
    return { x: 0, y: -1 };
  } else if (anchorSide?.endsWith("top")) {
    return { x: 0, y: 1 };
  } else if (anchorSide?.endsWith("right")) {
    return { x: -1, y: 0 };
  } else if (anchorSide?.endsWith("left")) {
    return { x: 1, y: 0 };
  }

  return { x: 0, y: 0 };
}

type BaseOverlayProps = {
  ignoreClickRefs?: React.RefObject<HTMLElement>[];
  initialFocusRef?: React.RefObject<HTMLElement>;
  returnFocusRef: React.RefObject<HTMLElement>;
  onClickOutside: (e: TouchOrMouseEvent) => void;
  onEscape: (e: KeyboardEvent) => void;
  visibility?: "visible" | "hidden";
  "data-test-id"?: unknown;
  top?: number;
  left?: number;
  portalContainerName?: string;
  preventFocusOnOpen?: boolean;
  role?: AriaRole;
  children?: React.ReactNode;
  focusTrapSettings?: Partial<FocusTrapHookSettings>;
  focusZoneSettings?: Partial<FocusZoneHookSettings>;
};

type OwnOverlayProps = Merge<StyledOverlayProps, BaseOverlayProps>;

/**
 * An `Overlay` is a flexible floating surface, used to display transient content such as menus,
 * selection options, dialogs, and more. Overlays use shadows to express elevation. The `Overlay`
 * component handles all behaviors needed by overlay UIs as well as the common styles that all overlays * should have.
 * @param ignoreClickRefs Optional. An array of ref objects to ignore clicks on in the `onOutsideClick` behavior. This is often used to ignore clicking on the element that toggles the open/closed state for the `Overlay` to prevent the `Overlay` from being toggled twice.
 * @param initialFocusRef Optional. Ref for the element to focus when the `Overlay` is opened. If nothing is provided, the first focusable element in the `Overlay` body is focused.
 * @param returnFocusRef Required. Ref for the element to focus when the `Overlay` is closed.
 * @param onClickOutside  Required. Function to call when clicking outside of the `Overlay`. Typically this function removes the Overlay.
 * @param onEscape Required. Function to call when user presses `Escape`. Typically this function removes the Overlay.
 * @param width Sets the width of the `Overlay`, pick from our set list of widths, or pass `auto` to automatically set the width based on the content of the `Overlay`. `small` corresponds to `256px`, `medium` corresponds to `320px`, `large` corresponds to `480px`, `xlarge` corresponds to `640px`, `xxlarge` corresponds to `960px`.
 * @param height Sets the height of the `Overlay`, pick from our set list of heights, or pass `auto` to automatically set the height based on the content of the `Overlay`, or pass `initial` to set the height based on the initial content of the `Overlay` (i.e. ignoring content changes). `xsmall` corresponds to `192px`, `small` corresponds to `256px`, `medium` corresponds to `320px`, `large` corresponds to `432px`, `xlarge` corresponds to `600px`.
 * @param maxHeight Sets the maximum height of the `Overlay`, pick from our set list of heights. `xsmall` corresponds to `192px`, `small` corresponds to `256px`, `medium` corresponds to `320px`, `large` corresponds to `432px`, `xlarge` corresponds to `600px`.
 * @param anchorSide If provided, the Overlay will slide into position from the side of the anchor with a brief animation
 * @param top Optional. Vertical position of the overlay, relative to its closest positioned ancestor (often its `Portal`).
 * @param left Optional. Horizontal position of the overlay, relative to its closest positioned ancestor (often its `Portal`).
 * @param portalContainerName Optional. The name of the portal container to render the Overlay into.
 */
const Overlay = React.forwardRef<HTMLDivElement, OwnOverlayProps>(
  (
    {
      anchorSide,
      focusTrapSettings,
      focusZoneSettings,
      height,
      ignoreClickRefs,
      initialFocusRef,
      left,
      onClickOutside,
      onEscape,
      portalContainerName,
      preventFocusOnOpen,
      returnFocusRef,
      role = "none",
      top,
      visibility = "visible",
      ...rest
    },
    forwardedRef,
  ): ReactElement => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(overlayRef, forwardedRef);

    useEffect(() => {
      if (height === "initial" && combinedRef.current?.clientHeight) {
        combinedRef.current.style.height = `${combinedRef.current.clientHeight}px`;
      }
    }, [height, combinedRef]);

    // on escape press, close the dialog
    useOnEscapePress(onEscape);

    // trap focus within the dialog
    useFocusTrap({
      containerRef: combinedRef,
      disabled: !visibility,
      restoreFocusOnCleanUp: true,
      initialFocusRef: initialFocusRef,
      ...focusTrapSettings,
    });

    // allow pressing up/down to move focus within the dialog
    useFocusZone({
      containerRef: combinedRef,
      disabled: !visibility,
      focusOutBehavior: "wrap",
      ...focusZoneSettings,
    });

    // closes the dialog when the user clicks outside of it
    useOnOutsideClick({
      containerRef: combinedRef,
      ignoreClickRefs,
      onClickOutside: onClickOutside,
    });

    return (
      <Portal containerName={portalContainerName}>
        <div
          className={styles.overlay}
          role={role}
          {...rest}
          ref={combinedRef}
          style={
            {
              top: `${top || 0}px`,
              left: `${left || 0}px`,
            } as React.CSSProperties
          }
        />
      </Portal>
    );
  },
);

export type OverlayProps = ComponentPropsWithRef<typeof Overlay>;

Overlay.defaultProps = {
  height: "auto",
  width: "auto",
};

export default Overlay;
