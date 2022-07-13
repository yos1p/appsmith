import React, { useState } from "react";

import { Checkbox, Button } from "components/wds";
import {
  borderRadiusOptions,
  boxShadowOptions,
} from "constants/ThemeConstants";

import CloseLineIcon from "remixicon-react/CloseLineIcon";

function Showcase() {
  const [borderRadius, setBorderRadius] = useState<string | undefined>("0px");
  const [boxShadow, setBoxShadow] = useState<string | undefined>("none");
  const [primaryColor, setPrimaryColor] = useState("#553DE9");

  const theme = {
    borderRadius,
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
          <h2 className="my-2 text-xl font-semibold">Checkbox</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-gray-500">States</h3>
              <div className="flex space-x-3">
                <Checkbox
                  accentColor={primaryColor}
                  defaultChecked
                  radii={theme.borderRadius}
                />
                <Checkbox checked={false} disabled {...theme} />
                <Checkbox checked={false} hasError {...theme} />
                <Checkbox checked={false} indeterminate {...theme} />
              </div>
            </div>
          </div>
        </div>
        {/* checkbox end */}

        {/* buttons */}
        <div className="">
          <h2 className="my-2 text-xl font-semibold">Buttons</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-gray-500">Types</h3>
              <div className="flex space-x-3">
                <Button leftIcon="download" {...theme} />
                <Button variant="solid" {...theme}>
                  Solid
                </Button>
                <Button variant="outline" {...theme}>
                  Outline
                </Button>
                <Button variant="ghost" {...theme}>
                  Ghost
                </Button>
                <Button variant="link" {...theme}>
                  Link
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-gray-500">States</h3>
              <div className="flex space-x-3">
                <Button {...theme}>Default</Button>
                <Button isDisabled {...theme}>
                  Disalbed
                </Button>
                <Button isLoading {...theme}>
                  Loading
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-gray-500">Icon and Alignment</h3>
              <div className="flex space-x-3">
                <Button className="w-40" leftIcon="download" {...theme}>
                  With Icon
                </Button>
                <Button
                  className="w-40"
                  justifyContent="space-between"
                  leftIcon="download"
                  {...theme}
                >
                  With Icon
                </Button>
                <Button
                  className="w-40"
                  justifyContent="flex-start"
                  leftIcon="download"
                  {...theme}
                >
                  With Icon
                </Button>
                <Button
                  className="w-40"
                  justifyContent="flex-end"
                  leftIcon="download"
                  {...theme}
                >
                  With Icon
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-gray-500">Misc</h3>
              <div className="flex space-x-3">
                <Button tooltip="This is tooltip content" {...theme}>
                  Tooltip
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/*button end */}
      </div>
    </div>
  );
}

export default Showcase;
