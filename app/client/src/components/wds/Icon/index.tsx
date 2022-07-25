import React, { useMemo } from "react";
import PlusIcon from "remixicon-react/AddFillIcon";
import PencilIcon from "remixicon-react/PencilFillIcon";
import SpinnerIcon from "remixicon-react/Loader2FillIcon";
import CloseIcon from "remixicon-react/CloseFillIcon";

type IconProps = {
  className?: string;
  name?: string;
};

const Icon: React.FC<IconProps> = ({ children, className, name, ...rest }) => {
  const ComputedICon = useMemo(() => {
    switch (name) {
      case "plus":
        return PlusIcon;
      case "pencil":
        return PencilIcon;
      case "spinner":
        return SpinnerIcon;
      case "close":
        return CloseIcon;
      default:
        return PlusIcon;
    }
  }, [name]);

  return (
    <ComputedICon className={`h-5 w-5 fill-current ${className}`} {...rest} />
  );
};

export { Icon };
