import twilioClient from 'twilio';
import { deleteAnonymousRoom } from '@/lib/dbAdmin';
import { getWebhookStatusCallback } from '@/utils/helpers';

const authToken = process.env.TWILIO_AUTH_TOKEN;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const twilioSignature = req.headers['X-Twilio-Signature'];

    try {
      twilioClient.validateRequest(
        authToken,
        twilioSignature,
        getWebhookStatusCallback(),
        req.body
      );
    } catch (error) {
      console.log(error);
      return res.status(error.status || 403).json({ message: error.message });
    }

    const { RoomName, StatusCallbackEvent } = req.body;

    try {
      if (StatusCallbackEvent === 'room-ended') {
        await deleteAnonymousRoom(RoomName);
      }
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || 500)
        .json({ error: error.message || 'Webhook handler failed. View logs.' });
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
