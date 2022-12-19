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

const CheckboxGroupShowcase = (props: Props) => {
  const { primaryColor } = props;
  const { controls, state } = useControls({
    controls: [
      ["input", "label", "Label"],
      ["select", "labelPosition", "right", ["left", "right"]],
      ["select", "orientation", "horizontal", ["horizontal", "vertical"]],
      ["checkbox", "isLoading", false],
      ["checkbox", "isDisabled", false],
    ],
  });

  const commonProps = {
    accentColor: primaryColor,
  };

  const { label, orientation, ...rest } = state;

  return (
    <Showcase settings={controls} title="Checkbox">
      <Checkbox.Group label={label} orientation={orientation}>
        <Checkbox
          accentColor={primaryColor}
          label="Option 1"
          value="1"
          {...rest}
        />
        <Checkbox
          accentColor={primaryColor}
          label="Option 2"
          value="2"
          {...rest}
        />
        <Checkbox
          accentColor={primaryColor}
          label="Option 3"
          value="3"
          {...rest}
        />
      </Checkbox.Group>
    </Showcase>
  );
};

export default CheckboxGroupShowcase;
