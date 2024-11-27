const rolePermissions = {
    
    // Commandant role with full permissions 
    commandant: [
        'user:create','user:view', 'user:edit', 'user:delete',
        'asset:create','asset:view', 'asset:edit', 'asset:delete','asset:track',
        'staff:create','staff:view', 'staff:edit', 'staff:delete',
        'claim:create','claim:view', 'claim:edit', 'claim:delete',
        'supplier:create','supplier:view', 'supplier:edit', 'supplier:delete',
        'report:create','report:view', 'report:edit', 'report:delete', 'export:report', 'share:report',
        'department:create','department:view', 'department:edit', 'department:delete',
        'dashboard:view'

      ],
    
    // Admin role with some management permissions
    administrator: [
      'user:create','user:view', 'user:edit', 'user:delete',
        'asset:create','asset:view', 'asset:edit', 'asset:delete','asset:track',
        'staff:create','staff:view', 'staff:edit', 'staff:delete',
        'claim:create','claim:view', 'claim:edit', 'claim:delete',
        'supplier:create','supplier:view', 'supplier:edit', 'supplier:delete',
        'report:create','report:view', 'report:edit', 'report:delete', 'export:report', 'share:report',
        'department:create','department:view', 'department:edit', 'department:delete',
        'dashboard:view'
    ],
    
    // Head of Stores role with stock, management
    store_head: [
        'asset:create','asset:view', 'asset:edit','asset:track',
        'staff:view', 
        'claim:create','claim:view', 'claim:edit', 'claim:delete',
        'supplier:create','supplier:view', 'supplier:edit', 'supplier:delete',
        'report:create','report:view',
        'dashboard:view'
    ],
    
    // Director role with reporting and center management
    store_keeper: [
      
        'asset:create','asset:view', 'asset:edit', 'asset:track',
        'staff:view',
        'claim:create','claim:view', 'claim:edit', 
        'supplier:create','supplier:view', 'supplier:edit',
        'report:view', 
        'department:view', 
        'dashboard:view'
    ],
    
  };
  
  module.exports = rolePermissions;
  