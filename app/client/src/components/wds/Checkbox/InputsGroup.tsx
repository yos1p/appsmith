import React from "react";
import cx from "clsx";

type InputsGroupProps = {
  orientation: "horizontal" | "vertical";
  role?: string;
  children: React.ReactNode;
  className?: string;
};

export function InputsGroup({
  children,
  className = "",
  orientation,
  role,
}: InputsGroupProps) {
  const computedClassnames = cx({
    flex: true,
    "flex-col": orientation === "vertical",
    [className]: true,
  });

  return (
    <div className={computedClassnames} role={role}>
      {children}
    </div>
  );
}
