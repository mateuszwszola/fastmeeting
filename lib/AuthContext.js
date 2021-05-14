import { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import useSetState from '@/hooks/useSetState';

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [state, setState] = useSetState({
    user: null,
    session: null,
  });

  useEffect(() => {
    const session = supabase.auth.session();
    setState({
      session,
      user: session?.user ?? null,
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState({
          session,
          user: session?.user ?? null,
        });
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [setState]);

  const value = {
    ...state,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
