import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Verify admin status server-side
        if (session?.user) {
          // Use setTimeout to avoid potential race conditions with session
          setTimeout(() => {
            verifyAdminStatus(session.access_token);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        verifyAdminStatus(session.access_token);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Server-side admin verification via edge function
  const verifyAdminStatus = async (accessToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-admin', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (error) {
        console.error("Error verifying admin status:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data?.isAdmin === true);
    } catch (error) {
      console.error("Error verifying admin status:", error);
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return { user, session, isAdmin, loading, signOut };
}
