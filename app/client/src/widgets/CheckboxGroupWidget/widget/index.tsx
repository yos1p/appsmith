import React from "react";
import { compact, xor } from "lodash";

import { TextSize, WidgetType } from "constants/WidgetConstants";
import { DerivedPropertiesMap } from "utils/WidgetFactory";
import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import propertyPaneConfig from "../propertyPaneConfig";

import { LabelPosition } from "components/constants";
import { Alignment } from "@blueprintjs/core";
import { GRID_DENSITY_MIGRATION_V1 } from "widgets/constants";

import CheckboxGroupComponent from "../component";
import { OptionProps, SelectAllState, SelectAllStates } from "../constants";
import CheckboxGroup from "components/wds/CheckboxGroup";
import FormControl from "components/wds/FormControl";
import { Checkbox } from "components/wds";

class CheckboxGroupWidget extends BaseWidget<
  CheckboxGroupWidgetProps,
  WidgetState
> {
  static getPropertyPaneConfig() {
    return propertyPaneConfig;
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedValues: "defaultSelectedValues",
    };
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedValues: undefined,
      isDirty: false,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{ this.isRequired ? !!this.selectedValues.length : true }}`,
      value: `{{this.selectedValues}}`,
    };
  }

  componentDidUpdate(prevProps: CheckboxGroupWidgetProps) {
    if (
      Array.isArray(prevProps.options) &&
      Array.isArray(this.props.options) &&
      this.props.options.length !== prevProps.options.length
    ) {
      const prevOptions = compact(prevProps.options).map(
        (prevOption) => prevOption.value,
      );
      const options = compact(this.props.options).map((option) => option.value);

      // Get an array containing all the options of prevOptions that are not in options and vice-versa
      const diffOptions = prevOptions
        .filter((option) => !options.includes(option))
        .concat(options.filter((option) => !prevOptions.includes(option)));

      let selectedValues = this.props.selectedValues.filter(
        (selectedValue: string) => !diffOptions.includes(selectedValue),
      );
      // if selectedValues empty, and options have changed, set defaultSelectedValues
      if (!selectedValues.length && this.props.defaultSelectedValues.length) {
        selectedValues = this.props.defaultSelectedValues;
      }

      this.props.updateWidgetMetaProperty("selectedValues", selectedValues, {
        triggerPropertyName: "onSelectionChange",
        dynamicString: this.props.onSelectionChange,
        event: {
          type: EventType.ON_CHECK_CHANGE,
        },
      });
    }
    // Reset isDirty to false whenever defaultSelectedValues changes
    if (
      xor(this.props.defaultSelectedValues, prevProps.defaultSelectedValues)
        .length > 0 &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  getPageView() {
    return (
      <CheckboxGroup
        layout={this.props.isInline ? "horizontal" : "vertical"}
        onChange={this.handleCheckboxChange}
      >
        <CheckboxGroup.Label
          fontWeight="bolder"
          minWidth={`${this.getLabelWidth()}px`}
        >
          {this.props.labelText}
        </CheckboxGroup.Label>
        {this.props.options.map((option: OptionProps) => (
          <FormControl key={option.value}>
            <Checkbox
              accentColor={this.props.accentColor}
              checked={this.props.selectedValues.includes(option.value)}
              value={option.value}
            />
            <FormControl.Label>{option.label}</FormControl.Label>
          </FormControl>
        ))}
      </CheckboxGroup>
    );
  }

  static getWidgetType(): WidgetType {
    return "CHECKBOX_GROUP_WIDGET";
  }

  private handleCheckboxChange = (selectedValues: string[]) => {
    // Update isDirty to true whenever value changes
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("selectedValues", selectedValues, {
      triggerPropertyName: "onSelectionChange",
      dynamicString: this.props.onSelectionChange,
      event: {
        type: EventType.ON_CHECKBOX_GROUP_SELECTION_CHANGE,
      },
    });
  };

  private handleSelectAllChange = (state: SelectAllState) => {
    return () => {
      let { selectedValues = [] } = this.props;

      switch (state) {
        case SelectAllStates.UNCHECKED:
          selectedValues = this.props.options.map((option) => option.value);
          break;

        default:
          selectedValues = [];
          break;
      }

      if (!this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", true);
      }

      this.props.updateWidgetMetaProperty("selectedValues", selectedValues, {
        triggerPropertyName: "onSelectionChange",
        dynamicString: this.props.onSelectionChange,
        event: {
          type: EventType.ON_CHECKBOX_GROUP_SELECTION_CHANGE,
        },
      });
    };
  };
}

export interface CheckboxGroupWidgetProps extends WidgetProps {
  options: OptionProps[];
  isInline: boolean;
  isSelectAll?: boolean;
  isRequired?: boolean;
  isDisabled: boolean;
  isValid?: boolean;
  onCheckChanged?: string;
  optionAlignment?: string;
  labelText?: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  accentColor: string;
  borderRadius: string;
}

export default CheckboxGroupWidget;
