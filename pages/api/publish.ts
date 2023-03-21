import type { NextApiRequest, NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.body;
    await res.revalidate(url);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    const e = JSON.stringify({
      message: "Error revalidating",
      body: req.body,
      error: err,
    });
    return res.status(500).send(e);
  }
}
