import mongoose from "mongoose";

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
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    registered_events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { _id: true }
);

const wplA4Db = mongoose.connection.useDb("wpl-a4-db");

export default wplA4Db.models.User || wplA4Db.model("User", userSchema);
