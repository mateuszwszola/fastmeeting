import { supabaseAdmin } from '@/lib/initSupabaseAdmin';
import { twilioAdminClient } from '@/lib/initTwilioAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.headers;
    const { roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({ message: 'Room name is required' });
    }

    try {
      const { data: user, authError } = await supabaseAdmin.auth.api.getUser(
        token
      );

      if (authError) throw authError;

      const { data, error: dbError } = await supabaseAdmin
        .from('rooms')
        .select('*')
        .eq('slug', roomName)
        .eq('owner_id', user.id);

      if (dbError) throw dbError;

      const room = data[0];

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Complete Twilio room
      await twilioAdminClient.video
        .rooms(roomName)
        .update({ status: 'completed' });

      res.status(200).json({ message: 'Twilio room completed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
