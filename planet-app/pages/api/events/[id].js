import {
  getEventById,
  updateEventById,
  deleteEventById,
  findAttendees,
} from "../../../lib/event";
import { getAllUsers } from "../../../lib/user";

export async function getEventByIdHandler(req, res) {
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

export async function attendeesHandler(req, res) {
  try {
    const users = await getAllUsers();

    const eventId = req.query.id;

    const attendees = findAttendees(users, eventId);
    console.log(attendees);

    res.status(200).json({ attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
