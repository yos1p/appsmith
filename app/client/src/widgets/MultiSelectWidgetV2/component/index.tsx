/* eslint-disable no-console */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  useMemo,
} from "react";
import Select, { SelectProps } from "rc-select";
import {
  DefaultValueType,
  LabelValueType,
} from "rc-select/lib/interface/generator";
import MenuItemCheckBox, {
  DropdownStyles,
  MultiSelectContainer,
  StyledCheckbox,
  TextLabelWrapper,
  StyledLabel,
} from "./index.styled";
import {
  CANVAS_CLASSNAME,
  MODAL_PORTAL_CLASSNAME,
  TextSize,
} from "constants/WidgetConstants";
import Icon from "components/ads/Icon";
import { Button, Classes, InputGroup } from "@blueprintjs/core";
import { WidgetContainerDiff } from "widgets/WidgetUtils";
import { Colors } from "constants/Colors";
import { uniqBy } from "lodash";

const menuItemSelectedIcon = (props: { isSelected: boolean }) => {
  return <MenuItemCheckBox checked={props.isSelected} />;
};

export interface MultiSelectProps
  extends Required<
    Pick<
      SelectProps,
      "disabled" | "options" | "placeholder" | "loading" | "dropdownStyle"
    >
  > {
  mode?: "multiple" | "tags";
  value: LabelValueType[];
  onChange: (value: DefaultValueType) => void;
  serverSideFiltering: boolean;
  onFilterChange: (text: string) => void;
  dropDownWidth: number;
  width: number;
  labelText?: string;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  compactMode: boolean;
  isValid: boolean;
  allowSelectAll?: boolean;
  filterText?: string;
  widgetId: string;
  isFilterable: boolean;
  borderRadius: string;
  boxShadow?: string;
  primaryColor?: string;
}

const DEBOUNCE_TIMEOUT = 1000;
const FOCUS_TIMEOUT = 500;

