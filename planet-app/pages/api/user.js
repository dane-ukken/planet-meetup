import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    const user =
      (session && (await findUser({ username: session.username }))) ?? null;

    if (!user) {
      return res.status(200).json({ user });
    }

    const {
      username,
      email,
      phone,
      address,
      role,
      createdAt,
      cart,
      registeredEvents,
    } = user || {};
    res.status(200).json({
      user: {
        createdAt,
        username,
        email,
        phone,
        address,
        role,
        cart,
        registeredEvents,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
