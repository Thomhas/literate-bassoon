// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const input = req.body;
  fetch(WIKIPEDIA_URL + input)
    .then((r) => {
      if (!r.ok) {
        res.status(400);
        throw new Error(r.statusText);
      }
      return r.json();
    })
    .then((article) => {
      validateData(article);
      const text = article.parse.text["*"];
      const inputPattern = new RegExp(input, "gi");
      const matches = text.match(inputPattern);
      res.status(200);
      res.end(
        JSON.stringify(
          matches !== null
            ? matches.length
            : "The word is never used in the article"
        )
      );
    })
    .catch((e) => {
      res.end(JSON.stringify(e.message));
    });
};
const validateData = (data: any) => {
  if (data.error) throw new Error(data.error.info);
};

export default handler;
