import Layout from "../components/layout";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout>
      <h4>Vamos codar?</h4>
      <h3>GITHUB SCORE</h3>  
      <Link href="/my-score">
        Go to My Score
      </Link>    
    </Layout>
  );
}
