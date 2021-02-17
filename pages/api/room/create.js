import { supabaseAdmin } from '@/lib/initSupabaseAdmin';
import { generateVideoToken } from '@/lib/twilioAdmin';
import { slugify } from '@/utils/helpers';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  try {
    const { identity } = req.body;

    if (!identity) {
      return res.status(400).json({ message: 'identity is required' });
    }

    const roomName = slugify(nanoid());

    const { error } = await supabaseAdmin
      .from('rooms')
      .insert([{ slug: roomName }]);

    if (error) throw error;

    const token = generateVideoToken(identity, roomName);

    return res.status(200).json({ token, roomName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
