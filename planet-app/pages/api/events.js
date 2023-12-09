import { getEvents } from "../../lib/event";

export default async function getEventsHandler(req, res) {
  try {
    const data = { hello: "hi" };
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}
