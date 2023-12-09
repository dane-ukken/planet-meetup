import dbConnect from "./db";
import Event from "../models/event";
// import fs from "fs/promises";
import data from "./seed-data.json";

async function seedInitialData() {
  try {
    await dbConnect();

    // const initialData = await fs.readFile("./seed-data.json", "utf-8");
    const initialData = data;
    const jsonData = JSON.parse(initialData);

    await Event.insertMany(jsonData);

    console.log("Initial data has been seeded.");
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}
export default seedInitialData;
