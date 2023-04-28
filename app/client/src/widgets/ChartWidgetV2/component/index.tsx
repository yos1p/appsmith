import React from "react";
import styled from "styled-components";
import { invisible } from "constants/DefaultTheme";
import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Bar, Pie, Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
);

function ChartComponent(props: ChartComponentProps) {
  const { chartName, chartType, data, isVisible } = props;

  const parsedData = typeof data === "string" ? JSON.parse(data) : data;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartName,
      },
    },
    maintainAspectRatio: false,
  };

  const CanvasContainer = styled.div<{ isVisible?: boolean }>`
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    ${(props) => (!props.isVisible ? invisible : "")};
    padding: 10px 0 0 0;
  `;

  return (
    <CanvasContainer isVisible={isVisible}>
      {(() => {
        switch (chartType) {
          case "BAR_CHART":
            return (
              <Bar
                data={parsedData}
                height="100%"
                options={options}
                width="100%"
              />
            );
          case "PIE_CHART":
            return (
              <Pie
                data={parsedData}
                height="100%"
                options={options}
                width="100%"
              />
            );
          case "DOUGHNUT_CHART":
            return (
              <Doughnut
                data={parsedData}
                height="100%"
                options={options}
                width="100%"
              />
            );
          case "RADAR_CHART":
            return (
              <Radar
                data={parsedData}
                height="100%"
                options={options}
                width="100%"
              />
            );
          case "LINE_CHART":
          default:
            return (
              <Line
                data={parsedData}
                height="100%"
                options={options}
                width="100%"
              />
            );
        }
      })()}
    </CanvasContainer>
  );
}

export interface ChartComponentProps {
  chartName: string;
  chartType: string;
  data: any;
  isVisible?: boolean;
}

export default ChartComponent;
