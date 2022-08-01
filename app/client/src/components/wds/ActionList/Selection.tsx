import React from "react";
import { Icon } from "../Icon";
import { ListContext, ActionListProps } from "./List";
import { GroupContext, ActionListGroupProps } from "./Group";
import { ActionListItemProps } from "./Item";
import { LeadingVisualContainer } from "./Visuals";
import { Checkbox } from "..";

type SelectionProps = Pick<ActionListItemProps, "selected">;
export const Selection: React.FC<SelectionProps> = ({ selected }) => {
  const { selectionVariant: listSelectionVariant } = React.useContext(
    ListContext,
  );
  const { selectionVariant: groupSelectionVariant } = React.useContext(
    GroupContext,
  );

  /** selectionVariant in Group can override the selectionVariant in List root */
  /** fallback to selectionVariant from container menu if any (ActionMenu, SelectPanel ) */
  let selectionVariant:
    | ActionListProps["selectionVariant"]
    | ActionListGroupProps["selectionVariant"];
  if (typeof groupSelectionVariant !== "undefined")
    selectionVariant = groupSelectionVariant;
  else selectionVariant = listSelectionVariant;

  if (!selectionVariant) {
    // if selectionVariant is not set on List, but Item is selected
    // fail loudly instead of silently ignoring
    if (selected) {
      throw new Error(
        "For Item to be selected, ActionList or ActionList.Group needs to have a selectionVariant defined",
      );
    } else {
      return null;
    }
  }

  if (selectionVariant === "single") {
    return (
      <LeadingVisualContainer>
        {selected && <Icon name="plus" />}
      </LeadingVisualContainer>
    );
  }

  /**
   * selectionVariant is multiple
   * we use a svg instead of an input because there should not
   * be an interactive element inside an option
   * svg copied from primer/css
   */
  return (
    <LeadingVisualContainer>
      <Checkbox className="pointer-events-none" />
    </LeadingVisualContainer>
  );
};
