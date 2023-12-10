import crypto from "crypto";
import { User } from "../models/dbModels";
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
      console.log(`found user`);
      console.log(user);
      return user;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  console.log(`passwordsMatch: ${passwordsMatch}`);
  return passwordsMatch;
}
