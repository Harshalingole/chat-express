import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import useStore from '../store/useStore';
import useChatStore from '../store/useStore';

const useAuth = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const setSession = useStore((state) => state.setSession);
  const user = useChatStore((state) => state.user)
  const setUser = useChatStore((state) => state.setUser)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user)
        setIsLoading(false);
      } else {
        if(user === null){
          router.replace('/login');
        }
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setSession(session);
          setIsLoading(false);
        } else {
          router.replace('/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  return { isLoading };
};

export default useAuth;
