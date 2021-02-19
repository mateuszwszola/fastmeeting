import { supabaseAdmin } from '@/lib/initSupabaseAdmin';
import { twilioAdminClient } from '@/lib/initTwilioAdmin';
import { retrieveInProgressRoom, generateVideoToken } from '@/lib/twilioAdmin';
import { getWebhookStatusCallback } from '@/utils/helpers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { roomName, identity } = req.body;

      if (!roomName || !identity) {
        return res
          .status(400)
          .json({ message: 'room name and identity are required' });
      }

      // Check if room exists in a supabase
      const { data, error: dbError } = await supabaseAdmin
        .from('rooms')
        .select('*')
        .eq('slug', roomName);

      if (dbError) throw dbError;

      const room = data[0];

      if (!room) {
        return res.status(404).json({ message: `Room ${roomName} not found` });
      }

      // Create Twilio Room via REST API if it wasn't created yet
      try {
        await retrieveInProgressRoom(roomName);
      } catch (error) {
        await twilioAdminClient.video.rooms.create({
          uniqueName: roomName,
          statusCallback: getWebhookStatusCallback(),
        });
      }

      const token = generateVideoToken(identity, roomName);

      return res.status(200).json({ token, roomName });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
