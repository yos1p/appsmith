import React, { useEffect, useRef } from "react";
import {
  useScrollLock,
  useFocusTrap,
  useFocusReturn,
  useId,
  useWindowEvent,
  useMergedRef,
} from "@mantine/hooks";
import { CloseButton } from "../CloseButton";
import { Text } from "../Text";
import { Paper } from "../Paper";
import { Overlay } from "../Overlay";
import { OptionalPortal } from "../Portal";
import { Box } from "../Box";
import { GroupedTransition, MantineTransition } from "../Transition";
import useStyles, { ModalStylesParams } from "./Modal.styles";

export type ModalStylesNames = Selectors<typeof useStyles>;

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  /** Mounts modal if true */
  opened: boolean;

  /** Called when close button clicked and when escape key is pressed */
  onClose(): void;

  /** Modal title, displayed in header before close button */
  title?: React.ReactNode;

  /** Modal z-index property */
  zIndex?: React.CSSProperties["zIndex"];

  /** Control vertical overflow behavior */
  overflow?: "outside" | "inside";

  /** Hides close button if set to false, modal still can be closed with escape key and by clicking outside */
  withCloseButton?: boolean;

  /** Overlay opacity */
  overlayOpacity?: number;

  /** Overlay color */
  overlayColor?: string;

  /** Overlay blur in px */
  overlayBlur?: number;

  /** Determines whether the modal should take the entire screen */
  fullScreen?: boolean;

  /** Modal body width */
  size?: string | number;

  /** Close button aria-label */
  closeButtonLabel?: string;

  /** id base, used to generate ids to connect modal title and body with aria- attributes, defaults to random id */
  id?: string;

  /** Should modal be closed when outside click was registered? */
  closeOnClickOutside?: boolean;

  /** Should modal be closed when escape is pressed? */
  closeOnEscape?: boolean;

  /** Disables focus trap */
  trapFocus?: boolean;

  /** Controls if modal should be centered */
  centered?: boolean;

  /** Determines whether scroll should be locked when modal is opened, defaults to true */
  lockScroll?: boolean;

  /** Target element or selector where modal portal should be rendered */
  target?: HTMLElement | string;

  /** Determines whether modal should be rendered within Portal, defaults to true */
  withinPortal?: boolean;

  /** Determines whether focus should be returned to the last active element when drawer is closed */
  withFocusReturn?: boolean;
}

const defaultProps: Partial<ModalProps> = {
  size: "md",
  overflow: "outside",
  closeOnClickOutside: true,
  closeOnEscape: true,
  trapFocus: true,
  withCloseButton: true,
  withinPortal: true,
  lockScroll: true,
  withFocusReturn: true,
  overlayBlur: 0,
};

export function Modal(props: ModalProps) {
  const {
    centered,
    children,
    closeButtonLabel,
    closeOnClickOutside,
    closeOnEscape,
    fullScreen,
    id,
    lockScroll: shouldLockScroll,
    onClose,
    opened,
    overflow,
    overlayBlur,
    overlayColor,
    overlayOpacity,
    size,
    target,
    title,
    trapFocus,
    withCloseButton,
    withFocusReturn,
    withinPortal,
    zIndex,
    ...others
  } = props;
  const baseId = useId(id);
  const titleId = `${baseId}-title`;
  const bodyId = `${baseId}-body`;
  const focusTrapRef = useFocusTrap(trapFocus && opened);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(focusTrapRef, overlayRef);

  const _overlayOpacity =
    typeof overlayOpacity === "number"
      ? overlayOpacity
      : theme.colorScheme === "dark"
      ? 0.85
      : 0.75;

  useScrollLock(shouldLockScroll && opened);

  const closeOnEscapePress = (event: KeyboardEvent) => {
    if (!trapFocus && event.key === "Escape" && closeOnEscape) {
      onClose();
    }
  };

  useEffect(() => {
    if (!trapFocus) {
      window.addEventListener("keydown", closeOnEscapePress);
      return () => window.removeEventListener("keydown", closeOnEscapePress);
    }

    return undefined;
  }, [trapFocus]);

  useFocusReturn({ opened, shouldReturnFocus: trapFocus && withFocusReturn });

  const clickTarget = useRef<EventTarget>(null);

  useWindowEvent("mousedown", (e) => {
    clickTarget.current = e.target;
  });

  const handleOutsideClick = () => {
    if (clickTarget.current === overlayRef.current) {
      closeOnClickOutside && onClose();
    }
  };

  return (
    <OptionalPortal target={target} withinPortal={withinPortal}>
      <GroupedTransition
        duration={transitionDuration}
        exitDuration={exitTransitionDuration}
        mounted={opened}
        timingFunction={transitionTimingFunction}
        transitions={{
          modal: {
            duration: transitionDuration,
            transition: transition || (fullScreen ? "fade" : "pop"),
          },
          overlay: {
            duration: transitionDuration / 2,
            transition: "fade",
            timingFunction: "ease",
          },
        }}
      >
        {(transitionStyles) => (
          <Box className={cx(classes.root, className)} id={baseId} {...others}>
            <div style={transitionStyles.overlay}>
              <Overlay
                blur={overlayBlur}
                className={classes.overlay}
                color={
                  overlayColor ||
                  (theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.black)
                }
                opacity={_overlayOpacity}
                sx={{ position: "fixed" }}
                unstyled={unstyled}
                zIndex={0}
              />
            </div>
            <div
              className={classes.inner}
              onClick={handleOutsideClick}
              onKeyDown={(event) => {
                const shouldTrigger =
                  (event.target as any)?.getAttribute(
                    "data-mantine-stop-propagation",
                  ) !== "true";
                shouldTrigger &&
                  event.key === "Escape" &&
                  closeOnEscape &&
                  onClose();
              }}
              ref={mergedRef}
              role="presentation"
            >
              <Paper<"div">
                aria-describedby={bodyId}
                aria-labelledby={titleId}
                aria-modal
                className={classes.modal}
                onClick={(event) => event.stopPropagation()}
                p={padding}
                radius={radius}
                role="dialog"
                shadow={shadow}
                style={transitionStyles.modal}
                tabIndex={-1}
                unstyled={unstyled}
              >
                {(title || withCloseButton) && (
                  <div className={classes.header}>
                    <Text className={classes.title} id={titleId}>
                      {title}
                    </Text>

                    {withCloseButton && (
                      <CloseButton
                        aria-label={closeButtonLabel}
                        className={classes.close}
                        iconSize={16}
                        onClick={onClose}
                      />
                    )}
                  </div>
                )}

                <div className={classes.body} id={bodyId}>
                  {children}
                </div>
              </Paper>
            </div>
          </Box>
        )}
      </GroupedTransition>
    </OptionalPortal>
  );
}

Modal.displayName = "@mantine/core/Modal";
