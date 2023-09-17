"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

type ContributionsData = {
  date: string;
  totalContributions: number;
};

type Props = {
  contributions: ContributionsData[];
};

function ContributionsChart({ contributions }: Props) {
  if (!contributions || !contributions.length) return;

  const labels = contributions.map((contribution) => {
    const dt = new Date(contribution.date);
    const year = dt.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(dt.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's 0-based
    const day = String(dt.getDate()).padStart(2, "0");

    return `${month}-${day}`;
  });
 
  const totalContributions = contributions.map(
    (contribution) => contribution.totalContributions
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Contribuições Totais",
        data: totalContributions,
        fill: true,
        backgroundColor: "rgba(0,177,49, 0.3)",
        borderColor: "rgba(0,177,49, 1)",
      } 
    ], 
  };

  console.log(JSON.stringify(data));
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 3,
  };

  return (
    <div>
      <Line data={data} options={options} height={300} />
    </div>
  );
}

export default ContributionsChart;
