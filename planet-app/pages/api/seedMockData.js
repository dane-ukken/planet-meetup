import { saveMockDataToDB } from "../../lib/load-data";

export default async function seedMockData(req, res) {
  if (req.method === "POST") {
    try {
      await saveMockDataToDB();
      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(405).send({ error: "Method Not Allowed" });
  }
}
