import dbConnect from "./db";
import Event from "../models/event";

export async function createEvent({
  createdAt,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventStatus,
  maxAttendees,
  eventOrg,
}) {
  await dbConnect();

  const newEvent = new Event({
    createdAt: Date.now(),
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventStatus,
    maxAttendees,
    eventOrg,
  });

  try {
    const event = await newEvent.save();
    console.log("Event created");
    return { useeventNamername, createdAt: event.createdAt };
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      console.log(`Duplicate ${field} error: `, err);
      reject(new Error(`${field} already exists`));
    } else {
      console.log("Error creating event:", err);
      reject(err);
    }
  }
}

export async function getEvents() {
  await dbConnect();

  return Event.find({})
    .then((events) => {
      console.log(`found events`);
      return events;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
