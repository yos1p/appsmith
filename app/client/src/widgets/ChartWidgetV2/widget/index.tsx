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
    return <ChartComponent data={this.props.data} />;
  }

  static getWidgetType(): string {
    return "CHART_WIDGET_V2";
  }
}

export interface ChartWidgetProps extends WidgetProps {
  data: any;
}

export default ChartWidgetV2;
