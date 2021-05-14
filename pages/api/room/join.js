import { getRoomBySlug } from '@/lib/dbAdmin';
import { twilioAdminClient } from '@/lib/initTwilioAdmin';
import { generateVideoToken, retrieveInProgressRoom } from '@/lib/twilioAdmin';
import { ErrorHandler } from '@/utils/error';
import { getWebhookStatusCallback } from '@/utils/helpers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { roomName, userId, userDisplayName } = req.body;

      if (!roomName || !userId || !userDisplayName) {
        throw new ErrorHandler(
          400,
          'room name, user id and user name are required'
        );
      }

      // Check if room exists in a supabase
      const room = await getRoomBySlug(roomName);
      if (!room) {
        throw new ErrorHandler(404, `Room ${roomName} not found`);
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

      const identity = JSON.stringify({ id: userId, name: userDisplayName });

      const token = generateVideoToken(identity, roomName);

      return res.status(200).json({ token, roomName });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
