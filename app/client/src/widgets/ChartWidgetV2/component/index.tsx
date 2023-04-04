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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Sales",
    },
  },
};

class ChartComponent extends React.Component<ChartComponentProps> {
  render() {
    return <Line data={this.props.data} options={options} />;
  }
}

export interface ChartComponentProps {
  data: any;
}

export default ChartComponent;
