import React from "react";
import { NavigationSetting, NAVIGATION_SETTINGS } from "constants/AppConstants";
import { Colors } from "constants/Colors";
import { useSelector } from "react-redux";
import { getSelectedAppTheme } from "selectors/appThemingSelectors";

const ColorStyleIcon = (props: {
  colorStyle: NavigationSetting["colorStyle"];
}) => {
  const selectedTheme = useSelector(getSelectedAppTheme);

  let backgroundColor = Colors.WHITE;

  if (props.colorStyle === NAVIGATION_SETTINGS.COLOR_STYLE.SOLID) {
    backgroundColor =
      selectedTheme?.properties?.colors?.primaryColor || Colors.WHITE;
  } else if (props.colorStyle === NAVIGATION_SETTINGS.COLOR_STYLE.DARK) {
    backgroundColor = Colors.GREY_900;
  } else if (props.colorStyle === NAVIGATION_SETTINGS.COLOR_STYLE.LIGHT) {
    backgroundColor = Colors.WHITE;
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: 14,
        width: 14,
        borderRadius: "100%",
        marginRight: 4,
        border: `1px solid ${Colors.GREY_200}`,
      }}
    />
  );
};

export default ColorStyleIcon;
