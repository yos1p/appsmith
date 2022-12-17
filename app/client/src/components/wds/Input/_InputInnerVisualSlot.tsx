import clsx from "clsx";
import React from "react";
import { Spinner } from "../Spinner";

import styles from "./styles.module.css";

const InputInnerVisualSlot: React.FC<{
  /** Whether the input is expected to ever show a loading indicator */
  hasLoadingIndicator: boolean;
  /** Whether the to show the loading indicator */
  showLoadingIndicator?: boolean;
  /** Which side of this visual is being rendered */
  visualPosition: "leading" | "trailing";
}> = ({
  children,
  hasLoadingIndicator,
  showLoadingIndicator,
  visualPosition,
}) => {
  if (
    (!children && !hasLoadingIndicator) ||
    (visualPosition === "leading" && !children && !showLoadingIndicator)
  ) {
    return null;
  }

  if (!hasLoadingIndicator) {
    return <span className={styles.icon}>{children}</span>;
  }

  return (
    <span className={styles.icon}>
      <div className="relative flex">
        {children && (
          <div className={clsx(showLoadingIndicator ? "invisible" : "visible")}>
            {children}
          </div>
        )}
        <Spinner
          className={clsx(
            children
              ? `absolute top-0 bottom-0 ${
                  showLoadingIndicator ? "visible" : "invisible"
                } ${visualPosition === "leading" ? "left-0" : "right-0"}`
              : showLoadingIndicator
              ? "visible"
              : "invisible",
          )}
        />
      </div>
    </span>
  );
};

export default InputInnerVisualSlot;
