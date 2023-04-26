import React from "react";
import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { contentConfig, styleConfig } from "./propertyConfig";
import ChartComponent from "../component";
import { Stylesheet } from "entities/AppTheming";

class ChartWidgetV2 extends BaseWidget<ChartWidgetProps, WidgetState> {
  static getPropertyPaneContentConfig() {
    return contentConfig;
  }

  static getPropertyPaneStyleConfig() {
    return styleConfig;
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    };
  }

  getPageView() {
    const { chartName, chartType, data } = this.props;
    return (
      <ChartComponent chartName={chartName} chartType={chartType} data={data} />
    );
  }

  static getWidgetType(): string {
    return "CHART_WIDGET_V2";
  }
}

interface DataObj {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface ChartWidgetProps extends WidgetProps {
  chartName: string;
  chartType: string;
  data: DataObj;
}

export default ChartWidgetV2;
