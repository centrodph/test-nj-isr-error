import { getHeaders } from "./getHeaders";

/**
 * Using the ContentStack Rest API, get all the URLS for the site
 * base on a Content Type.
 */
export const getUrls = async (contentType: string, skip = 0) => {
  const params = new URLSearchParams({
    environment: `${process.env.CONTENT_STACK_ENVIRONMENT}`,
    include_count: "true",
    query: "{}",
    skip: `${skip}`,
    sort_by: "updated_at",
    sort_direction: "desc",
    "only[BASE][]": "url",
  }).toString();
  const data = await fetch(
    `${process.env.CONTENT_STACK_BASE_URL}v3/content_types/${contentType}/entries?${params}`,
    {
      method: "GET",
      headers: getHeaders(),
      redirect: "follow",
    }
  ).then((res) => res.json());
  return data;
};
