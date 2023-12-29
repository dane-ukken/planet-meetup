import mongoose from "mongoose";
import eventSchema from "./eventSchema";
import userSchema from "./userSchema";

const planetDb = mongoose.connection.useDb("planet-db");

const Event = planetDb.model("Event", eventSchema);
const User = planetDb.model("User", userSchema);

export { Event, User };
