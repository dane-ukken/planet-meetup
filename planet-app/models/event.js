import mongoose from "mongoose";
import dbConnect from "../lib/db";

const eventSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventStatus: { type: String, required: true },
  maxAttendees: { type: Number },
  eventOrg: { type: String, required: true },
});
// const cnt = await dbConnect();
// const wplA4Db = mongoose.connection.useDb("wpl-a4-db");
// // const wplA4Db = cnt.useDb("wpl-a4-db");

// export default wplA4Db.models.Event || wplA4Db.model("Event", eventSchema);
