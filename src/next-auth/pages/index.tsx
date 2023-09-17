import Layout from "../components/layout";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import type { GetServerSidePropsContext } from "next";
import { JWT } from "next-auth/jwt/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let req = context.req;
  const token = await getToken({ req });
  return {
    props: {
      token,
    },
  };
}

export default function IndexPage({ token }: { token: JWT | null }) {
  return (
    <Layout>
      <h4>Vamos codar?</h4>
      <h3>GITHUB SCORE</h3>
      {token ? (
        <Link className="" href="/my-score">
          Ver o meu Score
        </Link>
      ) : (
        <h5>Faça o login e acesse seu score!!</h5>
      )}
    </Layout>
  );
}
