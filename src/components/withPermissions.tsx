import React, { ComponentType } from 'react';
import { PermissionGuard } from './PermissionGuard';
import { Role } from '../types/permissions';

interface WithPermissionsOptions {
  resource?: string;
  action?: string;
  role?: Role;
  minimumRole?: Role;
  fallback?: React.ComponentType;
  showFallback?: boolean;
}

// Higher-order component for declarative permission checking
export function withPermissions<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithPermissionsOptions
) {
  const WithPermissionsComponent = (props: P) => {
    const FallbackComponent = options.fallback;
    
    return (
      <PermissionGuard
        resource={options.resource}
        action={options.action}
        role={options.role}
        minimumRole={options.minimumRole}
        showFallback={options.showFallback}
        fallback={FallbackComponent ? <FallbackComponent /> : undefined}
      >
        <WrappedComponent {...props} />
      </PermissionGuard>
    );
  };

  WithPermissionsComponent.displayName = `withPermissions(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithPermissionsComponent;
}

// Convenience HOCs for common use cases
export const withAdminOnly = <P extends object>(Component: ComponentType<P>) =>
  withPermissions(Component, { role: 'admin' });

export const withManagerOrAbove = <P extends object>(Component: ComponentType<P>) =>
  withPermissions(Component, { minimumRole: 'manager' });

export const withAnalystOrAbove = <P extends object>(Component: ComponentType<P>) =>
  withPermissions(Component, { minimumRole: 'analyst' });