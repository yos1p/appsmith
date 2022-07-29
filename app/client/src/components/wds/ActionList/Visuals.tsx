import React from "react";
import { Slot, ItemContext } from "./Item";

type VisualProps = React.HTMLAttributes<HTMLSpanElement>;

export const LeadingVisualContainer: React.FC<VisualProps> = ({ ...props }) => {
  return <span {...props} />;
};

export type ActionListLeadingVisualProps = VisualProps;
export const LeadingVisual: React.FC<VisualProps> = ({ ...props }) => {
  return (
    <Slot name="LeadingVisual">
      {({ disabled, variant }: ItemContext) => (
        <LeadingVisualContainer {...props}>
          {props.children}
        </LeadingVisualContainer>
      )}
    </Slot>
  );
};

export type ActionListTrailingVisualProps = VisualProps;
export const TrailingVisual: React.FC<VisualProps> = ({ ...props }) => {
  return (
    <Slot name="TrailingVisual">
      {({ disabled, variant }: ItemContext) => (
        <span {...props}>{props.children}</span>
      )}
    </Slot>
  );
};
