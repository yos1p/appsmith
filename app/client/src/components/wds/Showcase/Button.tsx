import React, { useState, PropsWithChildren } from "react";

import Button, { ButtonProps } from "components/wds/Button";
import Icon from "components/wds/Icon";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { TextInput } from "../TextInput/TextInput";
import { NativeSelect } from "../NativeSelect";
import Showcase, { useControls } from "./Showcase";

type Props = {
  primaryColor: string;
  loading: boolean;
};

const ButtonShowcase = (props: Props) => {
  const { primaryColor } = props;
  const { controls, state } = useControls({
    controls: [
      [
        "select",
        "variant",
        "filled",
        ["filled", "outline", "light", "white", "link", "subtle"],
      ],
      ["input", "label", "Label"],
      [
        "select",
        "icon",
        "none",
        ["none", "plus", "pencil", "close", "spinner"],
      ],
      ["checkbox", "isLoading", false],
      ["checkbox", "isDisabled", false],
    ],
  });

  const commonProps = {
    accentColor: primaryColor,
  };

  const { icon, label, ...rest } = state;

  return (
    <Showcase settings={controls} title="Button">
      <div
        style={{
          height: 32,
          width: 180,
        }}
      >
        <Button {...commonProps} {...rest} type="button">
          {label}
        </Button>
      </div>
    </Showcase>
  );
};

export default ButtonShowcase;
