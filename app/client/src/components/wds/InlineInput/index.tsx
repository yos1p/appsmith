import React from "react";

import styles from "./styles.module.css";

export interface InlineInputProps
  extends React.ComponentPropsWithoutRef<"div"> {
  label: React.ReactNode;
  description: React.ReactNode;
  id: string;
  disabled?: boolean;
  error: React.ReactNode;
  labelPosition: "left" | "right";
}

export function InlineInput({
  children,
  description,
  disabled,
  error,
  id,
  label,
  labelPosition,
  ...others
}: InlineInputProps) {
  return (
    <div {...others}>
      <div className={styles.container}>
        {children}

        <div className="labelWrapper">
          {label && (
            <label className="label" data-disabled={disabled} htmlFor={id}>
              {label}
            </label>
          )}

          {description && <p className={styles.description}>{description}</p>}

          {error && error !== "boolean" && (
            <span className={styles.error}>{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}

InlineInput.displayName = "@appsmith/wds/inline-input";
