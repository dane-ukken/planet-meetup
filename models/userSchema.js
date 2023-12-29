import mongoose from "mongoose";

const registeredEventSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

const userCartSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    createdAt: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    cart: [userCartSchema],
    registeredEvents: [registeredEventSchema],
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { _id: true }
);

export default userSchema;
