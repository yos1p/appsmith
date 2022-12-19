import React from "react";
import styled from "styled-components";
import { HeaderComponent as Header } from "./Header";
import { CarouselComponent as Carousel } from "./Carousel";
import { FooterComponent as Footer } from "./Footer";
import { UpgradePageProps } from "./types";

export const Container = styled.div`
  border-left: thin solid var(--appsmith-color-black-50);
  background-color: var(--ads-color-black-50);
  height: auto;
  min-height: 0;
  overflow: auto;
  height: calc(100vh - 50px - 112px);
  width: 100%;
`;

export default function UpgradePageComponent(props: UpgradePageProps) {
  const { carousel = null, footer = null, header = null } = props;
  return (
    <Container
      className="upgrade-page-container"
      data-testid="t--upgrade-page-container"
    >
      {header && <Header {...header} />}
      {carousel && <Carousel {...carousel} />}
      {footer && <Footer {...footer} />}
    </Container>
  );
}
