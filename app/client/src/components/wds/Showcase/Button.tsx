import React from "react";

import Button from "components/wds/Button";
import Icon from "components/wds/Icon";

type Props = {
  primaryColor: string;
  loading: boolean;
};

const ButtonShowcase = (props: Props) => {
  const { loading, primaryColor } = props;

  const commonProps = {
    accentColor: primaryColor,
    className: "w-28 h-8",
  };

  return (
    <div className="">
      <h2 className="my-2 text-xl font-semibold">Buttons</h2>
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button {...commonProps} variant="filled">
            Primary
          </Button>
          <Button {...commonProps} variant="outline">
            Outline
          </Button>
          <Button {...commonProps} variant="light">
            Light
          </Button>
          <Button {...commonProps} variant="subtle">
            Subtle
          </Button>
          <Button {...commonProps} variant="link">
            Link
          </Button>
          <Button {...commonProps} isDisabled>
            Disabled
          </Button>
          <Button {...commonProps} trailingIcon={<Icon name="plus" />}>
            Trailing Icon
          </Button>
          <Button {...commonProps} leadingIcon={<Icon name="plus" />}>
            Leading Icon
          </Button>
          <Button {...commonProps} isLoading={loading}>
            Loading
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
