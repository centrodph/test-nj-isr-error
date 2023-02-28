import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

export async function getStaticPaths() {
  const data: number[] = await fetch(process.env.SERVER + "ids").then((res) =>
    res.json()
  );
  const paths = data
    .filter((id) => Number(id) !== Number(process.env.ARTICLE))
    .map((id) => ({ params: { id: String(id) } }));

  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const data = await fetch(
    process.env.SERVER + "article/" + params?.id
  ).then((res) => res.json());
  return {
    props: { data },
  };
};

export default function ArticleId({ data }) {
  return (
    <div>
      <Head>
        <title>Test NJ: 02282023</title>
        <meta name="description" content="Test NJ: 02282023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Test NJ: 02282023</h1>
      <h1>{data?.title}</h1>
      <p>{data?.data}</p>
    </div>
  );
}
