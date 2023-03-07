import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { cleanUrl } from "../helpers/cleanUrl";
import { getUrls } from "../helpers/getUrls";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const data = await getUrls("articles");
  return {
    props: {
      data: data?.entries,
      count: data?.count,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default function List({
  data,
  count,
}: {
  data: ArticleListItem[];
  count: number;
}) {
  const showMore = count > data.length;
  return (
    <div>
      <Head>
        <title>{process.env.EXAMPLE_TYPE}::Articles</title>
        <meta
          name="description"
          content={`${process.env.EXAMPLE_TYPE}::Articles`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{process.env.EXAMPLE_TYPE}::Articles</h1>
      <Link href={`/page/1`}>
        <a className="page-btn">Next page</a>
      </Link>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {data.map((item) => {
          const url = cleanUrl(item?.url?.url);
          return (
            <li
              key={item.uid}
              style={{
                listStyle: "none",
                display: "grid",
              }}
            >
              <Link href={`/${url}`}>
                <a className="article-btn"> {item?.url?.url}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
