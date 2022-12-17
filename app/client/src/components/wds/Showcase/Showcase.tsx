import React, { useState, PropsWithChildren } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { NativeSelect } from "../NativeSelect";
import { TextInput } from "../TextInput/TextInput";

type Props = {
  title?: string;
  children?: React.ReactNode;
  settings?: React.ReactNode;
};

type ControlProps = {
  controls: any[][];
};

/**
 *  0 -> type
 *  1 -> state name
 *  2 -> default value
 *  3 -> options
 *  [
 *    ['select, 'variant', '0', ['1', 2, 3]],
 *    ['checkbox', 'loading', false],
 *    ['input', 'label', ''],
 * ]
 * @param props
 */
export const useControls = (props: ControlProps) => {
  const { controls } = props;
  const [state, setState] = useState<{
    [key: string]: any;
  }>(controls.reduce((a, v) => ({ ...a, [v[1]]: v[2] }), {}));

  const propertyControls = controls.map((control) => {
    if (control[0] === "select") {
      return (
        <NativeSelect
          data={control[3]}
          defaultValue={control[1]}
          label={control[1]}
          onChange={(e) =>
            setState({
              ...state,
              [control[1]]: e.target.value,
            })
          }
        />
      );
    }

    if (control[0] === "checkbox") {
      return (
        <Checkbox
          accentColor="dodgerblue"
          label={control[1]}
          onChange={(e: any) =>
            setState({
              ...state,
              [control[1]]: e.target.checked,
            })
          }
          type="checkbox"
        />
      );
    }

    if (control[0] === "input") {
      return (
        <TextInput
          defaultValue={control[2]}
          label={control[1]}
          onChange={(e) =>
            setState({
              ...state,
              [control[1]]: e.target.value,
            })
          }
        />
      );
    }
  });

  return { state, controls: propertyControls };
};

const Showcase = (props: Props) => {
  const { children, settings, title } = props;

  return (
    <div className="">
      <h2 className="my-2 text-xl font-semibold">{title}</h2>
      <div className="space-y-3">
        <div className="flex space-x-3 border">
          <div className="flex items-center justify-center flex-grow min-h-56">
            {children}
          </div>
          <div className="flex flex-col gap-4 p-4 border-l min-w-40 showcase-settings">
            {settings}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
