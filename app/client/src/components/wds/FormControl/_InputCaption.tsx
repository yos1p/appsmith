import React from "react";

type Props = {
  /**
   * The unique identifier used to associate the caption with an input
   */
  id: string;
  /**
   * Whether the input associated with this caption is disabled
   */
  disabled?: boolean;
};

const InputCaption: React.FC<Props> = ({ children, id }) => (
  <caption id={id}>{children}</caption>
);

export default InputCaption;
