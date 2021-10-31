// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const input = req.body;
  fetch(WIKIPEDIA_URL + input)
    .then((r) => {
      //throw bad request if response is not OK:status
      if (!r.ok) {
        res.status(400);
        throw new Error(r.statusText);
      }
      //else return the response as a json
      return r.json();
    })
    .then((article) => {
      validateData(article);
      const articleText = article.parse.text["*"];
      //find all global matches
      const inputPattern = new RegExp(input, "gi");
      const matches = articleText.match(inputPattern);
      res.status(200);
      res.end(JSON.stringify(matches.length));
    });
};
const validateData = (data: any) => {
  if (data.error) throw new Error(data.error.info);
};

export default handler;
