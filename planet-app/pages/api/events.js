import { getEvents } from "../../lib/event";

export default async function getEventsHandler(req, res) {
  try {
    console.log('getting to geteventshandler');
    const events = await getEvents();
    console.log('returning from geteventshandler');
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}
