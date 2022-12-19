import React, { useState, PropsWithChildren } from "react";

import { TextInput } from "../TextInput/TextInput";
import Showcase, { useControls } from "./Showcase";

type Props = {
  primaryColor: string;
  loading: boolean;
};

const TextInputShowcase = (props: Props) => {
  const { primaryColor } = props;
  const { controls, state } = useControls({
    controls: [
      ["input", "label", "Label"],
      ["select", "labelPosition", "top", ["top", "left"]],
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
      <TextInput {...rest} />
    </Showcase>
  );
};

export default TextInputShowcase;
