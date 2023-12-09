import { seedInitialData } from "../../lib/load-data";

export default async function signup(req, res) {
  try {
    const eventsSeedData = await seedInitialData();
    console.log("Events data created: ", eventsSeedData);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
