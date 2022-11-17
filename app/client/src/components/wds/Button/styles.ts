import { ButtonProps } from "./";
import {
  darkenColor,
  getComplementaryGrayscaleColor,
  lightenColor,
} from "widgets/WidgetUtils";

/**
 * Returns the color scheme for the button.
 *
 * @param props
 * @returns
 */
export const getCSSVariables = (
  props: ButtonProps,
): { [key: string]: string } => {
  const { accentColor, borderRadius, boxShadow, variant } = props;

  const cssVariables: Record<string, any> = {
    "--wds-color-bg-button": accentColor,
    "--wds-color-bg-button-hover": darkenColor(accentColor),
    "--wds-color-text-button": accentColor,
    "--wds-color-text-onbutton": getComplementaryGrayscaleColor(accentColor),
    "--wds-btn-color-border-button": accentColor,
  };

  if (variant == "light" || variant == "subtle" || variant == "outline") {
    cssVariables["--wds-color-bg-button-light"] = lightenColor(
      accentColor,
      "0.97",
    );

    cssVariables["--wds-color-bg-button-hover-light"] = lightenColor(
      accentColor,
      "0.95",
    );
  }

  if (borderRadius) {
    cssVariables["--wds-radii"] = borderRadius || "0px";
  }

  if (boxShadow) {
    cssVariables["--wds-shadow"] = boxShadow || "none";
  }

  return cssVariables;
};
