import React from "react";
import {
  Chart as ChartJS,
  Colors,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function ChartComponent(props: ChartComponentProps) {
  let { data } = props;
  const { chartName } = props;

  data = JSON.parse(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: chartName,
      },
    },
  };

  const mydata = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Data Last Year",
        data: [-3, 3, 2],
      },
    ],
  };

  return <Line data={data} options={options} />;
}

interface DataObj {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface ChartComponentProps {
  data: any;
  chartName: string;
}

export default ChartComponent;
