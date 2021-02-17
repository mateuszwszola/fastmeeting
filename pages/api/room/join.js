import { supabaseAdmin } from '@/lib/initSupabaseAdmin';
import { generateVideoToken } from '@/lib/twilioAdmin';

export default async function handler(req, res) {
  try {
    const { roomName, identity } = req.body;

    if (!roomName || !identity) {
      return res
        .status(400)
        .json({ message: 'room name and identity are required' });
    }

    const { data, error: dbError } = await supabaseAdmin
      .from('rooms')
      .select('*')
      .eq('slug', roomName);

    if (dbError) throw dbError;

    const room = data[0];

    if (!room) {
      return res.status(404).json({ message: `Room ${roomName} not found` });
    }

    const token = generateVideoToken(identity, roomName);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
