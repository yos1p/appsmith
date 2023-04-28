import { ValidationTypes } from "constants/WidgetValidation";
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
          {
            label: "Bar Chart",
            value: "BAR_CHART",
          },
          {
            label: "Pie Chart",
            value: "PIE_CHART",
          },
          {
            label: "Doughnut Chart",
            value: "DOUGHNUT_CHART",
          },
          {
            label: "Radar Chart",
            value: "RADAR_CHART",
          },
        ],
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              "LINE_CHART",
              "BAR_CHART",
              "PIE_CHART",
              "DOUGHNUT_CHART",
              "RADAR_CHART",
            ],
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
    ],
  },
  ...getResponsiveLayoutConfig("CHART_WIDGET"),
];

export const styleConfig = [];
