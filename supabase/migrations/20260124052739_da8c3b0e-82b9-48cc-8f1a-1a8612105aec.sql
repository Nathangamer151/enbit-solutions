-- Revoke all permissions from anonymous users on profiles table
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.profiles FROM public;

-- Revoke all permissions from anonymous users on user_roles table
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.user_roles FROM public;

-- Grant necessary permissions back to authenticated users only
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;