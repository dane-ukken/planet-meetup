import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventStatus: { type: String, required: true },
  maxAttendees: { type: Number },
  eventPrice: { type: Number, required: true },
  eventImgUrl: { type: String, required: true },
  eventOrg: { type: String, required: true },
  eventDescription: { type: String, required: true }
});

const wplA4Db = mongoose.connection.useDb("wpl-a4-db");

export default wplA4Db.models.Event || wplA4Db.model("Event", eventSchema);

