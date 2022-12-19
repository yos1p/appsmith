import React from "react";
import { createMessage } from "design-system/build/constants/messages";
import useOnUpgrade from "../../../utils/hooks/useOnUpgrade";
import { UPGRADE_PAGE, UPGRADE_TO_EE_FEATURE } from "../../constants/messages";
import UpgradePageComponent from "./UpgradePageComponent";

export function BusinessUpgrade() {
  const { onUpgrade } = useOnUpgrade({
    logEventName: "ADMIN_SETTINGS_UPGRADE_HOOK",
    logEventData: { source: "Upgrade" },
    intercomMessage: createMessage(UPGRADE_TO_EE_FEATURE, "Upgrade"),
  });
  const footer = {
    onClick: () => {
      onUpgrade();
    },
    heading: createMessage(UPGRADE_PAGE.prompt),
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <img
          src={
            "https://user-images.githubusercontent.com/1573771/207476867-22a42d40-5717-4616-ae72-b2baaf9366df.png"
          }
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            verticalAlign: "middle",
          }}
        />
      </div>
      <UpgradePageComponent footer={footer} />
    </div>
  );
}
