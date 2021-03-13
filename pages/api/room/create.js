import { generateSlug } from 'random-word-slugs';
import { supabaseAdmin } from '@/lib/initSupabaseAdmin';
import { twilioAdminClient } from '@/lib/initTwilioAdmin';
import { generateVideoToken } from '@/lib/twilioAdmin';
import { getWebhookStatusCallback } from '@/utils/helpers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { identity } = req.body;

      if (!identity) {
        return res.status(400).json({ message: 'identity is required' });
      }

      const randomRoomSlug = generateSlug();

      // Create room record in a database
      const { error } = await supabaseAdmin
        .from('rooms')
        .insert([{ slug: randomRoomSlug }]);

      if (error) throw error;

      // Create Twilio Room via REST API and pass callback url
      const { uniqueName } = await twilioAdminClient.video.rooms.create({
        uniqueName: randomRoomSlug,
        statusCallback: getWebhookStatusCallback(),
      });

      const token = generateVideoToken(identity, uniqueName);

      return res.status(200).json({ token, roomName: uniqueName });
    } catch (error) {
      console.log(error);
      res
        .status(error.status || 500)
        .json({ message: `Error: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