function MultiSelectComponent({
  allowSelectAll,
  borderRadius,
  boxShadow,
  compactMode,
  disabled,
  dropdownStyle,
  dropDownWidth,
  filterText,
  isFilterable,
  isValid,
  labelStyle,
  labelText,
  labelTextColor,
  labelTextSize,
  loading,
  onChange,
  onFilterChange,
  options,
  placeholder,
  primaryColor,
  serverSideFiltering,
  value,
  widgetId,
  width,
}: MultiSelectProps): JSX.Element {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [filter, setFilter] = useState(filterText ?? "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const _menu = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearButton = useMemo(
    () =>
      filter ? (
        <Button icon="cross" minimal onClick={() => setFilter("")} />
      ) : null,
    [filter],
  );
  const getDropdownPosition = useCallback(() => {
    const node = _menu.current;
    if (Boolean(node?.closest(`.${MODAL_PORTAL_CLASSNAME}`))) {
      return document.querySelector(
        `.${MODAL_PORTAL_CLASSNAME}`,
      ) as HTMLElement;
    }
    return document.querySelector(`.${CANVAS_CLASSNAME}`) as HTMLElement;
  }, []);

  const handleSelectAll = () => {
    if (!isSelectAll) {
      // Get all options
      const allOption: LabelValueType[] = filteredOptions.map(
        ({ label, value }) => ({
          value,
          label,
        }),
      );
      // get unique selected values amongst SelectedAllValue and Value
      const allSelectedOptions = uniqBy([...allOption, ...value], "value").map(
        (val) => ({
          ...val,
          key: val.value,
        }),
      );
      onChange(allSelectedOptions);
      return;
    }
    return onChange([]);
  };

  const onOpen = useCallback((open: boolean) => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), FOCUS_TIMEOUT);
    }
  }, []);

  const checkOptionsAndValue = () => {
    const emptyFalseArr = [false];
    if (value.length === 0 || filteredOptions.length === 0)
      return emptyFalseArr;
    return filteredOptions.map((x) => value.some((y) => y.value === x.value));
  };

  // SelectAll if all options are in Value
  useEffect(() => {
    if (
      !isSelectAll &&
      filteredOptions.length &&
      value.length &&
      !checkOptionsAndValue().includes(false)
    ) {
      setIsSelectAll(true);
    }
    if (isSelectAll && filteredOptions.length !== value.length) {
      setIsSelectAll(false);
    }
  }, [filteredOptions, value]);

  // Trigger onFilterChange once filter is Updated
  useEffect(() => {
    const timeOutId = setTimeout(
      () => onFilterChange(filter),
      DEBOUNCE_TIMEOUT,
    );
    return () => clearTimeout(timeOutId);
  }, [filter]);

  // Filter options based on serverSideFiltering
  useEffect(
    () => {
      if (serverSideFiltering) {
        return setFilteredOptions(options);
      }
      const filtered = options.filter((option) => {
        return (
          String(option.label)
            .toLowerCase()
            .indexOf(filter.toLowerCase()) >= 0 ||
          String(option.value)
            .toLowerCase()
            .indexOf(filter.toLowerCase()) >= 0
        );
      });
      setFilteredOptions(filtered);
    },
    serverSideFiltering ? [options] : [filter, options],
  );
  const memoDropDownWidth = useMemo(() => {
    if (compactMode && labelRef.current) {
      const labelWidth = labelRef.current.clientWidth;
      const widthDiff = dropDownWidth - labelWidth;
      return widthDiff > dropDownWidth ? widthDiff : dropDownWidth;
    }
    const parentWidth = width - WidgetContainerDiff;
    return parentWidth > dropDownWidth ? parentWidth : dropDownWidth;
  }, [compactMode, dropDownWidth, width]);

  const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFilter(event.target.value);
  }, []);

  const dropdownRender = useCallback(
    (
      menu: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    ) => (
      <>
        {isFilterable ? (
          <InputGroup
            inputRef={inputRef}
            leftIcon="search"
            onChange={onQueryChange}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Filter..."
            // ref={inputRef}
            rightElement={clearButton as JSX.Element}
            small
            type="text"
            value={filter}
          />
        ) : null}
        <div className={`${loading ? Classes.SKELETON : ""}`}>
          {filteredOptions.length && allowSelectAll ? (
            <StyledCheckbox
              alignIndicator="left"
              checked={isSelectAll}
              className={`all-options ${isSelectAll ? "selected" : ""}`}
              label="Select all"
              onChange={handleSelectAll}
              primaryColor={primaryColor}
            />
          ) : null}
          {menu}
        </div>
      </>
    ),
    [
      isSelectAll,
      filteredOptions,
      loading,
      allowSelectAll,
      isFilterable,
      filter,
      onQueryChange,
    ],
  );

  return (
    <MultiSelectContainer
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      compactMode={compactMode}
      isValid={isValid}
      primaryColor={primaryColor}
      ref={_menu as React.RefObject<HTMLDivElement>}
    >
      <DropdownStyles
        borderRadius={borderRadius}
        dropDownWidth={memoDropDownWidth}
        id={widgetId}
        primaryColor={primaryColor}
      />
      {labelText && (
        <TextLabelWrapper compactMode={compactMode} ref={labelRef}>
          <StyledLabel
            $compactMode={compactMode}
            $disabled={disabled}
            $labelStyle={labelStyle}
            $labelText={labelText}
            $labelTextColor={labelTextColor}
            $labelTextSize={labelTextSize}
            className={`tree-multiselect-label ${Classes.TEXT_OVERFLOW_ELLIPSIS}`}
          >
            {labelText}
          </StyledLabel>
        </TextLabelWrapper>
      )}
      <Select
        animation="slide-up"
        choiceTransitionName="rc-select-selection__choice-zoom"
        // TODO: Make Autofocus a variable in the property pane
        // autoFocus
        className="rc-select"
        defaultActiveFirstOption={false}
        disabled={disabled}
        dropdownClassName={`multi-select-dropdown multiselect-popover-width-${widgetId}`}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        getPopupContainer={getDropdownPosition}
        inputIcon={
          <Icon
            className="dropdown-icon"
            fillColor={disabled ? Colors.GREY_7 : Colors.GREY_10}
            name="dropdown"
          />
        }
        labelInValue
        listHeight={300}
        loading={loading}
        maxTagCount={"responsive"}
        maxTagPlaceholder={(e) => `+${e.length} more`}
        menuItemSelectedIcon={menuItemSelectedIcon}
        mode="multiple"
        notFoundContent="No Results Found"
        onChange={onChange}
        onDropdownVisibleChange={onOpen}
        options={filteredOptions}
        placeholder={placeholder || "select option(s)"}
        removeIcon={
          <Icon
            className="remove-icon"
            fillColor={Colors.GREY_10}
            name="close-x"
          />
        }
        showArrow
        showSearch={false}
        value={value}
      />
    </MultiSelectContainer>
  );
}

export default MultiSelectComponent;
