import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MenuItem } from "design-system-old";
import { ADMIN_SETTINGS, createMessage } from "@appsmith/constants/messages";
import { getIsFetchingApplications } from "selectors/applicationSelectors";
import { Colors } from "constants/Colors";
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
  background-color: ${Colors.WHITE};
  width: 100%;
  margin-top: auto;

  & .ads-dialog-trigger {
    margin-top: ${(props) => props.theme.spaces[1]}px;
  }

  & .ads-dialog-trigger > div {
    position: initial;
    width: 92%;
    padding: ${(props) =>
      `${props.theme.spaces[0]}px ${props.theme.spaces[6]}px`};
  }
`;

export const LeftPaneVersionData = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.MIRAGE_2};
  font-size: 8px;
  width: 92%;
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
