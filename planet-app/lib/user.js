import crypto from "crypto";
import User from "../models/user";
import dbConnect from "./db";

export async function createUser({
  username,
  email,
  phone,
  address,
  password,
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
      reject(new Error(`${field} already exists`));
    } else {
      console.log("Error creating user:", err);
      reject(err);
    }
  }
}

export async function findUser({ username }) {
  await dbConnect();
  return User.findOne({ username: username })
    .then((user) => {
      console.log(`found user`);
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
