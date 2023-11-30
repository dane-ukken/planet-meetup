import { createUser } from "../../lib/user";

export default async function signup(req, res) {
  try {
    const user = await createUser(req.body);
    console.log("User created: ", user);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
