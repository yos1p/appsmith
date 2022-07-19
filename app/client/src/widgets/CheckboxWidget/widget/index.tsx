import React from "react";
import BaseWidget, { WidgetProps, WidgetState } from "../../BaseWidget";
import { FontStyleTypes, WidgetType } from "constants/WidgetConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { DerivedPropertiesMap } from "utils/WidgetFactory";
import { LabelPosition } from "components/constants";
import { AlignWidgetTypes } from "widgets/constants";

import { Checkbox as WDSCheckbox } from "components/wds/Checkbox";
import FormControl from "components/wds/FormControl";
import propertyPaneConfig from "../propertyPaneConfig";

class CheckboxWidget extends BaseWidget<CheckboxWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return propertyPaneConfig;
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      isChecked: "defaultCheckedState",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{!!this.isChecked}}`,
      isValid: `{{ this.isRequired ? !!this.isChecked : true }}`,
    };
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {
      isChecked: undefined,
      isDirty: false,
    };
  }

  componentDidUpdate(prevProps: CheckboxWidgetProps) {
    if (
      this.props.defaultCheckedState !== prevProps.defaultCheckedState &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  getPageView() {
    return (
      <FormControl
        disabled={this.props.isDisabled}
        id={`component-${this.props.widgetId}`}
      >
        <FormControl.Label
          color={this.props.labelTextColor}
          fontSize={this.props.labelTextSize}
          fontWeight={
            this.props.labelStyle?.includes(FontStyleTypes.BOLD)
              ? "bold"
              : "normal"
          }
          textAlign={this.props.alignWidget === "RIGHT" ? "right" : "left"}
        >
          {this.props.label}
        </FormControl.Label>
        <WDSCheckbox
          accentColor={this.props.accentColor}
          checked={this.props.isChecked}
          onChange={this.onCheckChange}
          radii={this.props.borderRadius}
        />
      </FormControl>
    );
  }

  onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("isChecked", e.target.checked, {
      triggerPropertyName: "onCheckChange",
      dynamicString: this.props.onCheckChange,
      event: {
        type: EventType.ON_CHECK_CHANGE,
      },
    });
  };

  static getWidgetType(): WidgetType {
    return "CHECKBOX_WIDGET";
  }
}

export interface CheckboxWidgetProps extends WidgetProps {
  label: string;
  defaultCheckedState: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  onCheckChange?: string;
  isRequired?: boolean;
  accentColor: string;
  borderRadius: string;
  alignWidget: AlignWidgetTypes;
  labelPosition: LabelPosition;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}

export default CheckboxWidget;
