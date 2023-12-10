import {
  getEventById,
  updateEventById,
  deleteEventById,
} from "../../../lib/event";

export default async function getEventByIdHandler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method == "GET") {
    try {
      const event = await getEventById(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else if (method == "PUT") {
    try {
      const updatedEvent = await updateEventById(id, body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else if (method === "DELETE") {
    try {
      const existingEvent = await deleteEventById(id);
      if (!existingEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
