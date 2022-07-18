import React from "react";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import { AlignWidgetTypes } from "widgets/constants";
import { Colors } from "constants/Colors";
import { LabelPosition } from "components/constants";
import { FontStyleTypes } from "constants/WidgetConstants";
import { Checkbox } from "components/wds/Checkbox";
import { Classes } from "@blueprintjs/core";

type StyledCheckboxContainerProps = {
  isValid: boolean;
  noContainerPadding?: boolean;
};

const CheckboxContainer = styled.div<StyledCheckboxContainerProps>`
  && {
    padding: ${({ noContainerPadding }) =>
      noContainerPadding ? 0 : "9px 12px"};
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
    .${Classes.CHECKBOX} {
      width: 100%;
    }
    & .bp3-control-indicator {
      border: ${(props) =>
        !props.isValid && `1px solid ${props.theme.colors.error} !important`};
    }
  }
`;

const CheckboxLabel = styled.div<{
  disabled?: boolean;
  labelPosition: LabelPosition;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}>`
  width: 100%;
  display: inline-block;
  vertical-align: top;
  text-align: ${({ labelPosition }) => labelPosition.toLowerCase()};
  ${({ disabled, labelStyle, labelTextColor, labelTextSize }) => `
  color: ${disabled ? Colors.GREY_8 : labelTextColor || "inherit"};
  font-size: ${labelTextSize ?? "inherit"};
  font-weight: ${labelStyle?.includes(FontStyleTypes.BOLD) ? "bold" : "normal"};
  font-style: ${
    labelStyle?.includes(FontStyleTypes.ITALIC) ? "italic" : "normal"
  };
  `}
`;

class CheckboxComponent extends React.Component<CheckboxComponentProps> {
  render() {
    // If the prop isValid has a value true/false (it was explicitly passed to this component),
    // it take priority over the internal logic to determine if the field is valid or not.
    const isValid = (() => {
      if (this.props.isValid !== undefined) {
        return this.props.isValid;
      }

      return !(this.props.isRequired && !this.props.isChecked);
    })();

    return (
      <CheckboxContainer
        isValid={isValid}
        noContainerPadding={this.props.noContainerPadding}
      >
        <Checkbox
          accentColor={this.props.accentColor}
          checked={this.props.isChecked}
          disabled={this.props.isDisabled}
          radii={this.props.borderRadius}
          ref={this.props.inputRef}
        />
        <CheckboxLabel
          className="t--checkbox-widget-label"
          disabled={this.props.isDisabled}
          labelPosition={this.props.labelPosition}
          labelStyle={this.props.labelStyle}
          labelTextColor={this.props.labelTextColor}
          labelTextSize={this.props.labelTextSize}
        >
          {this.props.label}
        </CheckboxLabel>
      </CheckboxContainer>
    );
  }

  onCheckChange = () => {
    this.props.onCheckChange(!this.props.isChecked);
  };
}

export interface CheckboxComponentProps extends ComponentProps {
  alignWidget?: AlignWidgetTypes;
  noContainerPadding?: boolean;
  isChecked: boolean;
  isLoading: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  label: string;
  onCheckChange: (isChecked: boolean) => void;
  rowSpace: number;
  inputRef?: (el: HTMLInputElement | null) => any;
  accentColor: string;
  borderRadius: string;
  labelPosition: LabelPosition;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}

export default CheckboxComponent;
