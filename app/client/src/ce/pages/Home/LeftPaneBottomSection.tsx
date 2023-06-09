import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MenuItem } from "design-system-old";
import { ADMIN_SETTINGS, createMessage } from "@appsmith/constants/messages";
import { getIsFetchingApplications } from "@appsmith/selectors/applicationSelectors";
import {
  DropdownOnSelectActions,
  getOnSelectAction,
} from "pages/common/CustomizedDropdown/dropdownHelpers";
import { getCurrentUser } from "selectors/usersSelectors";
import {
  getDefaultAdminSettingsPath,
  showAdminSettings,
} from "@appsmith/utils/adminSettingsHelpers";
import { getTenantPermissions } from "@appsmith/selectors/tenantSelectors";

export const Wrapper = styled.div`
  padding-bottom: ${(props) => props.theme.spaces[3]}px;
  background-color: var(--ads-v2-color-bg);
  width: 100%;
  margin-top: auto;
  border-top: 1px solid var(--ads-v2-color-border);
`;

export const MenuWrapper = styled.div`
  margin-top: 4px;
`;

export const LeftPaneVersionData = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--ads-v2-color-fg-emphasis);
  font-size: 8px;
  margin-top: ${(props) => props.theme.spaces[3]}px;
`;

function LeftPaneBottomSection() {
  const isFetchingApplications = useSelector(getIsFetchingApplications);
  const user = useSelector(getCurrentUser);
  const tenantPermissions = useSelector(getTenantPermissions);

  return (
    <Wrapper>
      {showAdminSettings(user) && !isFetchingApplications && (
        <MenuItem
          className="admin-settings-menu-option"
          icon="setting"
          onSelect={() => {
            getOnSelectAction(DropdownOnSelectActions.REDIRECT, {
              path: getDefaultAdminSettingsPath({
                isSuperUser: user?.isSuperUser,
                tenantPermissions,
              }),
            });
          }}
          text={createMessage(ADMIN_SETTINGS)}
        />
      )}
    </Wrapper>
  );
}

export default LeftPaneBottomSection;
