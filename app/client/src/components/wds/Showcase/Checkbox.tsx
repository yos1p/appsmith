import React from "react";

import { Checkbox } from "components/wds/Checkbox/Checkbox";

type Props = {
  primaryColor: string;
  loading: boolean;
};

const CheckboxShowcase = (props: Props) => {
  const { loading, primaryColor } = props;

  const commonProps = {
    accentColor: primaryColor,
    className: "w-28 h-8",
  };

  return (
    <div className="">
      <h2 className="my-2 text-xl font-semibold">Checkbox</h2>
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Checkbox accentColor={primaryColor} label="This is checkbox label" />
          <Checkbox.Group
            defaultValue={["1"]}
            label="Options"
            labelPosition="top"
          >
            <Checkbox accentColor={primaryColor} label="option 1" value="1" />
            <Checkbox accentColor={primaryColor} label="option 2" value="2" />
          </Checkbox.Group>
          <Checkbox.Group
            defaultValue={["2"]}
            label="Options"
            labelPosition="left"
            orientation="vertical"
          >
            <Checkbox accentColor={primaryColor} label="option 1" value="1" />
            <Checkbox accentColor={primaryColor} label="option 2" value="2" />
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
};

export default CheckboxShowcase;
