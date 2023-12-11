import { registerEvents } from '../../../lib/user';

export default async function postRegisterHandler(req, res) {
  if (req.method === 'POST') {
    const { username } = req.body;

    try {
      const result = await registerEvents(username);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error registering events:', error);
      res.status(500).json({ message: 'Error registering events' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
