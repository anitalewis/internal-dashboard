import { RoleDefinition, PermissionMatrix } from '../types/permissions';

// Define the four-tier role hierarchy
export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    name: 'admin',
    displayName: 'Administrator',
    description: 'Full system access with user management capabilities',
    level: 1,
    permissions: [
      // TODO: Define admin permissions based on business requirements
      // Example: { resource: 'users', action: 'write' }
    ]
  },
  {
    name: 'manager',
    displayName: 'Manager',
    description: 'Department-level access with team oversight capabilities',
    level: 2,
    permissions: [
      // TODO: Define manager permissions based on business requirements
    ]
  },
  {
    name: 'analyst',
    displayName: 'Analyst',
    description: 'Data analysis and reporting capabilities',
    level: 3,
    permissions: [
      // TODO: Define analyst permissions based on business requirements
    ]
  },
  {
    name: 'viewer',
    displayName: 'Viewer',
    description: 'Read-only access to assigned data',
    level: 4,
    permissions: [
      // TODO: Define viewer permissions based on business requirements
    ]
  }
];

// Granular permission matrix
export const PERMISSION_MATRIX: PermissionMatrix = {
  // TODO: Define permission matrix based on dashboard sections
  // Example structure:
  // 'dashboard': {
  //   'read': ['admin', 'manager', 'analyst', 'viewer'],
  //   'write': ['admin', 'manager'],
  //   'export': ['admin', 'manager', 'analyst']
  // },
  // 'user-management': {
  //   'read': ['admin'],
  //   'write': ['admin'],
  //   'delete': ['admin']
  // }
};

// Helper function to get role by name
export const getRoleDefinition = (roleName: string): RoleDefinition | undefined => {
  return ROLE_DEFINITIONS.find(role => role.name === roleName);
};

// Helper function to check if role has higher or equal level
export const hasMinimumRole = (userRole: string, requiredRole: string): boolean => {
  const user = getRoleDefinition(userRole);
  const required = getRoleDefinition(requiredRole);
  
  if (!user || !required) return false;
  
  return user.level <= required.level;
};