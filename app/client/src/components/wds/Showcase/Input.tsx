import React, { useState, PropsWithChildren } from "react";

import { Checkbox } from "../Checkbox/Checkbox";
import { TextInput } from "../TextInput/TextInput";
import { NativeSelect } from "../NativeSelect";
import Showcase from "./Showcase";

type Props = {
  primaryColor: string;
  loading: boolean;
};

const InputShowcase = (props: Props) => {
  const { primaryColor } = props;
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("Label");
  const [variant, setVariant] = useState("filled");
  const [disabled, setDisabled] = useState(false);
  const [icon, setIcon] = useState("none");

  const commonProps = {
    accentColor: primaryColor,
    className: "!w-28 !h-8",
  };

  return (
    <Showcase
      settings={
        <>
          <TextInput
            defaultValue={label}
            label="Label"
            labelPosition="top"
            onChange={(e) => setLabel(e.target.value)}
          />
          <NativeSelect
            data={["filled", "outline", "light", "white", "link", "subtle"]}
            defaultValue="filled"
            label="Variant"
            onChange={(e) => setVariant(e.target.value)}
          />
          <NativeSelect
            data={["none", "plus", "pencil", "close", "spinner"]}
            defaultValue="none"
            label="Icon"
            onChange={(e) => setIcon(e.target.value)}
          />
          <Checkbox
            label="Loading"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoading(e.target.checked)
            }
          />
          <Checkbox
            label="Disabled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDisabled(e.target.checked)
            }
          />
        </>
      }
      title="TextInput"
    >
      <TextInput
        label={label}
        {...commonProps}
        disabled={disabled}
        loading={loading}
        placeholder="Placeholder"
      />
    </Showcase>
  );
};

export default InputShowcase;
