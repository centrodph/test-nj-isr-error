import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { cleanPath, pathToUrl } from "../helpers/cleanUrl";
import {
  CONTENT_TYPE,
  RELATED_CONTENT_TYPE,
  REVALIDATE,
} from "../helpers/constants";
import { relatedListResponseSchema } from "../helpers/validatorPartialDex";
import { getEntry } from "../helpers/getEntry";
import { getRelated } from "../helpers/getRelated";
import { getUrls } from "../helpers/getUrls";
import { sendNotification } from "../helpers/slack";
import { z } from "zod";
import { zodToHumanReadable } from "../helpers/errorParse";

/**
 =========fallback: false
If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

When next build is run, Next.js will check if getStaticPaths returned fallback: false, 
it will then build only the paths returned by getStaticPaths. 
This option is useful if you have a small number of paths to create, or new page data is not added often. 
If you find that you need to add more paths, and you have fallback: false, you will need to run next 
build again so that the new paths can be generated.

=========fallback is true, then the behavior of getStaticProps changes in the following ways:

The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
The paths that have not been generated at build time will not result in a 404 page. 

Instead, Next.js will serve a “fallback” version of the page on the first request to such a path. 

Web crawlers, such as Google, won't be served a fallback and instead the path will behave as in fallback: 'blocking'.
When a page with fallback: true is navigated to through next/link or next/router (client-side) Next.js will not serve a 
fallback and instead the page will behave as fallback: 'blocking'.

In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
When complete, the browser receives the JSON for the generated path. This will be used to automatically render 
the page with the required props. From the user’s perspective, the page will be swapped from the fallback 
page to the full page.
At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same 
path will serve the generated page, like other pages pre-rendered at build time.




=========fallback: 'blocking'
If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, 
identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.

getStaticProps will behave as follows:

The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
The paths that have not been generated at build time will not result in a 404 page.
Instead, Next.js will SSR on the first request and return the generated HTML.
When complete, the browser receives the HTML for the generated path. From the user’s perspective,
 it will transition from "the browser is requesting the page" to "the full page is loaded".
  There is no flash of loading/fallback state.
At the same time, Next.js adds this path to the list of pre-rendered pages.
 Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.
fallback: 'blocking' will not update generated pages by default. 
To update generated pages, use Incremental Static Regeneration in conjunction with fallback: 'blocking'.


 */

export async function getStaticPaths() {
  const data = await getUrls(CONTENT_TYPE);
  const paths = data.entries.map((item) => ({
    params: { url: cleanPath(item.url) },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps<{
  data: ArticleContentStack.Article;
  related: RelatedListResponse;
  timestamp: string;
}> = async (context) => {
  const { params } = context;
  const data: ArticleContentStack.Article = await getEntry(
    CONTENT_TYPE,
    pathToUrl(params?.url as string[])
  );
  const related: RelatedListResponse = await getRelated(RELATED_CONTENT_TYPE);

  try {
    relatedListResponseSchema.parse(related);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorNotification = zodToHumanReadable(err.issues);
      sendNotification(`CONTENT INFO\n\n${related.entries
        .map(
          (item) =>
            `UID:    ${item.uid}\nLOCALE: ${item.locale}\nTITLE:  ${item.title} \n`
        )
        .join("\n\n")}**********ERROR**********\n\n
      ${errorNotification}
      `);
    }
    //TAKE PREVIOUS VERSION INSTEAD
    console.log("TODO");
    // throw err;
  }

  if (!data) {
    return {
      notFound: true,
      revalidate: REVALIDATE,
    };
  }
  return {
    props: { data, related, timestamp: new Date().toISOString() },
    revalidate: REVALIDATE, // In seconds
  };
};

/**
 * render the article based on InferGetStaticPropsType<typeof getStaticProps>
 * @param props InferGetStaticPropsType<typeof getStaticProps>
 */
export default function ArticleId(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  // const revalidate = async (isValid: boolean) => {
  //   await fetch("/api/publish", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       url: router.asPath,
  //     }),
  //   });
  // };

  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Test NJ: 02282023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{props.data?.title}</h1>
      <div>
        <span>{props.timestamp}</span>
      </div>

      <button className="back-btn" onClick={() => router.back()}>
        Back
      </button>

      {/* <div style={{ display: "flex" }}>
        <div>
          <button
            className="revalidate-btn-error"
            onClick={() => revalidate(true)}
          >
            Revalidate with error
          </button>
        </div>
        <div>
          <button
            className="revalidate-btn-success"
            onClick={() => revalidate(true)}
          >
            Revalidate with success
          </button>
        </div>
      </div> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: props.data?.content,
          }}
        />

        <div>
          {props.related.entries.map((item) => (
            <div
              key={item.url}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                marginBottom: "0.5rem",
              }}
            >
              <div>{item.title}</div>
              {item.tags.map((tag) => (
                <a
                  key={tag}
                  style={{
                    margin: "0.1rem",
                    borderBottom: "1px solid yellow",
                  }}
                >
                  {tag}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
