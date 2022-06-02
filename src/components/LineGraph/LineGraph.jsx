import React from "react";
import { defaultOptions } from "../../configs/lineGraph.config";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineGraph = ({ data, options = defaultOptions }) => {
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default LineGraph;