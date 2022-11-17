import React, { CSSProperties, useState } from "react";

import { Checkbox, Button } from "components/wds";
import {
  borderRadiusOptions,
  boxShadowOptions,
} from "constants/ThemeConstants";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import { Icon } from "./Icon";
import { Slottable } from "@radix-ui/react-slot";

function Showcase() {
  const [borderRadius, setBorderRadius] = useState<string | undefined>("0px");
  const [boxShadow, setBoxShadow] = useState<string | undefined>("none");
  const [primaryColor, setPrimaryColor] = useState("#553DE9");
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<number | undefined>();

  return (
    <div
      className="container min-h-screen pt-12 mx-auto"
      style={
        {
          "--wds-radii": borderRadius,
        } as CSSProperties
      }
    >
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
        {/* buttons */}
        <div className="">
          <h2 className="my-2 text-xl font-semibold">Buttons</h2>
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button
                accentColor={primaryColor}
                className="w-28"
                variant="filled"
              >
                Primary
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-28"
                variant="outline"
              >
                Outline
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-28"
                variant="light"
              >
                Light
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-28"
                variant="subtle"
              >
                Subtle
              </Button>
              <Button
                accentColor={primaryColor}
                asChild
                className="w-28"
                variant="filled"
              >
                <a href="https://appsmith.com">Link</a>
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-28"
                isDisabled
                variant="subtle"
              >
                Disabled
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-32"
                trailingIcon={<Icon name="plus" />}
              >
                Trailing Icon
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-32"
                leadingIcon={<Icon name="plus" />}
                variant="outline"
              >
                Leading Icon
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-32"
                isLoading={loading}
              >
                Loading
              </Button>
              <Button
                accentColor={primaryColor}
                className="w-32"
                isLoading={loading}
                variant="outline"
              >
                Loading
              </Button>
            </div>
          </div>
        </div>
        {/*button end */}
      </div>
    </div>
  );
}

export default Showcase;
