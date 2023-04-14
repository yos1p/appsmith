import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { getResponsiveLayoutConfig } from "utils/layoutPropertiesUtils";

export const contentConfig = [
  {
    sectionName: "Data",
    children: [
      {
        helpText: "Changes the visualisation of the chart data",
        propertyName: "chartType",
        label: "Chart Type",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "Line Chart",
            value: "LINE_CHART",
          },
        ],
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["LINE_CHART"],
          },
        },
      },
      {
        helpText: "Populates the chart.js with the data",
        propertyName: "data",
        label: "Series Data",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSConvertible: true,
      },
    ],
  },
  {
    sectionName: "General",
    children: [
      {
        helpText: "Adds a title to the chart",
        placeholderText: "Monthly Profit Report",
        propertyName: "chartName",
        label: "Title",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "isVisible",
        label: "Visible",
        helpText: "Controls the visibility of the widget",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
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
    sectionName: "Axis",
    children: [
      {
        propertyName: "setAdaptiveYMin",
        label: "Adaptive Axis",
        helpText: "Define the minimum scale for X/Y axis",
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: "Specifies the label of the x-axis",
        propertyName: "xAxisName",
        placeholderText: "Dates",
        label: "x-axis Label",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        dependencies: ["chartType"],
      },
      {
        helpText: "Specifies the label of the y-axis",
        propertyName: "yAxisName",
        placeholderText: "Revenue",
        label: "y-axis Label",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        dependencies: ["chartType"],
      },
    ],
  },
  ...getResponsiveLayoutConfig("CHART_WIDGET"),
];

export const styleConfig = [
  {
    sectionName: "Border and Shadow",
    children: [
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
      {
        propertyName: "boxShadow",
        label: "Box Shadow",
        helpText:
          "Enables you to cast a drop shadow from the frame of the widget",
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
