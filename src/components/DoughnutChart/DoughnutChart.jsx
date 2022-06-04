import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { defaultOptions } from "../../configs/doughnutChart.config";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({data, options = defaultOptions}) => {
  return (
    <Doughnut data={data} options={options}/>
  );
}
export default DoughnutChart;