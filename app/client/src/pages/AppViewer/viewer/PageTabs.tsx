import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Page,
  CurrentApplicationData,
  PageListPayload,
} from "constants/ReduxActionConstants";
import {
  getApplicationEditorPageURL,
  getApplicationViewerPageURL,
} from "constants/routes";
import { isEllipsisActive } from "utils/helpers";
import TooltipComponent from "components/ads/Tooltip";
import { getTypographyByKey } from "constants/DefaultTheme";
import { Position } from "@blueprintjs/core";

import { getAppMode } from "selectors/applicationSelectors";
import { useSelector } from "react-redux";
import { APP_MODE } from "entities/App";

import { trimQueryString } from "utils/helpers";

const PageTab = styled(NavLink)`
  display: flex;
  max-width: 170px;
  align-self: flex-end;
  cursor: pointer;
  text-decoration: none;
  padding: 0px ${(props) => props.theme.spaces[7]}px;
  &:hover {
    text-decoration: none;
  }
`;

const StyledBottomBorder = styled.div`
  position: relative;
  transition: all 0.3s ease-in-out;
  height: 2px;
  width: 100%;
  left: -100%;
  background-color: ${(props) =>
    props.theme.colors.header.activeTabBorderBottom};
  ${PageTab}:hover & {
    position: relative;
    width: 100%;
    left: 0;
  }
`;

const StyleTabText = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) => getTypographyByKey(props, "h6")}
  color: ${(props) => props.theme.colors.header.tabText};
  height: ${(props) => `calc(${props.theme.smallHeaderHeight})`};
  & span {
    height: 100%;
    max-width: 138px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  ${PageTab}.is-active & {
    color: ${(props) => props.theme.colors.header.activeTabText};
    ${StyledBottomBorder} {
      left: 0;
    }
  }
`;

function PageTabName({ name }: { name: string }) {
  const tabNameRef = useRef<HTMLSpanElement>(null);
  const [ellipsisActive, setEllipsisActive] = useState(false);
  const tabNameText = (
    <StyleTabText>
      <div className="relative flex items-center justify-center flex-grow">
        <span ref={tabNameRef}>{name}</span>
      </div>
      <StyledBottomBorder />
    </StyleTabText>
  );

  useEffect(() => {
    if (isEllipsisActive(tabNameRef?.current)) {
      setEllipsisActive(true);
    }
  }, [tabNameRef]);

  return ellipsisActive ? (
    <TooltipComponent
      boundary="viewport"
      content={name}
      maxWidth="400px"
      position={Position.BOTTOM}
    >
      {tabNameText}
    </TooltipComponent>
  ) : (
    tabNameText
  );
}

function PageTabContainer({
  children,
  isTabActive,
  setShowScrollArrows,
  tabsScrollable,
}: {
  children: React.ReactNode;
  isTabActive: boolean;
  tabsScrollable: boolean;
  setShowScrollArrows: () => void;
}) {
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTabActive) {
      tabContainerRef.current?.scrollIntoView(false);
      setShowScrollArrows();
    }
  }, [isTabActive, tabsScrollable]);

  return <div ref={tabContainerRef}>{children}</div>;
}

type Props = {
  currentApplicationDetails?: CurrentApplicationData;
  appPages: PageListPayload;
  measuredTabsRef: (ref: HTMLElement | null) => void;
  tabsScrollable: boolean;
  setShowScrollArrows: () => void;
};

export function PageTabs(props: Props) {
  const { appPages, currentApplicationDetails } = props;
  const { pathname } = useLocation();
  const location = useLocation();
  const appMode = useSelector(getAppMode);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(window.location.search);
  }, [location]);

  /**
   * gets the page url
   *
   * Note: for edit mode, the page will have different url ( contains '/edit' at the end )
   *
   * @param page
   * @returns
   */
  const getPageURL = (page: Page) => {
    if (appMode === APP_MODE.PUBLISHED) {
      return trimQueryString(
        getApplicationViewerPageURL({
          applicationId: currentApplicationDetails?.id,
          pageId: page.pageId,
        }),
      );
    }

    return getApplicationEditorPageURL(
      currentApplicationDetails?.id,
      page.pageId,
    );
  };

  return (
    <div
      className="flex w-full overflow-auto scrollbar-none"
      ref={props.measuredTabsRef}
    >
      {appPages.map((page) => (
        <PageTabContainer
          isTabActive={
            pathname ===
            trimQueryString(
              getApplicationViewerPageURL({
                applicationId: currentApplicationDetails?.id,
                pageId: page.pageId,
              }),
            )
          }
          key={page.pageId}
          setShowScrollArrows={props.setShowScrollArrows}
          tabsScrollable={props.tabsScrollable}
        >
          <PageTab
            activeClassName="is-active"
            className="t--page-switch-tab"
            to={{
              pathname: getPageURL(page),
              search: query,
            }}
          >
            <PageTabName name={page.pageName} />
          </PageTab>
        </PageTabContainer>
      ))}
    </div>
  );
}

export default PageTabs;
