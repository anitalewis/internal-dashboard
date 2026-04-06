import { useContext, useMemo } from 'react';
import { Role, Permission } from '../types/permissions';
import { PERMISSION_MATRIX, getRoleDefinition, hasMinimumRole } from '../config/roles';
// TODO: Import AuthContext when authentication is implemented
// import { AuthContext } from '../contexts/AuthContext';

interface UsePermissionsReturn {
  hasPermission: (resource: string, action: string) => boolean;
  hasRole: (role: Role) => boolean;
  hasMinimumRoleLevel: (role: Role) => boolean;
  getCurrentRole: () => Role | null;
  getAllRoles: () => Role[];
  canAccessResource: (resource: string) => boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  // TODO: Get current user from auth context
  // const { user } = useContext(AuthContext);
  
  // Temporary mock user - replace with actual auth context
  const user = {
    id: '1',
    name: 'Mock User',
    email: 'user@example.com',
    roles: ['viewer'] as Role[],
    primaryRole: 'viewer' as Role
  };

  const hasPermission = useMemo(() => {
    return (resource: string, action: string): boolean => {
      if (!user) return false;
      
      const resourcePermissions = PERMISSION_MATRIX[resource];
      if (!resourcePermissions) return false;
      
      const allowedRoles = resourcePermissions[action];
      if (!allowedRoles) return false;
      
      return user.roles.some(role => allowedRoles.includes(role));
    };
  }, [user]);

  const hasRole = useMemo(() => {
    return (role: Role): boolean => {
      if (!user) return false;
      return user.roles.includes(role);
    };
  }, [user]);

  const hasMinimumRoleLevel = useMemo(() => {
    return (requiredRole: Role): boolean => {
      if (!user) return false;
      return user.roles.some(userRole => hasMinimumRole(userRole, requiredRole));
    };
  }, [user]);

  const getCurrentRole = (): Role | null => {
    return user?.primaryRole || null;
  };

  const getAllRoles = (): Role[] => {
    return user?.roles || [];
  };

  const canAccessResource = (resource: string): boolean => {
    return hasPermission(resource, 'read');
  };

  return {
    hasPermission,
    hasRole,
    hasMinimumRoleLevel,
    getCurrentRole,
    getAllRoles,
    canAccessResource
  };
};