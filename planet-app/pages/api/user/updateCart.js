import { updateCart } from '../../../lib/user';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { username, cart } = req.body;

    try {
      const updatedUser = await updateCart(username, cart);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
