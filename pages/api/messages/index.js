import {
  createMessage,
  getMessagesByRoomId,
  getUnlockedRoomBySlug,
} from '@/lib/dbAdmin';

export default async function handler(req, res) {
  try {
    const { roomName } = req.query;

    if (!roomName) {
      return res.status(400).json({ message: 'room name is required' });
    }

    // Check if the room exists in a supabase and it is not locked
    const room = await getUnlockedRoomBySlug(roomName);

    if (!room) {
      return res.status(404).json({ message: `Room ${roomName} not found` });
    }

    if (req.method === 'GET') {
      const messages = await getMessagesByRoomId(room.id);

      return res.status(200).json({ messages });
    } else if (req.method === 'POST') {
      const { identity, message } = req.body;

      if (!identity || !message) {
        return res
          .status(400)
          .json({ message: 'required values are not provided' });
      }

      const response = await createMessage(room.id, { identity, message });

      return res.status(200).json({ message: response });
    } else {
      res.setHeader('Allow', 'GET,POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
