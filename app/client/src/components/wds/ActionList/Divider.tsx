import React from "react";

export type ActionListDividerProps = unknown;

/**
 * Visually separates `Item`s or `Group`s in an `ActionList`.
 */
export const Divider: React.FC<ActionListDividerProps> = () => {
  return <li aria-hidden="true" data-component="ActionList.Divider" />;
};
