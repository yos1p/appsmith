import React from "react";
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
  const { chartName, chartType, data } = props;

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
  };

  return (
    <>
      {(() => {
        switch (chartType) {
          case "LINE_CHART":
            return <Line data={parsedData} options={options} />;
          case "BAR_CHART":
            return <Bar data={parsedData} options={options} />;
          case "PIE_CHART":
            return <Pie data={parsedData} options={options} />;
          case "DOUGHNUT_CHART":
            return <Doughnut data={parsedData} options={options} />;
          case "RADAR_CHART":
            return <Radar data={parsedData} options={options} />;
          default:
            return <Line data={parsedData} options={options} />;
        }
      })()}
    </>
  );
}

export interface ChartComponentProps {
  chartName: string;
  chartType: string;
  data: any;
}

export default ChartComponent;
