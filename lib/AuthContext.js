import { useState, useEffect, createContext, useContext } from 'react';
import Router from 'next/router';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = (props) => (
  <AuthContext.Provider value={useProvideAuth()} {...props} />
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

function useProvideAuth() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setUserLoaded(!!session);

    if (user) {
      signIn(user.id, user.email);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        if (currentUser) {
          signIn(currentUser.id, currentUser.email);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [user]);

  const signIn = async (id, username) => {
    const { body } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', id);
    const result = body[0];

    // If the user exists in the users table, update the username.
    // If not, create a new row.
    result?.id
      ? await supabase
          .from('users')
          .update({ id, username })
          .match({ id })
          .single()
      : await supabase.from('users').insert([{ id, username }]).single();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    Router.push('/');
  };

  return {
    userLoaded,
    user,
    session,
    signIn,
    signOut,
  };
}
