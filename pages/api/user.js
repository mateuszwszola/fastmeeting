import { supabase } from '@/lib/initSupabase';

// Verify and get user data server-side
export default async function handler(req, res) {
  const { token } = req.headers;

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) {
    return res.status(401).json({ error: error.message });
  } else {
    return res.status(200).json(user);
  }
}
