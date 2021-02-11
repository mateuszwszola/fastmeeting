import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  try {
    const { id: roomId } = req.query;

    const room = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .single();

    if (room) {
      return res.status(200).json({ room });
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
