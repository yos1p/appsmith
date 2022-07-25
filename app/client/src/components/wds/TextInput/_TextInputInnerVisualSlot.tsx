import React from "react";
import { Spinner } from "../Spinner";
import { TextInputNonPassthroughProps } from "./";

const TextInputInnerVisualSlot: React.FC<{
  /** Whether the input is expected to ever show a loading indicator */
  hasLoadingIndicator: boolean;
  /** Whether the to show the loading indicator */
  showLoadingIndicator: TextInputNonPassthroughProps["loading"];
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
    return <span className="TextInput-icon">{children}</span>;
  }

  return (
    <span className="TextInput-icon">
      <div className="relative flex">
        {children && <div>{children}</div>}
        <Spinner />
      </div>
    </span>
  );
};

export default TextInputInnerVisualSlot;
