import React from "react";
import styled from "styled-components";
import { Colors } from "constants/Colors";
import { MenuItem } from "design-system-old";
import { Text, Avatar } from "design-system";
import { getInitials } from "utils/AppsmithUtils";
import {
  DropdownOnSelectActions,
  getOnSelectAction,
} from "./CustomizedDropdown/dropdownHelpers";
import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import { useSelector } from "react-redux";
import { getCurrentUser } from "selectors/usersSelectors";
import { ADMIN_SETTINGS, createMessage } from "@appsmith/constants/messages";
import { getDefaultAdminSettingsPath } from "@appsmith/utils/adminSettingsHelpers";
import { getTenantPermissions } from "@appsmith/selectors/tenantSelectors";

type MobileSideBarProps = {
  name: string;
  isOpen: boolean;
  userName?: string;
  photoId?: string;
};

const MainContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 49px; /* height of mobile header */
  left: ${({ isOpen }) => (isOpen ? `0` : `-100vw`)};
  width: 100vw;
  height: calc(100vh - 49px);
  background-color: ${Colors.WHITE};
  transition: left 0.6s ease;
  padding: 16px;
`;

const Section = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid var(--ads-v2-color-border);
`;

const ProfileSection = styled(Section)`
  display: flex;
  align-items: center;
`;

const UserNameSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const StyledMenuItem = styled(MenuItem)`
  svg,
  .cs-icon svg path {
    width: 18px;
    height: 18px;
    fill: var(--ads-v2-color-fg);
  }

  .cs-text {
    font-size: 14px;
    color: var(--ads-v2-color-fg);
  }
`;

export default function MobileSideBar(props: MobileSideBarProps) {
  const user = useSelector(getCurrentUser);
  const tenantPermissions = useSelector(getTenantPermissions);

  return (
    <MainContainer isOpen={props.isOpen}>
      <ProfileSection>
        <Avatar
          className="t--profile-menu-icon"
          firstLetter={getInitials(props.name || props.userName)}
          image={!!props.photoId ? `/api/v1/assets/${props.photoId}` : ""}
          label={props.name || props.userName || ""}
          size="md"
        />
        <UserNameSection>
          <Text kind="heading-s">{props.name}</Text>
          <Text kind="body-s">{props.userName}</Text>
        </UserNameSection>
      </ProfileSection>
      <Section>
        <Text kind="heading-s">Account</Text>
        {user?.isSuperUser && user?.isConfigurable && (
          <StyledMenuItem
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
        <StyledMenuItem
          className="t--logout-icon"
          icon="logout"
          onSelect={() =>
            getOnSelectAction(DropdownOnSelectActions.DISPATCH, {
              type: ReduxActionTypes.LOGOUT_USER_INIT,
            })
          }
          text="Sign Out"
        />
      </Section>
    </MainContainer>
  );
}
