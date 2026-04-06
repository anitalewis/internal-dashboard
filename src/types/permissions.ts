// Core permission system types
export type Role = 'admin' | 'manager' | 'analyst' | 'viewer';

export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'export';
}

export interface RoleDefinition {
  name: Role;
  displayName: string;
  description: string;
  permissions: Permission[];
  level: number; // Hierarchy level (1=highest)
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  primaryRole: Role;
}

export interface PermissionMatrix {
  [resource: string]: {
    [action: string]: Role[];
  };
}

export interface AccessDeniedInfo {
  requiredRole: Role;
  requiredPermission: Permission;
  currentRole: Role;
  escalationContact?: string;
  alternativeActions?: string[];
}