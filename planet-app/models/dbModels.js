import mongoose from "mongoose";
import eventSchema from "./eventSchema";
import userSchema from "./userSchema";

const wplA4Db = mongoose.connection.useDb("wpl-a4-db");

const Event = wplA4Db.model("Event", eventSchema);
const User = wplA4Db.model("User", userSchema);

export { Event, User };
