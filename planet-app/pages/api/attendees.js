import { getAllUsers } from "../../lib/user";
import { findAttendees } from "../../lib/event";

export default async function findAllAttendees(req, res) {
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
