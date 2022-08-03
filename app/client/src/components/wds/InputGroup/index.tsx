import React, { useMemo } from "react";

type IconProps = {
  className?: string;
};

const InputGroup: React.FC<IconProps> = ({ children, className, ...rest }) => {
  return <div>{children}</div>;
};

export { InputGroup };
