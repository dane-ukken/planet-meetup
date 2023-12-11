import dbConnect from "./db";
import { Event } from "../models/dbModels";

export async function createEvent({
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
}) {
  try {
    await dbConnect();

    const newEvent = new Event({
      createdAt: Date.now(),
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventStatus,
      maxAttendees,
      spotsLeft: maxAttendees,
      eventPrice,
      eventImgUrl,
      eventOrg,
      eventDescription,
    });

    const event = await newEvent.save();
    console.log("Event created");
    return { eventName: event.eventName, createdAt: event.createdAt };
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      console.log(`Duplicate ${field} error: `, err);
      throw new Error(`${field} already exists`);
    } else {
      console.log("Error creating event:", err);
      throw err;
    }
  }
}

export async function getEvents() {
  await dbConnect();

  return Event.find({})
    .then((events) => {
      console.log(`found events`);
      console.log(events);
      return events;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function getEventById(id) {
  await dbConnect();

  return Event.findById(id)
    .then((event) => {
      console.log(`found event`);
      console.log(event);
      return event;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function updateEventById(id, eventData) {
  try {
    await dbConnect();
    console.log(eventData);
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: eventData },
      { new: true }
    );
    console.log("Event updated", updatedEvent._id);
    return { eventName: updatedEvent.eventName };
  } catch (err) {
    console.log("Error updating event:", err);
    throw err;
  }
}

export async function deleteEventById(id) {
  try {
    await dbConnect();

    const eventToDelete = await Event.findById(id);
    if (!eventToDelete) {
      console.log("Event not found");
      return null;
    }

    await Event.deleteOne({ _id: id });
    console.log("Event deleted", eventToDelete._id);
    return eventToDelete;
  } catch (err) {
    console.log("Error deleting event:", err);
    throw err;
  }
}

export function findAttendees(users, eventId) {
  const attendees = [];

  users.forEach((user) => {
    const registeredEvents = user.registeredEvents || [];

    registeredEvents.forEach((ev) => {
      if (ev.event == eventId) {
        attendees.push({ username: user.username, email: user.email });
      }
    });
  });

  return attendees;
}

