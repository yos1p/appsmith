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
    "--wds-color-border-button": accentColor,
    "--wds-radii": borderRadius ? borderRadius : undefined,
    "--wds-shadow": boxShadow ? boxShadow : undefined,
  };

  // If the button is a light, subtitle or outline button, we need to change the colors
  if ("light" || variant == "subtle" || variant == "outline") {
    cssVariables["--wds-color-bg-button-light"] = lightenColor(
      accentColor,
      "0.97",
    );

    cssVariables["--wds-color-bg-button-hover-light"] = lightenColor(
      accentColor,
      "0.95",
    );
  }

  return cssVariables;
};
