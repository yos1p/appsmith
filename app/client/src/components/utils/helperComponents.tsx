import React from "react";
import { Icon, IconSize, SearchInput } from "design-system";
import styled, { createGlobalStyle } from "styled-components";
import { useHistory } from "react-router-dom";
import { truncateTextUsingEllipsis } from "constants/DefaultTheme";

export const HelpPopoverStyle = createGlobalStyle`
  .bp3-portal {
    .delete-menu-item {
      .cs-icon, .cs-text {
        color: var(--appsmith-color-red-500) !important;
        svg {
          path {
            fill: var(--appsmith-color-red-500) !important;
          }
        }
      }
    }
  }
`;

export const StyledBackButton = styled.div`
  display: inline-flex;
  cursor: pointer;
  margin: 0 0 20px 8px;
`;

export const BackButtonText = styled.span`
  margin: 0 0 0 8px;
`;

export const StyledSearchInput = styled(SearchInput)``;

export const SettingsHeader = styled.h2`
  padding: 0px 8px;
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 0px;
  width: 365px;
  ${truncateTextUsingEllipsis}
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background: var(--appsmith-color-black-0);
  padding-bottom: 8px;
  z-index: 4;
`;

export function BackButton({ goTo }: { goTo?: string }) {
  const history = useHistory();

  const onBack = () => {
    if (goTo) {
      history.push(goTo);
      return;
    }
    history.goBack();
  };

  return (
    <StyledBackButton
      className="t--admin-settings-back-button"
      onClick={onBack}
    >
      <Icon name="chevron-left" size={IconSize.XS} />
      <BackButtonText>Back</BackButtonText>
    </StyledBackButton>
  );
}
