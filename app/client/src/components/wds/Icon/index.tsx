import React, { useMemo } from "react";
import PlusIcon from "remixicon-react/AddFillIcon";
import PencilIcon from "remixicon-react/PencilFillIcon";
import SpinnerIcon from "remixicon-react/Loader2FillIcon";
import CloseIcon from "remixicon-react/CloseFillIcon";
import ChevronDownIcon from "remixicon-react/ArrowDownSLineIcon";

type IconProps = {
  className?: string;
  name?: string;
};

const Icon: React.FC<IconProps> = ({ children, className, name, ...rest }) => {
  const ComputedIcon = useMemo(() => {
    switch (name) {
      case "plus":
        return PlusIcon;
      case "pencil":
        return PencilIcon;
      case "spinner":
        return SpinnerIcon;
      case "close":
        return CloseIcon;
      case "chevron-down":
        return ChevronDownIcon;
      default:
        return null;
    }
  }, [name]);

  if (!ComputedIcon) return null;

  return (
    <ComputedIcon className={`h-5 w-5 fill-current ${className}`} {...rest} />
  );
};

export default Icon;
