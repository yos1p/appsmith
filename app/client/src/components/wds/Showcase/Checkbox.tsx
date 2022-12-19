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

const CheckboxShowcase = (props: Props) => {
  const { primaryColor } = props;
  const { controls, state } = useControls({
    controls: [
      ["input", "label", "Label"],
      ["select", "labelPosition", "right", ["left", "right"]],
      ["checkbox", "isLoading", false],
      ["checkbox", "isDisabled", false],
    ],
  });

  const commonProps = {
    accentColor: primaryColor,
  };

  const { ...rest } = state;

  return (
    <Showcase settings={controls} title="Checkbox">
      <Checkbox {...commonProps} {...rest} />
    </Showcase>
  );
};

export default CheckboxShowcase;
