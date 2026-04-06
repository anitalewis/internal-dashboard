import React, { useState } from 'react';
import { Shield, ChevronDown, Info } from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';
import { getRoleDefinition } from '../config/roles';

interface RoleIndicatorProps {
  showTooltip?: boolean;
  showDropdown?: boolean;
  className?: string;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({
  showTooltip = true,
  showDropdown = false,
  className = ''
}) => {
  const { getCurrentRole, getAllRoles } = usePermissions();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const currentRole = getCurrentRole();
  const allRoles = getAllRoles();
  
  if (!currentRole) return null;
  
  const roleDefinition = getRoleDefinition(currentRole);
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#dc2626';
      case 'manager': return '#2563eb';
      case 'analyst': return '#059669';
      case 'viewer': return '#6b7280';
      default: return '#6b7280';
    }
  };
  
  const handleMouseEnter = () => {
    if (showTooltip) setIsTooltipVisible(true);
  };
  
  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };
  
  const toggleDropdown = () => {
    if (showDropdown) setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <div 
      className={`role-indicator ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="role-indicator-badge"
        onClick={toggleDropdown}
        style={{
          backgroundColor: getRoleColor(currentRole),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: '500',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          cursor: showDropdown ? 'pointer' : 'default',
          position: 'relative'
        }}
      >
        <Shield size={12} />
        <span>{roleDefinition?.displayName || currentRole}</span>
        {showDropdown && <ChevronDown size={12} />}
      </div>
      
      {/* Tooltip */}
      {showTooltip && isTooltipVisible && (
        <div className="role-tooltip">
          <div className="tooltip-header">
            <Info size={14} />
            <strong>Access Level: {roleDefinition?.displayName}</strong>
          </div>
          <p>{roleDefinition?.description}</p>
          {allRoles.length > 1 && (
            <div className="additional-roles">
              <small>Additional roles: {allRoles.filter(r => r !== currentRole).join(', ')}</small>
            </div>
          )}
          {/* TODO: Add specific permissions list based on business requirements */}
          <div className="permissions-summary">
            <small>Permissions: <em>Details to be configured</em></small>
          </div>
        </div>
      )}
      
      {/* Dropdown */}
      {showDropdown && isDropdownOpen && (
        <div className="role-dropdown">
          <div className="dropdown-header">
            <strong>Your Access Levels</strong>
          </div>
          {allRoles.map(role => {
            const roleDef = getRoleDefinition(role);
            const isActive = role === currentRole;
            
            return (
              <div 
                key={role}
                className={`dropdown-item ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.5rem',
                  borderLeft: `3px solid ${getRoleColor(role)}`,
                  backgroundColor: isActive ? '#f9fafb' : 'transparent'
                }}
              >
                <div className="role-name">
                  {roleDef?.displayName || role}
                  {isActive && <span className="active-indicator">(Current)</span>}
                </div>
                <div className="role-description">
                  <small>{roleDef?.description}</small>
                </div>
              </div>
            );
          })}
          
          {/* TODO: Add role switching functionality if business requires it */}
          <div className="dropdown-footer">
            <small>Role switching: <em>To be implemented</em></small>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles (should be moved to CSS file in real implementation)
const tooltipStyles = `
.role-indicator {
  position: relative;
  display: inline-block;
}

.role-tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  margin-top: 0.25rem;
}

.role-tooltip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #e2e8f0;
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.role-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 250px;
  margin-top: 0.25rem;
}

.dropdown-header {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f9fafb;
  border-radius: 6px 6px 0 0;
}

.dropdown-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background: #f9fafb;
}

.dropdown-footer {
  padding: 0.5rem 0.75rem;
  border-top: 1px solid #e2e8f0;
  background: #f9fafb;
  border-radius: 0 0 6px 6px;
}

.active-indicator {
  font-weight: normal;
  color: #059669;
  margin-left: 0.5rem;
}

.additional-roles {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.permissions-summary {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
  font-style: italic;
}
`;

// Inject styles (in real app, this would be in a CSS file)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = tooltipStyles;
  document.head.appendChild(styleSheet);
}