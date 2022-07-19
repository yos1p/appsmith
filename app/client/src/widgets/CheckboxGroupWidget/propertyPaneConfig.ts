import { ValidationTypes } from "constants/WidgetValidation";
import {
  LabelPosition,
  CheckboxGroupAlignmentTypes,
} from "components/constants";
import { Alignment } from "@blueprintjs/core";
import { CheckboxGroupWidgetProps } from "./widget";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { ValidationResponse } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/TernServer";

export function defaultSelectedValuesValidation(
  value: unknown,
): ValidationResponse {
  let values: string[] = [];

  if (typeof value === "string") {
    try {
      values = JSON.parse(value);
      if (!Array.isArray(values)) {
        throw new Error();
      }
    } catch {
      values = value.length ? value.split(",") : [];
      if (values.length > 0) {
        values = values.map((_v: string) => _v.trim());
      }
    }
  }

  if (Array.isArray(value)) {
    values = Array.from(new Set(value));
  }

  return {
    isValid: true,
    parsed: values,
  };
}

const propertyPaneConfig = [
  {
    sectionName: "General",
    children: [
      {
        helpText: "Displays a list of unique checkbox options",
        propertyName: "options",
        label: "Options",
        controlType: "OPTION_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            default: [],
            unique: ["value"],
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "label",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      required: true,
                    },
                  },
                  {
                    name: "value",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                    },
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: "Sets the values of the options checked by default",
        propertyName: "defaultSelectedValues",
        label: "Default Selected Values",
        placeholderText: '["apple", "orange"]',
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultSelectedValuesValidation,
            expected: {
              type: "String or Array<string>",
              example: `apple | ["apple", "orange"]`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
      {
        propertyName: "isRequired",
        label: "Required",
        helpText: "Makes input to the widget mandatory",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isVisible",
        label: "Visible",
        helpText: "Controls the visibility of the widget",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isDisabled",
        label: "Disabled",
        controlType: "SWITCH",
        helpText: "Disables input to this widget",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isInline",
        label: "Inline",
        controlType: "SWITCH",
        helpText: "Displays the checkboxes horizontally",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isSelectAll",
        label: "Select All Options",
        controlType: "SWITCH",
        helpText: "Controls whether select all option is shown",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: "Animate Loading",
        controlType: "SWITCH",
        helpText: "Controls the loading of the widget",
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: "Label",
    children: [
      {
        helpText: "Sets the label text of the widget",
        propertyName: "labelText",
        label: "Text",
        controlType: "INPUT_TEXT",
        placeholderText: "Enter label text",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: "Sets the label position of the widget",
        propertyName: "labelPosition",
        label: "Position",
        controlType: "DROP_DOWN",
        options: [
          { label: "Left", value: LabelPosition.Left },
          { label: "Top", value: LabelPosition.Top },
          { label: "Auto", value: LabelPosition.Auto },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: "Sets the label alignment of the widget",
        propertyName: "labelAlignment",
        label: "Alignment",
        controlType: "LABEL_ALIGNMENT_OPTIONS",
        options: [
          {
            icon: "LEFT_ALIGN",
            value: Alignment.LEFT,
          },
          {
            icon: "RIGHT_ALIGN",
            value: Alignment.RIGHT,
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: CheckboxGroupWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
      {
        helpText: "Sets the label width of the widget as the number of columns",
        propertyName: "labelWidth",
        label: "Width (in columns)",
        controlType: "NUMERIC_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        min: 0,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            natural: true,
          },
        },
        hidden: (props: CheckboxGroupWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
    ],
  },
  {
    sectionName: "Styles",
    children: [
      {
        propertyName: "optionAlignment",
        label: "Alignment",
        controlType: "DROP_DOWN",
        helpText: "Sets alignment between options.",
        options: [
          {
            label: "None",
            value: CheckboxGroupAlignmentTypes.NONE,
          },
          {
            label: "Start",
            value: CheckboxGroupAlignmentTypes.START,
          },
          {
            label: "End",
            value: CheckboxGroupAlignmentTypes.END,
          },
          {
            label: "Center",
            value: CheckboxGroupAlignmentTypes.CENTER,
          },
          {
            label: "Between",
            value: CheckboxGroupAlignmentTypes.SPACE_BETWEEN,
          },
          {
            label: "Around",
            value: CheckboxGroupAlignmentTypes.SPACE_AROUND,
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              CheckboxGroupAlignmentTypes.NONE,
              CheckboxGroupAlignmentTypes.START,
              CheckboxGroupAlignmentTypes.END,
              CheckboxGroupAlignmentTypes.CENTER,
              CheckboxGroupAlignmentTypes.SPACE_BETWEEN,
              CheckboxGroupAlignmentTypes.SPACE_AROUND,
            ],
          },
        },
      },
      {
        propertyName: "labelTextColor",
        label: "Label Text Color",
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelTextSize",
        label: "Label Text Size",
        controlType: "DROP_DOWN",
        defaultValue: "0.875rem",
        options: [
          {
            label: "S",
            value: "0.875rem",
            subText: "0.875rem",
          },
          {
            label: "M",
            value: "1rem",
            subText: "1rem",
          },
          {
            label: "L",
            value: "1.25rem",
            subText: "1.25rem",
          },
          {
            label: "XL",
            value: "1.875rem",
            subText: "1.875rem",
          },
          {
            label: "XXL",
            value: "3rem",
            subText: "3rem",
          },
          {
            label: "3XL",
            value: "3.75rem",
            subText: "3.75rem",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelStyle",
        label: "Label Font Style",
        controlType: "BUTTON_TABS",
        options: [
          {
            icon: "BOLD_FONT",
            value: "BOLD",
          },
          {
            icon: "ITALICS_FONT",
            value: "ITALIC",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "accentColor",
        helpText: "Sets the checked state color of the checkbox",
        label: "Accent Color",
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "borderRadius",
        label: "Border Radius",
        helpText: "Rounds the corners of the icon button's outer border edge",
        controlType: "BORDER_RADIUS_OPTIONS",

        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: "Events",
    children: [
      {
        helpText: "Triggers an action when the check state is changed",
        propertyName: "onSelectionChange",
        label: "onSelectionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];

export default propertyPaneConfig;
