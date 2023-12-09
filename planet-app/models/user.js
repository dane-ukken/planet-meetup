import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.Mixed },
  registered_events: { type: mongoose.Schema.Types.Mixed },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

const wplA4Db = mongoose.connection.useDb("wpl-a4-db");

export default wplA4Db.models.User || wplA4Db.model("User", userSchema);
