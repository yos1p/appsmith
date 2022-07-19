import React, { useState } from "react";

import { Checkbox } from "components/wds";
import {
  borderRadiusOptions,
  boxShadowOptions,
} from "constants/ThemeConstants";

import CloseLineIcon from "remixicon-react/CloseLineIcon";
import Button from "./Button";
import FormControl from "./FormControl/FormControl";
import CheckboxGroup from "./CheckboxGroup";

function Showcase() {
  const [borderRadius, setBorderRadius] = useState<string | undefined>("0px");
  const [boxShadow, setBoxShadow] = useState<string | undefined>("none");
  const [primaryColor, setPrimaryColor] = useState("#553DE9");

  const checkboxProps = {
    radii: borderRadius,
    accentColor: primaryColor,
  };

  return (
    <div className="container min-h-screen pt-12 mx-auto">
      <h1 className="mt-12 space-y-8 text-3xl font-bold">
        Widgets Design System
      </h1>

      <h1>Theme Options</h1>
      <div className="flex items-center gap-4">
        <input
          onChange={(e) => setPrimaryColor(e.target.value)}
          type="color"
          value={primaryColor}
        />
        <div className="flex gap-2">
          {Object.keys(borderRadiusOptions).map((optionKey) => (
            <button
              className={`flex items-center justify-center w-8 h-8 bg-trueGray-100 ring-gray-700 cursor-pointer hover:bg-trueGray-50 ${
                borderRadius === borderRadiusOptions[optionKey] ? "ring-1" : ""
              }`}
              key={optionKey}
              onClick={() => {
                setBorderRadius(borderRadiusOptions[optionKey]);
              }}
            >
              <div
                className="w-4 h-4 border-t-2 border-l-2 border-gray-600"
                style={{ borderTopLeftRadius: borderRadiusOptions[optionKey] }}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {Object.keys(boxShadowOptions).map((optionKey) => (
            <button
              className={`flex items-center justify-center w-8 h-8 bg-trueGray-100 ring-gray-700 cursor-pointer hover:bg-trueGray-50 ${
                boxShadow === boxShadowOptions[optionKey] ? "ring-1" : ""
              }`}
              key={optionKey}
              onClick={() => {
                setBoxShadow(boxShadowOptions[optionKey]);
              }}
            >
              <div
                className="flex items-center justify-center w-5 h-5 bg-white"
                style={{ boxShadow: boxShadowOptions[optionKey] }}
              >
                {boxShadowOptions[optionKey] === "none" && (
                  <CloseLineIcon className="text-gray-700" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="mt-5">
          <Button asChild>
            <a href="https://github.com">Github</a>
          </Button>
          <h2 className="my-2 text-xl font-semibold">Checkbox</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-gray-500">States</h3>
              <div className="flex flex-col space-y-3">
                {/* <Checkbox checked {...checkboxProps}>
                  Checked
                </Checkbox>
                <Checkbox checked={false} {...checkboxProps}>
                  Unchecked
                </Checkbox>
                <Checkbox checked disabled {...checkboxProps}>
                  Checked + Disabled
                </Checkbox>
                <Checkbox checked={false} disabled {...checkboxProps}>
                  Unchecked + Disabled
                </Checkbox>
                <Checkbox indeterminate {...checkboxProps}>
                  Indeterminate
                </Checkbox>
                <Checkbox disabled indeterminate {...checkboxProps}>
                  Indeterminate + Disabled
                </Checkbox>
                <Checkbox defaultChecked {...checkboxProps}>
                  Default Checked
                </Checkbox>
                <Checkbox defaultChecked {...checkboxProps} id="checkbox-id">
                  With Label
                </Checkbox>
                <Checkbox defaultChecked {...checkboxProps} id="checkbox-id">
                  This checkbox contains the multi line label
                </Checkbox>
                <Checkbox
                  defaultChecked
                  {...checkboxProps}
                  icon={<CloseLineIcon />}
                >
                  Custom Icon 2
                </Checkbox>
                <Checkbox defaultChecked {...checkboxProps} accentColor="green">
                  Custom accent Color
                </Checkbox>
                <Checkbox {...checkboxProps} required>
                  Invalid State
                </Checkbox> */}

                <FormControl disabled>
                  <FormControl.Label>Disabled</FormControl.Label>
                  <Checkbox {...checkboxProps} />
                </FormControl>
                <FormControl disabled>
                  <FormControl.Label>Disabled Checked</FormControl.Label>
                  <Checkbox {...checkboxProps} defaultChecked />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Indeterminate</FormControl.Label>
                  <Checkbox {...checkboxProps} indeterminate />
                </FormControl>
                <FormControl disabled>
                  <FormControl.Label>Indeterminate Disabled</FormControl.Label>
                  <Checkbox {...checkboxProps} indeterminate />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Custom Icon</FormControl.Label>
                  <Checkbox icon={<CloseLineIcon />} {...checkboxProps} />
                </FormControl>
                <CheckboxGroup layout="vertical">
                  <CheckboxGroup.Label fontWeight="bolder">
                    Choices
                  </CheckboxGroup.Label>
                  <FormControl>
                    <Checkbox value="one" {...checkboxProps} />
                    <FormControl.Label>Choice one</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox value="two" {...checkboxProps} />
                    <FormControl.Label>Choice two</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox value="three" {...checkboxProps} />
                    <FormControl.Label>Choice three</FormControl.Label>
                  </FormControl>
                  <CheckboxGroup.Validation variant="error">
                    Your choices are wrong
                  </CheckboxGroup.Validation>
                </CheckboxGroup>
              </div>
            </div>
          </div>
        </div>
        {/* checkbox end */}
      </div>
    </div>
  );
}

export default Showcase;
