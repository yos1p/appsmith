import React from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "selectors/usersSelectors";
import styled from "styled-components";
import StyledHeader from "components/designSystems/appsmith/StyledHeader";
import { AppState } from "@appsmith/reducers";
import { Colors } from "constants/Colors";

const StyledPageHeader = styled(StyledHeader)`
  width: 100%;
  height: 48px;
  background: ${Colors.WHITE};
  display: flex;
  justify-content: center;
  box-shadow: none;
  padding: 0px ${(props) => props.theme.spaces[12]}px;
`;

const LogoContainer = styled.div`
  svg {
    max-width: 160px;
    width: 160px;
  }
`;

export function LoginHeader() {
  return (
    <StyledPageHeader data-testid="t--appsmith-login-header">
      <LogoContainer />
    </StyledPageHeader>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: getCurrentUser(state),
});

export default connect(mapStateToProps)(LoginHeader);
