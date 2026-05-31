-- Fix 1: Improve has_role function with explicit access checks
-- This prevents non-admin users from checking other users' roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow checking the calling user's own roles unless they're an admin
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  IF auth.uid() != _user_id THEN
    -- Check if caller is an admin before allowing cross-user checks
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    ) THEN
      RETURN false;
    END IF;
  END IF;
  
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

-- Add comment documenting the security considerations
COMMENT ON FUNCTION public.has_role(uuid, app_role) IS 
'Security-critical function used in RLS policies. Uses SECURITY DEFINER with explicit access checks: only allows checking own roles unless caller is admin.';

-- Fix 4: Add DELETE policies for admin management
-- Allow admins to delete profiles (for user account management)
CREATE POLICY "Admins can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete roles (for role management)
CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Add documentation comments
COMMENT ON TABLE public.profiles IS 'User profiles with RLS. DELETE restricted to admins only.';
COMMENT ON TABLE public.user_roles IS 'User role assignments with RLS. DELETE restricted to admins only.';