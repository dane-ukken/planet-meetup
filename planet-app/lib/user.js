import crypto from "crypto";
import { User, Event } from "../models/dbModels";
import dbConnect from "./db";

export async function createUser({
  username,
  email,
  phone,
  address,
  password,
  role,
}) {
  await dbConnect();

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const newUser = new User({
    createdAt: Date.now(),
    username,
    email,
    phone,
    address,
    role,
    hash,
    salt,
  });

  try {
    const user = await newUser.save();
    console.log("User created");
    return { username, createdAt: user.createdAt };
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      console.log(`Duplicate ${field} error: `, err);
      throw new Error(`${field} already exists`);
    } else {
      console.log("Error creating user:", err);
      throw err;
    }
  }
}

export async function findUser({ username }) {
  await dbConnect();
  return User.findOne({ username: username })
    .populate({
      path: "cart.event",
    })
    .populate({
      path: "registeredEvents.event",
    })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export const registerEvents = async (username) => {
  await dbConnect();

  try {
    const user = await User.findOne({ username: username })
    .populate({
      path: "cart.event",
    })
    .populate({
      path: "registeredEvents.event",
    });
    const cartEventIds = user.cart.map(e => ({ event: e.event._id }));
    const registeredEvents = user.registeredEvents.map(e => ({ event: e.event._id }));
    const updatedRegisteredEvents = [...registeredEvents, ...cartEventIds];
    user.registeredEvents = updatedRegisteredEvents;
    user.cart = [];
    await user.save();

    // Update the spots left for each event
    for (const cartEvent of cartEventIds) {
      const eventId = cartEvent.event;
      const event = await Event.findById(eventId);
      if (event.spotsLeft > 0) {
        event.spotsLeft -= 1;
        await event.save();
      } else {
        console.log('Error!!! User registered with zero spots');
      }
    }

    return { status: 'success', message: 'Events registered successfully' };
  } catch (error) {
    throw error;
  }
};

export const unregisterEvents = async (username, eventId, updatedRegisteredEvents) => {
  await dbConnect();

  try {
    console.log('reached db place');
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { registeredEvents: updatedRegisteredEvents } },
      { new: true, populate: { path: 'registeredEvents.event' } }
    ).populate({
      path: "cart.event",
    })
    .populate({
      path: "registeredEvents.event",
    });
    const event = await Event.findById(eventId);
    if (event.spotsLeft < event.maxAttendees) {
      event.spotsLeft += 1;
      await event.save();
    } else {
      console.log('Error!!! More than maxAttendees spots');
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (username, newCart) => {
  await dbConnect();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { cart: newCart } },
      { new: true, populate: { path: 'cart.event' } }
    ).populate({
      path: "cart.event",
    })
    .populate({
      path: "registeredEvents.event",
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Error updating cart');
  }
};

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  console.log(`passwordsMatch: ${passwordsMatch}`);
  return passwordsMatch;
}

export async function getAllUsers() {
  await dbConnect();

  return User.find({})
    .then((users) => {
      console.log(`found users`);
      return users;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
