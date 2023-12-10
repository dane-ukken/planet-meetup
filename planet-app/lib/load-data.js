import dbConnect from "./db";
import { Event, User } from "../models/dbModels";
import eventData from "../mock/event-data.json";
import userData from "../mock/user-data.json";

export async function saveMockDataToDB() {
  try {
    await dbConnect();

    await Event.deleteMany({});
    await User.deleteMany({});

    const events = await Event.insertMany(eventData);
    const users = await User.insertMany(userData);

    console.log("Initial data has been seeded.");
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}
