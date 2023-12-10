import { getEventById } from "../../../lib/event";

export default async function getEventByIdHandler(req, res) {
  const {
    query: { id },
  } = req;

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
}
