import { supabase } from '@/lib/supabase';

// Verify and get user data server-side
const getUser = async (req, res) => {
  const token = req.headers.token;

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) {
    return res.status(401).json({ error: error.message });
  } else {
    return res.status(200).json(user);
  }
};

export default getUser;
