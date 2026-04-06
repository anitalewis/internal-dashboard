import React from 'react';
import { ShieldX, ArrowLeft, Mail, HelpCircle } from 'lucide-react';
import { Role, AccessDeniedInfo } from '../types/permissions';
import { getRoleDefinition } from '../config/roles';

interface AccessDeniedProps {
  requiredRole?: Role;
  requiredPermission?: {
    resource: string;
    action: string;
  };
  currentRole: Role;
  escalationContact?: string;
  alternativeActions?: string[];
  onGoBack?: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  requiredRole,
  requiredPermission,
  currentRole,
  escalationContact,
  alternativeActions,
  onGoBack
}) => {
  const currentRoleDefinition = getRoleDefinition(currentRole);
  const requiredRoleDefinition = requiredRole ? getRoleDefinition(requiredRole) : null;

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  const handleRequestAccess = () => {
    // TODO: Implement access request functionality
    // This could open a modal, send an email, or redirect to a request form
    console.log('Access request functionality not implemented yet');
  };

  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <div className="access-denied-icon">
          <ShieldX size={64} className="text-red-500" />
        </div>
        
        <h1 className="access-denied-title">
          Access Restricted
        </h1>
        
        <div className="access-denied-message">
          <p>
            You don't have sufficient permissions to access this resource.
          </p>
          
          <div className="permission-details">
            <div className="current-access">
              <strong>Your current access level:</strong>
              <span className={`role-badge role-${currentRole}`}>
                {currentRoleDefinition?.displayName || currentRole}
              </span>
              <small>{currentRoleDefinition?.description}</small>
            </div>
            
            {requiredRoleDefinition && (
              <div className="required-access">
                <strong>Required access level:</strong>
                <span className={`role-badge role-${requiredRole}`}>
                  {requiredRoleDefinition.displayName}
                </span>
                <small>{requiredRoleDefinition.description}</small>
              </div>
            )}
            
            {requiredPermission && (
              <div className="required-permission">
                <strong>Required permission:</strong>
                <code>
                  {requiredPermission.action} access to {requiredPermission.resource}
                </code>
              </div>
            )}
          </div>
        </div>
        
        {alternativeActions && alternativeActions.length > 0 && (
          <div className="alternative-actions">
            <h3>What you can do instead:</h3>
            <ul>
              {alternativeActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="access-denied-actions">
          <button 
            onClick={handleGoBack}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          
          <button 
            onClick={handleRequestAccess}
            className="btn btn-primary"
          >
            <Mail size={16} />
            Request Access
          </button>
          
          {escalationContact && (
            <div className="escalation-contact">
              <HelpCircle size={16} />
              <span>
                Need help? Contact: 
                <a href={`mailto:${escalationContact}`}>
                  {escalationContact}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Default styles (should be moved to CSS file in real implementation)
const styles = `
.access-denied-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
}

.access-denied-content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
}

.access-denied-icon {
  margin-bottom: 1rem;
}

.access-denied-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

.permission-details {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  text-align: left;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0.5rem;
}

.role-admin { background: #fee2e2; color: #dc2626; }
.role-manager { background: #dbeafe; color: #2563eb; }
.role-analyst { background: #d1fae5; color: #059669; }
.role-viewer { background: #f3f4f6; color: #6b7280; }

.access-denied-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: none;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.escalation-contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}
`;

// Inject styles (in real app, this would be in a CSS file)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}