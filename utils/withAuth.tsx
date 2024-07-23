import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { createClient } from './supabase/client';
import { Session } from '@supabase/supabase-js';

const withAuth = (WrappedComponent: React.FC) => {
  const supabase = createClient()
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setSession(data.session);
          setIsLoading(false);
        } else {
          router.replace('/login');
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
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} session={session} />;
  };
};

export default withAuth;
