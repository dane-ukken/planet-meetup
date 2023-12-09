import dbConnect from "./db";
import Event from "../models/event";
import data from "./seed-data.json";

export async function seedInitialData() {
  try {
    await dbConnect();
    const jsonData = data;
    //const jsonData = JSON.parse(initialData);
    console.log(jsonData);
    const events = await Event.insertMany(jsonData);
    console.log("Initial data has been seeded.");
    return events;
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}