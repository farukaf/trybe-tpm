"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type ContributionsData = {
  date: string;
  totalContributions: number;
};

type Props = {
  contributions: ContributionsData[];
};

function ContributionsChart({ contributions }: Props) {
  if (!contributions || !contributions.length) return;

  const labels = contributions.map((contribution) => contribution.date);
  const totalContributions = contributions.map(
    (contribution) => contribution.totalContributions
  );

  const data = {
    label: labels,
    datasets: [
      {
        data: totalContributions,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 0,
      },
      line: {
        tension: 0.1,
        borderWidth: 2,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: "start",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
      },
    },
  };

  return (
    <div>
      <Line
        data={data}        
        options={options}
        height={300} 
      />
    </div>
  );
}

export default ContributionsChart;
