import { getEvents, createEvent } from "../../../lib/event";

export default async function getEventsHandler(req, res) {
  if (req.method === "GET") {
    // Handle GET request to fetch events
    try {
      const events = await getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  } else if (req.method === "POST") {
    // Handle POST request to create a new event
    const {
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventStatus,
      maxAttendees,
      eventPrice,
      eventImgUrl,
      eventOrg,
      eventDescription,
    } = req.body;

    try {
      const event = await createEvent({
        eventName,
        eventDate,
        eventTime,
        eventLocation,
        eventStatus,
        maxAttendees,
        eventPrice,
        eventImgUrl,
        eventOrg,
        eventDescription,
      });
      console.log("New request", event);
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
