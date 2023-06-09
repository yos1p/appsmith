import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { contentConfig, styleConfig } from "./propertyConfig";
import ChartComponent from "../component";
import type { Stylesheet } from "entities/AppTheming";

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
    const { chartName, chartType, data, isVisible } = this.props;
    return (
      <ChartComponent
        chartName={chartName}
        chartType={chartType}
        data={data}
        isVisible={isVisible}
      />
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
  isVisible: boolean;
}

export default ChartWidgetV2;
