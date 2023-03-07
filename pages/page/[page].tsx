import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { cleanUrl } from "../../helpers/cleanUrl";
import { CONTENT_TYPE, REVALIDATE } from "../../helpers/constants";
import { getUrls } from "../../helpers/getUrls";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  const { params } = context;
  const data = await getUrls(CONTENT_TYPE, Number(params.page) * 100);
  return {
    props: {
      data: data?.entries,
      count: data?.count,
      params,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: REVALIDATE, // In seconds
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function List(props: {
  data: ArticleListItem[];
  count: number;
  params: { page: string };
}) {
  const { data, count } = props;
  const showMore = count > data?.length || false;
  const nextPage = `/page/${Number(props.params?.page) + 1}`;
  const prevPage =
    Number(props.params?.page) === 1
      ? "/"
      : `/page/${Number(props.params?.page) - 1}`;
  return (
    <div>
      <Head>
        <title>{`${process.env.EXAMPLE_TYPE}::${CONTENT_TYPE}`}</title>
        <meta
          name="description"
          content={`${process.env.EXAMPLE_TYPE}::${CONTENT_TYPE}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        {process.env.EXAMPLE_TYPE}::{CONTENT_TYPE}
      </h1>
      <Link href={prevPage}>
        <a className="page-btn">Prev page</a>
      </Link>
      {showMore ? (
        <Link href={nextPage}>
          <a className="page-btn">Next page</a>
        </Link>
      ) : null}
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {data?.map((item) => {
          const url = cleanUrl(item?.url);
          return (
            <li
              key={item.uid}
              style={{
                listStyle: "none",
                display: "grid",
              }}
            >
              <Link href={`/${url}`}>
                <a className="article-btn"> {item?.url}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
