import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    createdAt: { type: Date, required: true },
    eventName: { type: String, required: true, unique: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventStatus: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    eventPrice: { type: Number, required: true },
    eventImgUrl: { type: String, required: true },
    eventOrg: { type: String, required: true },
    eventDescription: { type: String, required: true },
  },
  { _id: true }
);

export default eventSchema;
