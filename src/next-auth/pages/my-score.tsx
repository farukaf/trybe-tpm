import Layout from "../components/layout";
import scoreReader from "../services/score-reader-service";
import type { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import ContributionsChart from '../components/contributions-chart';

async function fetchScore(login: string | undefined | null) {
  if (login) {
    return await scoreReader.get(login);
  }
  return null;
}

function convertSecondsToTimeLeftMessage(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m para consultar novamente`;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let req = context.req;
  const token = await getToken({ req });
  const score = await fetchScore(token?.login);
  return {
    props: {
      score,
      token,
    },
  };
}

export default function MyScorePage({ score }: { score: any | null }) {
  let ratelimitMessage =
    score.rateRemaining < 0
      ? "Acabou suas consultas"
      : `Consultas restantes: ${score.rateRemaining}`;

  return (
    <Layout>
      <h2>My Github Score</h2>
      <p>{ratelimitMessage}</p>
      <p>{convertSecondsToTimeLeftMessage(score.rateInSeconds)}</p>
      <ContributionsChart contributions={score.data?.contributions ?? [] } />

      <hr />
      
      <pre>{JSON.stringify(score, null, 2)}</pre>
    </Layout>
  );
}
