
-- Revoke broad EXECUTE on SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- has_role is used by RLS policies; authenticated users need EXECUTE for policy evaluation
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
