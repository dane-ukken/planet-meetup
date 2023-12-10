import { getEvents } from "../../lib/event";

export default async function getEventsHandler(req, res) {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}
