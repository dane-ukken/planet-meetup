import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session._doc))) ?? null;

    if (!user) {
      return res.status(200).json({ user });
    }

    const { username, email, phone, address, createdAt } = user || {};
    res.status(200).json({
      user: {
        username,
        email,
        phone,
        address,
        createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
