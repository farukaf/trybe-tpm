import Layout from "../components/layout";
import scoreReader from "../services/score-reader-service";
import type { GetServerSidePropsContext } from "next";
import { JWT, getToken } from "next-auth/jwt";
import ContributionsChart from "../components/contributions-chart";

async function fetchScore(login: string | undefined | null) {
  try {
    if (login) {
      return await scoreReader.get(login);
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

function convertSecondsToTimeLeftMessage(seconds: number | undefined | null) {
  seconds = seconds ?? 0 | 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m para renovar o limite de consultas.`;
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

export default function MyScorePage({
  score,
  token,
}: {
  score: any | null;
  token: JWT | null;
}) {
  let ratelimitMessage =
    score?.rateRemaining < 0
      ? "Acabou suas consultas"
      : `Consultas restantes: ${score?.rateRemaining ?? 0}`;

  return (
    <Layout>
      <h2>
        Github Score de <code>{token?.login}</code>
      </h2>
      <p>{ratelimitMessage}</p>
      <p>{convertSecondsToTimeLeftMessage(score?.rateInSeconds)}</p>
      {score?.data?.contributions ? (
        <ContributionsChart contributions={score?.data?.contributions} />
      ) : (
        ""
      )}
      <br />
      <hr />
      <br />
      <pre>{JSON.stringify(score, null, 2)}</pre>
      <br />
    </Layout>
  );
}
