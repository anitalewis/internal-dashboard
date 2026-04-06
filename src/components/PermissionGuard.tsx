import React, { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { Role } from '../types/permissions';
import { AccessDenied } from './AccessDenied';

interface PermissionGuardProps {
  children: ReactNode;
  resource?: string;
  action?: string;
  role?: Role;
  minimumRole?: Role;
  fallback?: ReactNode;
  showFallback?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  resource,
  action = 'read',
  role,
  minimumRole,
  fallback,
  showFallback = true
}) => {
  const { hasPermission, hasRole, hasMinimumRoleLevel, getCurrentRole } = usePermissions();

  // Check permission based on resource and action
  if (resource && !hasPermission(resource, action)) {
    if (!showFallback) return null;
    
    return fallback || (
      <AccessDenied 
        requiredPermission={{ resource, action: action as any }}
        currentRole={getCurrentRole() || 'viewer'}
      />
    );
  }

  // Check specific role
  if (role && !hasRole(role)) {
    if (!showFallback) return null;
    
    return fallback || (
      <AccessDenied 
        requiredRole={role}
        currentRole={getCurrentRole() || 'viewer'}
      />
    );
  }

  // Check minimum role level
  if (minimumRole && !hasMinimumRoleLevel(minimumRole)) {
    if (!showFallback) return null;
    
    return fallback || (
      <AccessDenied 
        requiredRole={minimumRole}
        currentRole={getCurrentRole() || 'viewer'}
      />
    );
  }

  return <>{children}</>;
};