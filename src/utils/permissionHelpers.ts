import { Role, Permission, PermissionMatrix } from '../types/permissions';
import { PERMISSION_MATRIX, getRoleDefinition } from '../config/roles';

/**
 * Check if a user with given roles can perform an action on a resource
 */
export const canUserAccess = (
  userRoles: Role[],
  resource: string,
  action: string
): boolean => {
  const resourcePermissions = PERMISSION_MATRIX[resource];
  if (!resourcePermissions) return false;
  
  const allowedRoles = resourcePermissions[action];
  if (!allowedRoles) return false;
  
  return userRoles.some(role => allowedRoles.includes(role));
};

/**
 * Get all resources a user can access with their roles
 */
export const getUserAccessibleResources = (
  userRoles: Role[],
  action: string = 'read'
): string[] => {
  const accessibleResources: string[] = [];
  
  Object.keys(PERMISSION_MATRIX).forEach(resource => {
    if (canUserAccess(userRoles, resource, action)) {
      accessibleResources.push(resource);
    }
  });
  
  return accessibleResources;
};

/**
 * Get the highest role level from a list of roles
 */
export const getHighestRole = (roles: Role[]): Role | null => {
  if (!roles.length) return null;
  
  let highestRole = roles[0];
  let highestLevel = getRoleDefinition(roles[0])?.level || Infinity;
  
  roles.forEach(role => {
    const roleDef = getRoleDefinition(role);
    if (roleDef && roleDef.level < highestLevel) {
      highestRole = role;
      highestLevel = roleDef.level;
    }
  });
  
  return highestRole;
};

/**
 * Check if one role is higher than another
 */
export const isRoleHigher = (role1: Role, role2: Role): boolean => {
  const role1Def = getRoleDefinition(role1);
  const role2Def = getRoleDefinition(role2);
  
  if (!role1Def || !role2Def) return false;
  
  return role1Def.level < role2Def.level;
};

/**
 * Get all permissions for a given role
 */
export const getRolePermissions = (role: Role): Permission[] => {
  const roleDef = getRoleDefinition(role);
  return roleDef?.permissions || [];
};

/**
 * Get all roles that can perform a specific action on a resource
 */
export const getRolesForPermission = (
  resource: string,
  action: string
): Role[] => {
  const resourcePermissions = PERMISSION_MATRIX[resource];
  if (!resourcePermissions) return [];
  
  return resourcePermissions[action] || [];
};

/**
 * Generate a permission audit report for a user
 */
export const generatePermissionAudit = (userRoles: Role[]) => {
  const audit = {
    roles: userRoles,
    highestRole: getHighestRole(userRoles),
    accessibleResources: {} as Record<string, string[]>,
    deniedResources: {} as Record<string, string[]>
  };
  
  // TODO: Implement detailed audit logic based on business requirements
  // This would analyze all resources and actions the user can/cannot access
  
  return audit;
};

/**
 * Validate permission matrix configuration
 */
export const validatePermissionMatrix = (): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  // TODO: Add validation logic for permission matrix
  // - Check for circular dependencies
  // - Validate role hierarchy consistency
  // - Ensure all referenced roles exist
  // - Check for orphaned permissions
  
  return {
    isValid: errors.length === 0,
    errors
  };
};