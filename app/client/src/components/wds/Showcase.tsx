import React, { CSSProperties, useState } from "react";

import { Checkbox } from "components/wds";
import {
  borderRadiusOptions,
  boxShadowOptions,
} from "constants/ThemeConstants";

// load polyfill for :focus-visible
import "focus-visible";

import CloseLineIcon from "remixicon-react/CloseLineIcon";
import Button from "./Button";
import FormControl from "./FormControl/FormControl";
import CheckboxGroup from "./CheckboxGroup";
import Radio from "./Radio";
import { Colors } from "constants/Colors";
import { ToggleSwitch } from "./ ToggleSwitch";
import RadioGroup from "./RadioGroup";
import { Icon } from "./Icon";
import TextInput from "./TextInput";
import Dialog from "components/wds/Dialog";
import { ActionMenu } from "./ActionMenu";
import { ActionList } from "./ActionList";

function Showcase() {
  const [borderRadius, setBorderRadius] = useState<string | undefined>("0px");
  const [boxShadow, setBoxShadow] = useState<string | undefined>("none");
  const [primaryColor, setPrimaryColor] = useState("#553DE9");
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<number | undefined>();

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

        <FormControl>
          <Checkbox
            accentColor={primaryColor}
            onChange={(e) => setLoading(e.target.checked)}
          />
          <FormControl.Label>Loading</FormControl.Label>
        </FormControl>
      </div>

      <div
        className="space-y-5"
        style={
          {
            "--wds-radii": borderRadius,
          } as CSSProperties
        }
      >
        <div id="__primerPortalRoot__" />
        <div className="mt-5">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex space-x-2">
                <ActionList className="w-56">
                  <ActionList.Item>New file</ActionList.Item>
                  <ActionList.Item>Copy link</ActionList.Item>
                  <ActionList.Item>Edit file</ActionList.Item>
                  <ActionList.Divider />
                  <ActionList.Item variant="danger">
                    Delete file
                  </ActionList.Item>
                </ActionList>
                <ActionList className="w-56" selectionVariant="multiple">
                  <ActionList.Item
                    onSelect={() => setSelected(0)}
                    selected={selected === 0}
                  >
                    <ActionList.LeadingVisual>
                      <Icon name="pencil" />
                    </ActionList.LeadingVisual>
                    github.com/primer
                  </ActionList.Item>
                  <ActionList.Item variant="danger">
                    <ActionList.LeadingVisual>
                      <Icon name="plus" />
                    </ActionList.LeadingVisual>
                    4 vulnerabilities
                  </ActionList.Item>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <img
                        alt=""
                        className="w-4 h-4 rounded-full"
                        src="https://avatars.githubusercontent.com/u/92997159?v=4"
                      />
                    </ActionList.LeadingVisual>
                    mona
                  </ActionList.Item>
                </ActionList>
              </div>
              <div className="flex space-x-2">
                <Button
                  accentColor={primaryColor}
                  className="w-28"
                  variant="solid"
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
                  variant="ghost"
                >
                  Ghost
                </Button>
                <Button className="w-28" variant="link">
                  Link
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
                <Dialog aria-labelledby={loading ? "Animated" : "asdsa"}>
                  <Dialog.Trigger>
                    <Button
                      accentColor={primaryColor}
                      trailingIcon={<Icon name="plus" />}
                      variant="solid"
                    />
                  </Dialog.Trigger>
                  <Dialog.Content className="p-3">
                    <div className="space-x-3">
                      <TextInput placeholder="First Name" />
                      <TextInput placeholder="Last name" />
                    </div>
                    <p>Dialog</p>
                  </Dialog.Content>
                </Dialog>
              </div>
              <div className="flex space-x-2">
                <Checkbox accentColor={primaryColor} name="Checkbox" />
                <Checkbox
                  accentColor={primaryColor}
                  defaultChecked
                  name="Checkbox"
                />
                <Checkbox accentColor={primaryColor} disabled value="blue" />
                <Checkbox accentColor={primaryColor} defaultChecked disabled />
                <Checkbox accentColor={primaryColor} indeterminate />
                <Checkbox accentColor={primaryColor} disabled indeterminate />
                <Checkbox accentColor={primaryColor} required />
                <Checkbox
                  accentColor={Colors.GREEN_SOLID}
                  defaultChecked
                  icon={<CloseLineIcon />}
                  radii="9999px"
                />
              </div>
              <div className="flex space-x-2">
                <Radio accentColor={primaryColor} name="radio" value="blue" />
                <Radio
                  accentColor={primaryColor}
                  defaultChecked
                  name="radio"
                  value="blue"
                />
                <Radio accentColor={primaryColor} disabled value="blue" />
                <Radio
                  accentColor={primaryColor}
                  checked
                  disabled
                  value="blue"
                />
                <Radio
                  accentColor={primaryColor}
                  name="hello"
                  required
                  value="abc"
                />
              </div>
              <div className="flex space-x-2">
                <ToggleSwitch
                  accentColor={primaryColor}
                  name="ToggleSwitch"
                  radii={borderRadius}
                />
                <ToggleSwitch
                  accentColor={primaryColor}
                  defaultChecked
                  name="ToggleSwitch"
                  radii={borderRadius}
                />
                <ToggleSwitch
                  accentColor={primaryColor}
                  disabled
                  radii={borderRadius}
                  value="blue"
                />
                <ToggleSwitch
                  accentColor={primaryColor}
                  defaultChecked
                  disabled
                  radii={borderRadius}
                />
              </div>
              <div className="flex space-x-2">
                <CheckboxGroup>
                  <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
                  <FormControl>
                    <Checkbox accentColor={primaryColor} value="one" />
                    <FormControl.Label>Choice one</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox accentColor={primaryColor} value="two" />
                    <FormControl.Label>Choice two</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Checkbox accentColor={primaryColor} value="three" />
                    <FormControl.Label>Choice three</FormControl.Label>
                  </FormControl>
                </CheckboxGroup>
                <CheckboxGroup>
                  <CheckboxGroup.Label>Choices</CheckboxGroup.Label>
                  <FormControl>
                    <ToggleSwitch accentColor={primaryColor} value="one" />
                    <FormControl.Label>Choice one</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <ToggleSwitch accentColor={primaryColor} value="two" />
                    <FormControl.Label>Choice two</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <ToggleSwitch accentColor={primaryColor} value="three" />
                    <FormControl.Label>Choice three</FormControl.Label>
                  </FormControl>
                </CheckboxGroup>
                <RadioGroup name="choice">
                  <RadioGroup.Label>Choices</RadioGroup.Label>
                  <FormControl>
                    <Radio accentColor={primaryColor} value="one" />
                    <FormControl.Label>Choice one</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Radio accentColor={primaryColor} value="two" />
                    <FormControl.Label>Choice two</FormControl.Label>
                  </FormControl>
                  <FormControl>
                    <Radio accentColor={primaryColor} value="three" />
                    <FormControl.Label>Choice three</FormControl.Label>
                  </FormControl>
                </RadioGroup>
              </div>
              <div className="flex flex-wrap gap-2">
                <TextInput placeholder="hello" />
                <TextInput
                  leadingVisual={<Icon name="pencil" />}
                  placeholder="hello"
                />
                <TextInput
                  placeholder="hello"
                  trailingVisual={<Icon name="pencil" />}
                />
                <TextInput
                  leadingVisual={<Icon name="pencil" />}
                  loaderPosition="leading"
                  loading={loading}
                  placeholder="hello"
                />
                <TextInput
                  leadingVisual={<Icon name="pencil" />}
                  loaderPosition="trailing"
                  loading={loading}
                  placeholder="hello"
                />
                <TextInput
                  loaderPosition="leading"
                  loading={loading}
                  placeholder="hello"
                  trailingVisual={<Icon name="pencil" />}
                />
                <TextInput
                  loaderPosition="trailing"
                  loading={loading}
                  placeholder="hello"
                  trailingVisual={<Icon name="pencil" />}
                />
                <TextInput disabled placeholder="username" />
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <TextInput placeholder="username" />
                </FormControl>
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
