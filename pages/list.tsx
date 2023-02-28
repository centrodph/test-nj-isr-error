import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(process.env.SERVER + "ids").then((res) =>
    res.json()
  );
  return {
    props: { data },
  };
};

export default function List({ data }: { data: number[] }) {
  return (
    <div>
      <Head>
        <title>Test NJ: 02282023</title>
        <meta name="description" content="Test NJ: 02282023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Test NJ: 02282023</h1>
      <ul>
        {data.map((id) => (
            <li key={id}>
                <Link href={`/article/${id}`}>{id}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
}
