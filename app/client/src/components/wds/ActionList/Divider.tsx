import clsx from "clsx";
import React from "react";

import styles from "./styles.module.css";

export type ActionListDividerProps = {
  className?: string;
};

/**
 * Visually separates `Item`s or `Group`s in an `ActionList`.
 */
export const Divider: React.FC<ActionListDividerProps> = (props) => {
  return (
    <li
      aria-hidden="true"
      className={clsx(props.className, styles.divider)}
      data-component="ActionList.Divider"
    />
  );
};
