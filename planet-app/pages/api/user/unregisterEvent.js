import { unregisterEvents } from '../../../lib/user';

export default async function postRegisterHandler(req, res) {
  if (req.method === 'PUT')  {
    console.log('Reached API 1');
    const { username, eventId, updatedRegisteredEvents } = req.body;

    try {
      console.log('Reached API');
      const result = await unregisterEvents(username, eventId, updatedRegisteredEvents);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error registering events:', error);
      res.status(500).json({ message: 'Error registering events' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
