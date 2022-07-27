import React, { forwardRef, useContext, useRef } from "react";
import {
  useOnEscapePress,
  useOnOutsideClick,
  useProvidedRefOrCreate,
  useProvidedStateOrCreate,
} from "../hooks";
import { useCombinedRefs } from "../hooks/useCombinedRefs";

import styles from "./styles.module.css";
import Button, { ButtonProps } from "../Button";
import { useFocusTrap } from "../hooks/useFocusTrap";

const noop = () => null;

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/
type DialogContextProps = {
  isOpen?: boolean;
  onOpen(): void;
  onClose(): void;
  onOpenChange?(open: boolean): void;
  initialFocusRef?: React.RefObject<HTMLElement>;
  anchorRef?: React.RefObject<HTMLElement>;
  children?: JSX.Element | JSX.Element[];
};

const DialogContext = React.createContext<DialogContextProps>({
  isOpen: false,
  onOpen: noop,
  onClose: noop,
});

export type DialogProps = Pick<
  DialogContextProps,
  "children" | "isOpen" | "onOpenChange" | "anchorRef"
>;

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/
const Dialog: React.FC<DialogProps> = ({
  anchorRef: providedAnchorRef,
  children,
  isOpen: providedIsOpen,
  onOpenChange,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useProvidedStateOrCreate(
    providedIsOpen,
    onOpenChange,
    false,
  );
  const onOpen = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const anchorRef = useProvidedRefOrCreate(providedAnchorRef);

  // on click of dialog trigger button or anchor
  const onAnchorClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (!isOpen) {
        onOpen();
      } else {
        onClose();
      }
    },
    [isOpen, onOpen, onClose],
  );

  // 🚨 Hack for good API!
  // we strip out Anchor and DialogButton from children and pass it to AnchoredOverlay to render
  // with additional props for accessibility
  const contents = React.Children.map(children, (child: any) => {
    if (child.type === DialogButton || child.type === Trigger) {
      return React.cloneElement(child, {
        onClick: onAnchorClick,
      });
    }
    return child;
  });

  return (
    <DialogContext.Provider
      value={{
        anchorRef,
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {contents}
    </DialogContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dialog Triggers
 * -----------------------------------------------------------------------------------------------*/

export type DialogTriggerProps = { children: React.ReactElement };

const Trigger = React.forwardRef<
  React.RefObject<HTMLElement>,
  DialogTriggerProps
>(({ children, ...anchorProps }, anchorRef) => {
  return React.cloneElement(children, { ...anchorProps, ref: anchorRef });
});

const DialogButton = React.forwardRef<
  React.RefObject<HTMLElement>,
  ButtonProps
>((props, anchorRef) => {
  return (
    <Trigger ref={anchorRef}>
      <Button {...props} />
    </Trigger>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Dialog Content
 * -----------------------------------------------------------------------------------------------*/

type DialogContentProps = {
  initialFocusRef?: React.RefObject<HTMLElement>;
  returnFocusRef?: React.RefObject<HTMLElement>;
  children?: JSX.Element | JSX.Element[];
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, initialFocusRef, returnFocusRef, ...props }, forwardedRef) => {
    const overlayRef = useRef(null);
    const closeButtonRef = useRef(null);
    const context = useContext(DialogContext);
    const modalRef = useCombinedRefs(forwardedRef);

    const onCloseClick = () => {
      context.onClose();
      if (returnFocusRef && returnFocusRef.current) {
        returnFocusRef.current.focus();
      }
    };

    // trap focus within the dialog
    useFocusTrap({
      containerRef: modalRef,
      disabled: !context.isOpen,
      restoreFocusOnCleanUp: true,
      initialFocusRef: initialFocusRef,
    });

    // on escape press, close the dialog
    useOnEscapePress(context.onClose);

    // on click outside of the dialog, close it
    useOnOutsideClick({
      containerRef: modalRef,
      onClickOutside: context.onClose,
    });

    return context.isOpen ? (
      <>
        <span className={styles.overlay} ref={overlayRef} />
        <div
          aria-modal="true"
          className={styles.base}
          ref={modalRef}
          role="dialog"
          tabIndex={-1}
          {...props}
        >
          <button onClick={onCloseClick} ref={closeButtonRef} />
          {children}
        </div>
      </>
    ) : null;
  },
);

Dialog.displayName = "Dialog";

// export type DialogProps = ComponentProps<typeof Dialog>;
export default Object.assign(Dialog, {
  Button: DialogButton,
  Trigger,
  Content: DialogContent,
});
