import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(relativePath, content) {
  const filePath = path.join(rootDir, relativePath);
  ensureDir(filePath);

  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, 'utf8');

    if (current === content) {
      return;
    }
  }

  fs.writeFileSync(filePath, `${content.trim()}\n`);
}

function titleCase(value) {
  return value
    .replace(/[-_/]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function kebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_/]+/g, '-')
    .toLowerCase();
}

function humanizeParam(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function relativeFeatureImport(featureDir) {
  return `@/features/admin/${featureDir}`;
}

const entityFeatures = [
  {
    featureDir: 'users',
    routePath: 'users',
    routeKey: 'users',
    singular: 'user',
    plural: 'users',
    singularPascal: 'User',
    pluralPascal: 'Users',
    typeName: 'User',
    idParam: 'userId',
    description: 'Manage activation, suspension, and role assignment workflows.',
    detailDescription: 'Inspect the current admin-facing user payload and lifecycle actions.',
    endpointAccessor: 'apiEndpoints.admin.users',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search users by name or email',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Name', 'text'],
      ['email', 'Email', 'text'],
      ['status', 'Status', 'status'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-user',
        functionName: 'createUser',
        label: 'Create user',
        method: 'post',
        payloadType: 'CreateUserRequest',
        surfaces: ['listForm'],
      },
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-user',
        functionName: 'updateUser',
        label: 'Update user',
        method: 'patch',
        params: ['userId'],
        payloadType: 'UpdateUserRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'activateAction',
        endpointKey: 'activate',
        fileName: 'activate-user',
        functionName: 'activateUser',
        label: 'Activate',
        method: 'post',
        params: ['userId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'suspendAction',
        endpointKey: 'suspend',
        fileName: 'suspend-user',
        functionName: 'suspendUser',
        label: 'Suspend',
        method: 'post',
        params: ['userId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'deleteAction',
        endpointKey: 'delete',
        fileName: 'delete-user',
        functionName: 'deleteUser',
        label: 'Delete',
        method: 'post',
        params: ['userId'],
        variant: 'danger',
        surfaces: ['detailAction'],
      },
      {
        actionName: 'assignRoleAction',
        endpointKey: 'roles',
        fileName: 'assign-user-role',
        functionName: 'assignUserRole',
        label: 'Assign role',
        method: 'post',
        params: ['userId'],
        payloadType: 'AssignUserRoleRequest',
        surfaces: [],
      },
      {
        actionName: 'removeRoleAction',
        endpointKey: 'roleAssignment',
        fileName: 'remove-user-role',
        functionName: 'removeUserRole',
        label: 'Remove role',
        method: 'delete',
        params: ['userId', 'assignmentId'],
        surfaces: [],
      },
    ],
  },
  {
    featureDir: 'roles',
    routePath: 'roles',
    routeKey: 'roles',
    singular: 'role',
    plural: 'roles',
    singularPascal: 'Role',
    pluralPascal: 'Roles',
    typeName: 'Role',
    idParam: 'roleId',
    description: 'Control role definitions and permission bundles.',
    detailDescription: 'Fallback details view until a dedicated role endpoint is exposed.',
    endpointAccessor: 'apiEndpoints.admin.roles',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search roles by name or description',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Name', 'text'],
      ['description', 'Description', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-role',
        functionName: 'createRole',
        label: 'Create role',
        method: 'post',
        payloadType: 'CreateRoleRequest',
        surfaces: ['listForm'],
      },
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-role',
        functionName: 'updateRole',
        label: 'Update role',
        method: 'patch',
        params: ['roleId'],
        payloadType: 'UpdateRoleRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'updatePermissionsAction',
        endpointKey: 'permissions',
        fileName: 'update-role-permissions',
        functionName: 'updateRolePermissions',
        label: 'Update permissions',
        method: 'put',
        params: ['roleId'],
        payloadType: 'UpdateRolePermissionsRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'deleteAction',
        endpointKey: 'detail',
        fileName: 'delete-role',
        functionName: 'deleteRole',
        label: 'Delete',
        method: 'delete',
        params: ['roleId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'permissions',
    routePath: 'permissions',
    routeKey: 'permissions',
    singular: 'permission',
    plural: 'permissions',
    singularPascal: 'Permission',
    pluralPascal: 'Permissions',
    typeName: 'Permission',
    description: 'Review the available authorization surface exported by the backend.',
    endpointAccessor: 'apiEndpoints.admin.permissions',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search permissions by key or resource',
    columns: [
      ['id', 'ID', 'text'],
      ['key', 'Key', 'text'],
      ['resource', 'Resource', 'text'],
      ['description', 'Description', 'text'],
    ],
    mutations: [],
  },
  {
    featureDir: 'audit-logs',
    routePath: 'audit-logs',
    routeKey: 'auditLogs',
    singular: 'audit log',
    plural: 'audit logs',
    singularPascal: 'AuditLog',
    pluralPascal: 'AuditLogs',
    typeName: 'AuditLog',
    description: 'Trace sensitive admin actions and backend activity.',
    endpointAccessor: 'apiEndpoints.admin.auditLogs',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search audit logs by actor or action',
    columns: [
      ['id', 'ID', 'text'],
      ['actor', 'Actor', 'text'],
      ['action', 'Action', 'text'],
      ['target', 'Target', 'text'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [],
  },
  {
    featureDir: 'categories',
    routePath: 'categories',
    routeKey: 'categories',
    singular: 'category',
    plural: 'categories',
    singularPascal: 'Category',
    pluralPascal: 'Categories',
    typeName: 'Category',
    idParam: 'categoryId',
    description: 'Manage customer-facing offer categories.',
    detailDescription: 'Fallback details view until the backend exposes category lookups.',
    endpointAccessor: 'apiEndpoints.admin.categories',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search categories by name',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Name', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-category',
        functionName: 'createCategory',
        label: 'Create category',
        method: 'post',
        payloadType: 'CreateCategoryRequest',
        surfaces: ['listForm'],
      },
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-category',
        functionName: 'updateCategory',
        label: 'Update category',
        method: 'patch',
        params: ['categoryId'],
        payloadType: 'UpdateCategoryRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'deleteAction',
        endpointKey: 'detail',
        fileName: 'delete-category',
        functionName: 'deleteCategory',
        label: 'Delete',
        method: 'delete',
        params: ['categoryId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'store-categories',
    routePath: 'store-categories',
    routeKey: 'storeCategories',
    singular: 'store category',
    plural: 'store categories',
    singularPascal: 'StoreCategory',
    pluralPascal: 'StoreCategories',
    typeName: 'StoreCategory',
    idParam: 'storeCategoryId',
    description: 'Manage merchant-facing store categories.',
    detailDescription:
      'Fallback details view until the backend exposes store category lookups.',
    endpointAccessor: 'apiEndpoints.admin.storeCategories',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search store categories by name',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Name', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-store-category',
        functionName: 'createStoreCategory',
        label: 'Create store category',
        method: 'post',
        payloadType: 'CreateStoreCategoryRequest',
        surfaces: ['listForm'],
      },
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-store-category',
        functionName: 'updateStoreCategory',
        label: 'Update store category',
        method: 'patch',
        params: ['storeCategoryId'],
        payloadType: 'UpdateStoreCategoryRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'deleteAction',
        endpointKey: 'detail',
        fileName: 'delete-store-category',
        functionName: 'deleteStoreCategory',
        label: 'Delete',
        method: 'delete',
        params: ['storeCategoryId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'stores',
    routePath: 'stores',
    routeKey: 'stores',
    singular: 'store',
    plural: 'stores',
    singularPascal: 'Store',
    pluralPascal: 'Stores',
    typeName: 'Store',
    idParam: 'storeId',
    description: 'Review merchant status, moderation, and billing setup.',
    detailDescription: 'Inspect merchant details, moderation history, and operational actions.',
    endpointAccessor: 'apiEndpoints.admin.stores',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search stores by name or owner',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Store', 'text'],
      ['ownerName', 'Owner', 'text'],
      ['status', 'Status', 'status'],
      ['createdAt', 'Created', 'date'],
    ],
    childPage: {
      viewName: 'StoreBillingPage',
      childPath: 'billing',
      title: 'Store billing profile',
      description: 'Update billing profile payload for the selected store.',
      actionName: 'updateBillingProfileAction',
    },
    mutations: [
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-store',
        functionName: 'updateStore',
        label: 'Update store',
        method: 'patch',
        params: ['storeId'],
        payloadType: 'UpdateStoreRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'approveAction',
        endpointKey: 'approve',
        fileName: 'approve-store',
        functionName: 'approveStore',
        label: 'Approve',
        method: 'post',
        params: ['storeId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'rejectAction',
        endpointKey: 'reject',
        fileName: 'reject-store',
        functionName: 'rejectStore',
        label: 'Reject',
        method: 'post',
        params: ['storeId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'suspendAction',
        endpointKey: 'suspend',
        fileName: 'suspend-store',
        functionName: 'suspendStore',
        label: 'Suspend',
        method: 'post',
        params: ['storeId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'closeAction',
        endpointKey: 'close',
        fileName: 'close-store',
        functionName: 'closeStore',
        label: 'Close',
        method: 'post',
        params: ['storeId'],
        variant: 'danger',
        surfaces: ['detailAction'],
      },
      {
        actionName: 'updateBillingProfileAction',
        endpointKey: 'billingProfile',
        fileName: 'update-store-billing-profile',
        functionName: 'updateStoreBillingProfile',
        label: 'Update billing profile',
        method: 'put',
        params: ['storeId'],
        payloadType: 'UpdateStoreBillingProfileRequest',
        surfaces: ['childForm'],
      },
    ],
  },
  {
    featureDir: 'store-verifications',
    routePath: 'store-verifications',
    routeKey: 'storeVerifications',
    singular: 'store verification',
    plural: 'store verifications',
    singularPascal: 'StoreVerification',
    pluralPascal: 'StoreVerifications',
    typeName: 'StoreVerification',
    idParam: 'verificationId',
    description: 'Process merchant verification submissions.',
    detailDescription: 'Inspect verification payloads and moderation actions.',
    endpointAccessor: 'apiEndpoints.admin.storeVerifications',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search verifications by store or ID',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['status', 'Status', 'status'],
      ['submittedAt', 'Submitted', 'date'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'approveAction',
        endpointKey: 'approve',
        fileName: 'approve-store-verification',
        functionName: 'approveStoreVerification',
        label: 'Approve',
        method: 'post',
        params: ['verificationId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'rejectAction',
        endpointKey: 'reject',
        fileName: 'reject-store-verification',
        functionName: 'rejectStoreVerification',
        label: 'Reject',
        method: 'post',
        params: ['verificationId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'offers',
    routePath: 'offers',
    routeKey: 'offers',
    singular: 'offer',
    plural: 'offers',
    singularPascal: 'Offer',
    pluralPascal: 'Offers',
    typeName: 'Offer',
    idParam: 'offerId',
    description: 'Review moderation, publishing, and archival workflows.',
    detailDescription: 'Inspect moderation state and perform publishing actions.',
    endpointAccessor: 'apiEndpoints.admin.offers',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search offers by title or store',
    columns: [
      ['id', 'ID', 'text'],
      ['title', 'Title', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'approveAction',
        endpointKey: 'approve',
        fileName: 'approve-offer',
        functionName: 'approveOffer',
        label: 'Approve',
        method: 'post',
        params: ['offerId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'rejectAction',
        endpointKey: 'reject',
        fileName: 'reject-offer',
        functionName: 'rejectOffer',
        label: 'Reject',
        method: 'post',
        params: ['offerId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'publishAction',
        endpointKey: 'publish',
        fileName: 'publish-offer',
        functionName: 'publishOffer',
        label: 'Publish',
        method: 'post',
        params: ['offerId'],
        variant: 'primary',
        surfaces: ['detailAction'],
      },
      {
        actionName: 'archiveAction',
        endpointKey: 'archive',
        fileName: 'archive-offer',
        functionName: 'archiveOffer',
        label: 'Archive',
        method: 'post',
        params: ['offerId'],
        variant: 'danger',
        surfaces: ['detailAction'],
      },
    ],
  },
  {
    featureDir: 'coupons',
    routePath: 'coupons',
    routeKey: 'coupons',
    singular: 'coupon',
    plural: 'coupons',
    singularPascal: 'Coupon',
    pluralPascal: 'Coupons',
    typeName: 'Coupon',
    idParam: 'couponId',
    description: 'Inspect coupon rows and patch backend-managed fields.',
    detailDescription:
      'Fallback coupon details view until the backend exposes a dedicated coupon endpoint.',
    endpointAccessor: 'apiEndpoints.admin.coupons',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search coupons by code or offer',
    columns: [
      ['id', 'ID', 'text'],
      ['code', 'Code', 'text'],
      ['offerId', 'Offer ID', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-coupon',
        functionName: 'updateCoupon',
        label: 'Update coupon',
        method: 'patch',
        params: ['couponId'],
        payloadType: 'UpdateCouponRequest',
        surfaces: ['detailForm'],
      },
    ],
  },
  {
    featureDir: 'redemptions',
    routePath: 'redemptions',
    routeKey: 'redemptions',
    singular: 'redemption',
    plural: 'redemptions',
    singularPascal: 'Redemption',
    pluralPascal: 'Redemptions',
    typeName: 'Redemption',
    idParam: 'redemptionId',
    description: 'Investigate redemption activity and fraud responses.',
    detailDescription: 'Inspect redemption payloads and timeline activity.',
    endpointAccessor: 'apiEndpoints.admin.redemptions',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search redemptions by coupon or user',
    columns: [
      ['id', 'ID', 'text'],
      ['couponId', 'Coupon ID', 'text'],
      ['userId', 'User ID', 'text'],
      ['status', 'Status', 'status'],
      ['createdAt', 'Created', 'date'],
    ],
    childPage: {
      viewName: 'RedemptionTimelinePage',
      childPath: 'timeline',
      title: 'Redemption timeline',
      description: 'Read the event timeline returned by the backend for this redemption.',
      actionName: null,
    },
    mutations: [
      {
        actionName: 'fraudBlockAction',
        endpointKey: 'fraudBlock',
        fileName: 'fraud-block-redemption',
        functionName: 'fraudBlockRedemption',
        label: 'Fraud block',
        method: 'post',
        params: ['redemptionId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'billing/billing-profiles',
    routePath: 'billing/billing-profiles',
    routeKey: 'billingProfiles',
    singular: 'billing profile',
    plural: 'billing profiles',
    singularPascal: 'BillingProfile',
    pluralPascal: 'BillingProfiles',
    typeName: 'BillingProfile',
    description: 'Reference store billing profile data returned by admin APIs.',
    endpointAccessor: 'apiEndpoints.admin.billing.profiles',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search billing profiles by store or account',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [],
  },
  {
    featureDir: 'billing/invoices',
    routePath: 'billing/invoices',
    routeKey: 'invoices',
    singular: 'invoice',
    plural: 'invoices',
    singularPascal: 'Invoice',
    pluralPascal: 'Invoices',
    typeName: 'Invoice',
    idParam: 'invoiceId',
    description: 'Issue, void, and reconcile invoice states.',
    detailDescription: 'Inspect invoice payloads and apply billing workflow actions.',
    endpointAccessor: 'apiEndpoints.admin.billing.invoices',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search invoices by store or invoice ID',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['status', 'Status', 'status'],
      ['amount', 'Amount', 'currency'],
      ['dueAt', 'Due', 'date'],
    ],
    mutations: [
      {
        actionName: 'issueAction',
        endpointKey: 'issue',
        fileName: 'issue-invoice',
        functionName: 'issueInvoice',
        label: 'Issue',
        method: 'post',
        params: ['invoiceId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'markPaidAction',
        endpointKey: 'markPaid',
        fileName: 'mark-invoice-paid',
        functionName: 'markInvoicePaid',
        label: 'Mark paid',
        method: 'post',
        params: ['invoiceId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'voidAction',
        endpointKey: 'void',
        fileName: 'void-invoice',
        functionName: 'voidInvoice',
        label: 'Void',
        method: 'post',
        params: ['invoiceId'],
        variant: 'danger',
        surfaces: ['detailAction'],
      },
    ],
  },
  {
    featureDir: 'billing/commissions',
    routePath: 'billing/commissions',
    routeKey: 'commissions',
    singular: 'commission',
    plural: 'commissions',
    singularPascal: 'Commission',
    pluralPascal: 'Commissions',
    typeName: 'Commission',
    idParam: 'commissionId',
    description: 'Track payout state across invoicing and settlement.',
    detailDescription:
      'Fallback details view until the backend exposes dedicated commission lookups.',
    endpointAccessor: 'apiEndpoints.admin.billing.commissions',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search commissions by store or commission ID',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['status', 'Status', 'status'],
      ['amount', 'Amount', 'currency'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [
      {
        actionName: 'markInvoicedAction',
        endpointKey: 'markInvoiced',
        fileName: 'mark-commission-invoiced',
        functionName: 'markCommissionInvoiced',
        label: 'Mark invoiced',
        method: 'post',
        params: ['commissionId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'markPaidAction',
        endpointKey: 'markPaid',
        fileName: 'mark-commission-paid',
        functionName: 'markCommissionPaid',
        label: 'Mark paid',
        method: 'post',
        params: ['commissionId'],
        variant: 'primary',
        surfaces: ['listAction', 'detailAction'],
      },
      {
        actionName: 'waiveAction',
        endpointKey: 'waive',
        fileName: 'waive-commission',
        functionName: 'waiveCommission',
        label: 'Waive',
        method: 'post',
        params: ['commissionId'],
        variant: 'danger',
        surfaces: ['detailAction'],
      },
    ],
  },
  {
    featureDir: 'billing/subscriptions',
    routePath: 'billing/subscriptions',
    routeKey: 'subscriptions',
    singular: 'subscription',
    plural: 'subscriptions',
    singularPascal: 'Subscription',
    pluralPascal: 'Subscriptions',
    typeName: 'Subscription',
    idParam: 'subscriptionId',
    description: 'Manage merchant subscription lifecycle and status.',
    detailDescription:
      'Fallback details view until the backend exposes a subscription lookup endpoint.',
    endpointAccessor: 'apiEndpoints.admin.billing.subscriptions',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search subscriptions by store or plan',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['planName', 'Plan', 'text'],
      ['status', 'Status', 'status'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-subscription',
        functionName: 'updateSubscription',
        label: 'Update subscription',
        method: 'patch',
        params: ['subscriptionId'],
        payloadType: 'UpdateSubscriptionRequest',
        surfaces: ['detailForm'],
      },
    ],
  },
  {
    featureDir: 'billing/subscription-plans',
    routePath: 'billing/subscription-plans',
    routeKey: 'subscriptionPlans',
    singular: 'subscription plan',
    plural: 'subscription plans',
    singularPascal: 'SubscriptionPlan',
    pluralPascal: 'SubscriptionPlans',
    typeName: 'SubscriptionPlan',
    idParam: 'planId',
    description: 'Maintain the subscription plan catalog and pricing metadata.',
    detailDescription:
      'Fallback details view until the backend exposes a subscription plan lookup endpoint.',
    endpointAccessor: 'apiEndpoints.admin.billing.subscriptionPlans',
    detailStrategy: 'listFallback',
    filtersPlaceholder: 'Search subscription plans by name',
    columns: [
      ['id', 'ID', 'text'],
      ['name', 'Plan', 'text'],
      ['status', 'Status', 'status'],
      ['price', 'Price', 'currency'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-subscription-plan',
        functionName: 'createSubscriptionPlan',
        label: 'Create plan',
        method: 'post',
        payloadType: 'CreateSubscriptionPlanRequest',
        surfaces: ['listForm'],
      },
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-subscription-plan',
        functionName: 'updateSubscriptionPlan',
        label: 'Update plan',
        method: 'patch',
        params: ['planId'],
        payloadType: 'UpdateSubscriptionPlanRequest',
        surfaces: ['detailForm'],
      },
      {
        actionName: 'deleteAction',
        endpointKey: 'detail',
        fileName: 'delete-subscription-plan',
        functionName: 'deleteSubscriptionPlan',
        label: 'Delete',
        method: 'delete',
        params: ['planId'],
        variant: 'danger',
        surfaces: ['listAction', 'detailAction'],
      },
    ],
  },
  {
    featureDir: 'billing/payments',
    routePath: 'billing/payments',
    routeKey: 'payments',
    singular: 'payment',
    plural: 'payments',
    singularPascal: 'Payment',
    pluralPascal: 'Payments',
    typeName: 'Payment',
    description: 'Monitor payment activity and backend settlement payloads.',
    endpointAccessor: 'apiEndpoints.admin.billing.payments',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search payments by invoice or payment ID',
    columns: [
      ['id', 'ID', 'text'],
      ['invoiceId', 'Invoice ID', 'text'],
      ['status', 'Status', 'status'],
      ['amount', 'Amount', 'currency'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [],
  },
  {
    featureDir: 'billing/inventory',
    routePath: 'billing/inventory',
    routeKey: 'inventory',
    singular: 'inventory transaction',
    plural: 'inventory transactions',
    singularPascal: 'InventoryTransaction',
    pluralPascal: 'InventoryTransactions',
    typeName: 'InventoryTransaction',
    description: 'Track inventory transaction flow through admin reporting.',
    endpointAccessor: 'apiEndpoints.admin.billing.inventory',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search inventory by store or transaction type',
    columns: [
      ['id', 'ID', 'text'],
      ['storeId', 'Store ID', 'text'],
      ['type', 'Type', 'text'],
      ['quantity', 'Quantity', 'text'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [],
  },
  {
    featureDir: 'recommendations',
    routePath: 'recommendations',
    routeKey: 'recommendations',
    singular: 'recommendation',
    plural: 'recommendations',
    singularPascal: 'Recommendation',
    pluralPascal: 'Recommendations',
    typeName: 'Recommendation',
    description: 'Curate recommendation placements and promoted content.',
    endpointAccessor: 'apiEndpoints.admin.recommendations',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search recommendations by title or status',
    columns: [
      ['id', 'ID', 'text'],
      ['title', 'Title', 'text'],
      ['status', 'Status', 'status'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [
      {
        actionName: 'createAction',
        endpointKey: 'list',
        fileName: 'create-recommendation',
        functionName: 'createRecommendation',
        label: 'Create recommendation',
        method: 'post',
        payloadType: 'CreateRecommendationRequest',
        surfaces: ['listForm'],
      },
    ],
  },
  {
    featureDir: 'contact/customer-tickets',
    routePath: 'contact/customer',
    routeKey: 'contactCustomer',
    singular: 'customer ticket',
    plural: 'customer tickets',
    singularPascal: 'CustomerTicket',
    pluralPascal: 'CustomerTickets',
    typeName: 'CustomerTicket',
    idParam: 'ticketId',
    description: 'Handle customer support tickets from the admin queue.',
    endpointAccessor: 'apiEndpoints.admin.contact.customer',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search customer tickets by subject or user',
    columns: [
      ['id', 'ID', 'text'],
      ['subject', 'Subject', 'text'],
      ['status', 'Status', 'status'],
      ['priority', 'Priority', 'text'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-customer-ticket',
        functionName: 'updateCustomerTicket',
        label: 'Update ticket',
        method: 'patch',
        params: ['ticketId'],
        payloadType: 'UpdateCustomerTicketRequest',
        surfaces: ['quickForm'],
      },
    ],
  },
  {
    featureDir: 'contact/seller-tickets',
    routePath: 'contact/seller',
    routeKey: 'contactSeller',
    singular: 'seller ticket',
    plural: 'seller tickets',
    singularPascal: 'SellerTicket',
    pluralPascal: 'SellerTickets',
    typeName: 'SellerTicket',
    idParam: 'ticketId',
    description: 'Handle seller support tickets from the admin queue.',
    endpointAccessor: 'apiEndpoints.admin.contact.seller',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search seller tickets by subject or seller',
    columns: [
      ['id', 'ID', 'text'],
      ['subject', 'Subject', 'text'],
      ['status', 'Status', 'status'],
      ['priority', 'Priority', 'text'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [
      {
        actionName: 'updateAction',
        endpointKey: 'detail',
        fileName: 'update-seller-ticket',
        functionName: 'updateSellerTicket',
        label: 'Update ticket',
        method: 'patch',
        params: ['ticketId'],
        payloadType: 'UpdateSellerTicketRequest',
        surfaces: ['quickForm'],
      },
    ],
  },
  {
    featureDir: 'notify-me',
    routePath: 'notify-me',
    routeKey: 'notifyMe',
    singular: 'notify me request',
    plural: 'notify me requests',
    singularPascal: 'NotifyMeRequest',
    pluralPascal: 'NotifyMeRequests',
    typeName: 'NotifyMeRequest',
    description: 'Review customer notify-me signals and backlog volume.',
    endpointAccessor: 'apiEndpoints.admin.notifyMe',
    detailStrategy: 'none',
    filtersPlaceholder: 'Search notify-me requests by email',
    columns: [
      ['id', 'ID', 'text'],
      ['email', 'Email', 'text'],
      ['status', 'Status', 'status'],
      ['createdAt', 'Created', 'date'],
    ],
    mutations: [],
  },
  {
    featureDir: 'chatbot',
    routePath: 'chatbot/sessions',
    routeKey: 'chatbotSessions',
    singular: 'chatbot session',
    plural: 'chatbot sessions',
    singularPascal: 'ChatbotSession',
    pluralPascal: 'ChatbotSessions',
    typeName: 'ChatbotSession',
    idParam: 'sessionId',
    description: 'Inspect support chatbot sessions and escalation context.',
    detailDescription: 'Read the raw session payload returned by the admin API.',
    endpointAccessor: 'apiEndpoints.admin.chatbot.sessions',
    detailStrategy: 'direct',
    filtersPlaceholder: 'Search chatbot sessions by user or session ID',
    columns: [
      ['id', 'ID', 'text'],
      ['userId', 'User ID', 'text'],
      ['status', 'Status', 'status'],
      ['startedAt', 'Started', 'date'],
      ['updatedAt', 'Updated', 'date'],
    ],
    mutations: [],
  },
];

function featurePaths(feature) {
  return {
    base: `src/features/admin/${feature.featureDir}`,
    typeFile: `${feature.typeName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.types.ts`,
  };
}

function hasDetail(feature) {
  return feature.detailStrategy && feature.detailStrategy !== 'none';
}

function mutationsWithSurface(feature, surface) {
  return feature.mutations.filter((mutation) =>
    mutation.surfaces.includes(surface)
  );
}

function unique(values) {
  return [...new Set(values)];
}

function featureTypeImports(feature) {
  const types = [];

  if (hasDetail(feature)) {
    types.push('ApiEntityResponse');
  }

  types.push('ApiCollectionResponse');

  return unique(types).join(', ');
}

function createEntityTypes(feature) {
  const idParam = feature.idParam ?? 'id';
  const baseFields = unique([
    'id',
    idParam,
    'status',
    'createdAt',
    'updatedAt',
    ...feature.columns.map(([key]) => key),
  ]);
  const payloadTypes = unique(
    feature.mutations
      .filter((mutation) => mutation.payloadType)
      .map((mutation) => mutation.payloadType)
  );

  return `
import type { ${featureTypeImports(feature)} } from "@/types";
import type { AdminFilterValues } from "@/features/admin/shared";

export interface ${feature.typeName} {
${baseFields.map((field) => `  ${field}?: string | number | boolean | null;`).join('\n')}
  [key: string]: unknown;
}

export type ${feature.pluralPascal}ListFilters = AdminFilterValues;
export type ${feature.pluralPascal}ListResponse =
  | ApiCollectionResponse<${feature.typeName}>
  | ${feature.typeName}[];
${hasDetail(feature) ? `export type ${feature.singularPascal}DetailsResponse =
  | ApiEntityResponse<${feature.typeName}>
  | ${feature.typeName}
  | null;` : ''}
${payloadTypes.map((payloadType) => `// TODO: Confirm the backend DTO for ${payloadType}.\nexport type ${payloadType} = Record<string, unknown>;`).join('\n\n')}
`;
}

function createListApi(feature) {
  return `
import { toAdminQuery } from "@/features/admin/shared";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { ${feature.pluralPascal}ListFilters, ${feature.pluralPascal}ListResponse } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

export async function get${feature.pluralPascal}(filters: ${feature.pluralPascal}ListFilters = {}) {
  return apiClient.get<${feature.pluralPascal}ListResponse>(${feature.endpointAccessor}.list, {
    query: toAdminQuery(filters),
  });
}
`;
}

function createDetailApi(feature) {
  if (!hasDetail(feature)) {
    return null;
  }

  if (feature.detailStrategy === 'direct') {
    return `
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { ${feature.singularPascal}DetailsResponse } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

export async function get${feature.singularPascal}ById(${feature.idParam}: string) {
  return apiClient.get<${feature.singularPascal}DetailsResponse>(${feature.endpointAccessor}.detail(${feature.idParam}));
}
`;
  }

  return `
import { get${feature.pluralPascal} } from "./get-${kebabCase(feature.plural)}";

import type { ${feature.typeName} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

export async function get${feature.singularPascal}ById(${feature.idParam}: string) {
  const response = await get${feature.pluralPascal}();
  const items = Array.isArray(response)
    ? response
    : Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.items)
        ? response.items
        : Array.isArray(response.results)
          ? response.results
          : [];

  // TODO: Replace this list-scan fallback when the backend exposes a dedicated ${feature.singular} details endpoint.
  return (items as ${feature.typeName}[]).find(
    (item) => String(item.id ?? item.${feature.idParam} ?? "") === ${feature.idParam}
  ) ?? null;
}
`;
}

function apiClientMethod(method) {
  return method === 'delete' ? 'delete' : method;
}

function mutationCall(feature, mutation) {
  const params = mutation.params ?? [];
  const endpointArgs = params.join(', ');
  const endpointValue = params.length
    ? `${feature.endpointAccessor}.${mutation.endpointKey}(${endpointArgs})`
    : `${feature.endpointAccessor}.${mutation.endpointKey}`;
  const typeImport = mutation.payloadType
    ? `import type { ${mutation.payloadType} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";\n`
    : '';
  const args = mutation.payloadType
    ? [...params.map((param) => `${param}: string`), `payload: ${mutation.payloadType}`]
    : params.map((param) => `${param}: string`);
  const bodyArg = mutation.payloadType ? ', payload' : '';
  const generic = mutation.payloadType ? `<unknown, ${mutation.payloadType}>` : `<unknown>`;

  return `
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
${typeImport}
export async function ${mutation.functionName}(${args.join(', ')}) {
  return apiClient.${apiClientMethod(mutation.method)}${generic}(${endpointValue}${bodyArg});
}
`;
}

function createListHook(feature) {
  return `
"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { get${feature.pluralPascal} } from "../api/get-${kebabCase(feature.plural)}";
import type { ${feature.typeName}, ${feature.pluralPascal}ListFilters } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

export function use${feature.pluralPascal}List(filters: ${feature.pluralPascal}ListFilters) {
  return useAdminCollection<${feature.typeName}, ${feature.pluralPascal}ListFilters>({
    filters,
    getItems: get${feature.pluralPascal},
  });
}
`;
}

function createDetailHook(feature) {
  if (!hasDetail(feature)) {
    return null;
  }

  return `
"use client";

import { useAdminResource } from "@/features/admin/shared";

import { get${feature.singularPascal}ById } from "../api/get-${kebabCase(feature.singular)}-by-id";
import type { ${feature.typeName} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

export function use${feature.singularPascal}Details(${feature.idParam}: string) {
  return useAdminResource<${feature.typeName}>({
    id: ${feature.idParam},
    getItem: get${feature.singularPascal}ById,
  });
}
`;
}

function createActionsHook(feature) {
  if (!feature.mutations.length) {
    return null;
  }

  const typeImports = unique(
    feature.mutations
      .filter((mutation) => mutation.payloadType)
      .map((mutation) => mutation.payloadType)
  );
  const apiImports = feature.mutations.map(
    (mutation) => `import { ${mutation.functionName} } from "../api/${mutation.fileName}";`
  );
  const actionEntries = feature.mutations
    .map((mutation) => {
      const params = mutation.params ?? [];
      const actionInputType = mutation.payloadType
        ? params.length
          ? `{ ${params.join(': string; ')}: string; payload: ${mutation.payloadType} }`
          : mutation.payloadType
        : params.length
          ? params.length === 1
            ? 'string'
            : `{ ${params.join(': string; ')}: string }`
          : 'void';
      const call = mutation.payloadType
        ? params.length
          ? `({ ${params.join(', ')}, payload }) => ${mutation.functionName}(${params.join(', ')}, payload)`
          : `${mutation.functionName}`
        : params.length
          ? params.length === 1
            ? mutation.functionName
            : `({ ${params.join(', ')} }) => ${mutation.functionName}(${params.join(', ')})`
          : `() => ${mutation.functionName}()`;

      return `  ${mutation.actionName}: useAdminAction<${actionInputType}, unknown>({
    action: ${call},
    onSuccess,
  }),`;
    })
    .join('\n');

  return `
"use client";

import { useAdminAction } from "@/features/admin/shared";

${apiImports.join('\n')}
${typeImports.length ? `import type { ${typeImports.join(', ')} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";` : ''}

export function use${feature.singularPascal}Actions(onSuccess?: () => Promise<void> | void) {
  return {
${actionEntries}
  };
}
`;
}

function createStatusComponent(feature) {
  if (!feature.columns.some(([, , type]) => type === 'status')) {
    return null;
  }

  return `
import { AdminStatusBadge } from "@/features/admin/shared";

export function ${feature.singularPascal}StatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
`;
}

function createFiltersComponent(feature) {
  const hasStatus = feature.columns.some(([, , type]) => type === 'status');

  return `
"use client";

import { AdminFilterBar, createSearchFilterField${hasStatus ? ', createStatusFilterField' : ''} } from "@/features/admin/shared";

import type { ${feature.pluralPascal}ListFilters } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

const filterFields = [
  createSearchFilterField("Search", "${feature.filtersPlaceholder}"),
${hasStatus ? '  createStatusFilterField(),' : ''}
];

export function ${feature.pluralPascal}Filters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: ${feature.pluralPascal}ListFilters) => void;
  onReset: () => void;
  values: ${feature.pluralPascal}ListFilters;
}) {
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
`;
}

function createTableComponent(feature) {
  const hasDate = feature.columns.some(([, , type]) => type === 'date');
  const hasCurrency = feature.columns.some(([, , type]) => type === 'currency');
  const hasStatus = feature.columns.some(([, , type]) => type === 'status');
  const typeImport = `${feature.typeName}`;
  const imports = [
    'import type { ReactNode } from "react";',
    '',
    `import { AdminDataTable, type AdminColumn${hasDate ? ', formatAdminDate' : ''}${hasCurrency ? ', formatAdminCurrency' : ''} } from "@/features/admin/shared";`,
  ];

  if (hasStatus) {
    imports.push(
      `import { ${feature.singularPascal}StatusBadge } from "./${kebabCase(feature.singular)}-status-badge";`
    );
  }

  imports.push(
    '',
    `import type { ${typeImport} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";`
  );

  const columns = feature.columns
    .map(([key, header, type]) => {
      if (type === 'status') {
        return `  {
    id: "${key}",
    header: "${header}",
    cell: (item) => <${feature.singularPascal}StatusBadge value={item.${key}} />,
  },`;
      }

      if (type === 'date') {
        return `  {
    id: "${key}",
    header: "${header}",
    cell: (item) => formatAdminDate(item.${key}),
  },`;
      }

      if (type === 'currency') {
        return `  {
    id: "${key}",
    header: "${header}",
    cell: (item) => formatAdminCurrency(
      typeof item.${key} === "number" ? item.${key} : Number(item.${key}),
    ),
  },`;
      }

      return `  {
    id: "${key}",
    header: "${header}",
    accessorKey: "${key}",
  },`;
    })
    .join('\n');

  return `
${imports.join('\n')}

const columns: AdminColumn<${typeImport}>[] = [
${columns}
];

export function ${feature.pluralPascal}Table({
  items,
  renderActions,
}: {
  items: ${typeImport}[];
  renderActions?: (item: ${typeImport}) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? item.${feature.idParam ?? 'id'} ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any ${feature.plural} yet."
      emptyTitle="No ${feature.plural} found"
    />
  );
}
`;
}

function createFormComponent(feature) {
  const payloadTypes = unique(
    feature.mutations
      .filter((mutation) => mutation.payloadType)
      .map((mutation) => mutation.payloadType)
  );

  if (!payloadTypes.length) {
    return null;
  }

  return `
"use client";

import { AdminPayloadForm } from "@/features/admin/shared";

import type { ${payloadTypes.join(', ')} } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";

type ${feature.singularPascal}FormPayload = ${payloadTypes.join(' | ')};

export function ${feature.singularPascal}Form(props: {
  description: string;
  identifierLabel?: string;
  identifierPlaceholder?: string;
  identifierValue?: string;
  isSubmitting?: boolean;
  onIdentifierChange?: (value: string) => void;
  onSubmit: (payload: ${feature.singularPascal}FormPayload) => Promise<void>;
  submitLabel: string;
  title: string;
}) {
  return <AdminPayloadForm<${feature.singularPascal}FormPayload> {...props} />;
}
`;
}

function defaultFilters(feature) {
  return feature.columns.some(([, , type]) => type === 'status')
    ? '{ search: "", status: "all" }'
    : '{ search: "" }';
}

function createListView(feature) {
  const listForms = mutationsWithSurface(feature, 'listForm');
  const quickForms = mutationsWithSurface(feature, 'quickForm');
  const listActions = mutationsWithSurface(feature, 'listAction');
  const hasForms = listForms.length || quickForms.length;
  const hasRowActions = hasDetail(feature) || listActions.length;
  const needsActionHook = hasForms || listActions.length;
  const imports = [
    '"use client";',
    '',
    'import { useState } from "react";',
    hasDetail(feature) ? 'import Link from "next/link";' : '',
    '',
    'import { Button } from "@/components/ui/button";',
    `import { AdminPageHeader, AdminSection, AdminStatCard${listActions.length ? ', AdminConfirmDialog' : ''}${hasDetail(feature) ? ', createAdminDetailHref' : ''} } from "@/features/admin/shared";`,
    '',
    `import { ${feature.pluralPascal}Filters } from "../components/${kebabCase(feature.plural)}-filters";`,
    hasForms ? `import { ${feature.singularPascal}Form } from "../components/${kebabCase(feature.singular)}-form";` : '',
    `import { ${feature.pluralPascal}Table } from "../components/${kebabCase(feature.plural)}-table";`,
    needsActionHook
      ? `import { use${feature.singularPascal}Actions } from "../hooks/use-${kebabCase(feature.singular)}-actions";`
      : '',
    `import { use${feature.pluralPascal}List } from "../hooks/use-${kebabCase(feature.plural)}-list";`,
    '',
    `import type { ${feature.pluralPascal}ListFilters } from "../types/${featurePaths(feature).typeFile.replace('.ts', '')}";`,
  ]
    .filter(Boolean)
    .join('\n');

  const headerButtons = [
    ...listForms.map(
      (mutation) =>
        `            <Button
              key="${mutation.actionName}"
              variant="secondary"
              onClick={() => setActiveComposer("${mutation.actionName}")}
            >
              ${mutation.label}
            </Button>`
    ),
    ...quickForms.map(
      (mutation) =>
        `            <Button
              key="${mutation.actionName}"
              variant="secondary"
              onClick={() => setActiveComposer("${mutation.actionName}")}
            >
              ${mutation.label}
            </Button>`
    ),
    `            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>`,
  ].join('\n');

  const formBlocks = [
    ...listForms.map(
      (mutation) => `      {activeComposer === "${mutation.actionName}" ? (
        <${feature.singularPascal}Form
          description="A JSON payload scaffold is used here until the backend DTO is confirmed."
          isSubmitting={actions.${mutation.actionName}.isSubmitting}
          onSubmit={async (payload) => {
            await actions.${mutation.actionName}.submit(payload);
            setActiveComposer(null);
          }}
          submitLabel="${mutation.label}"
          title="${mutation.label}"
        />
      ) : null}`
    ),
    ...quickForms.map(
      (mutation) => `      {activeComposer === "${mutation.actionName}" ? (
        <${feature.singularPascal}Form
          description="Target an existing ${feature.singular} ID and send a JSON patch payload."
          identifierLabel="${humanizeParam(feature.idParam)}"
          identifierPlaceholder="Enter ${feature.idParam}"
          identifierValue={targetId}
          isSubmitting={actions.${mutation.actionName}.isSubmitting}
          onIdentifierChange={setTargetId}
          onSubmit={async (payload) => {
            if (!targetId.trim()) {
              throw new Error("${humanizeParam(feature.idParam)} is required.");
            }

            await actions.${mutation.actionName}.submit({
              ${feature.idParam}: targetId,
              payload,
            });
            setActiveComposer(null);
            setTargetId("");
          }}
          submitLabel="${mutation.label}"
          title="${mutation.label}"
        />
      ) : null}`
    ),
  ].join('\n');

  const rowActions = hasRowActions
    ? `        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
${hasDetail(feature) ? `            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "${feature.routeKey}",
                String(item.id ?? item.${feature.idParam ?? 'id'} ?? ""),
              )}
            >
              View
            </Link>` : ''}
${listActions.map((mutation) => `            <AdminConfirmDialog
              confirmLabel="${mutation.label}"
              description="This will call the mapped admin endpoint for the selected ${feature.singular}."
              isPending={actions.${mutation.actionName}.isSubmitting}
              onConfirm={async () => {
                await actions.${mutation.actionName}.submit(
                  String(item.id ?? item.${feature.idParam ?? 'id'} ?? ""),
                );
              }}
              title="${mutation.label} ${titleCase(feature.singular)}"
              triggerLabel="${mutation.label}"
              variant="${mutation.variant ?? 'secondary'}"
            />`).join('\n')}
          </div>
        )}`
    : '';

  return `
${imports}

const defaultFilters: ${feature.pluralPascal}ListFilters = ${defaultFilters(feature)};

export function ${feature.pluralPascal}ListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<${feature.pluralPascal}ListFilters>(defaultFilters);
  ${hasForms ? 'const [activeComposer, setActiveComposer] = useState<string | null>(null);' : ''}
  ${hasDetail(feature) ? '' : 'void lang;'}
  ${quickForms.length ? 'const [targetId, setTargetId] = useState("");' : ''}
  const listState = use${feature.pluralPascal}List(filters);
  ${needsActionHook ? 'const actions = use' + feature.singularPascal + 'Actions(async () => { await listState.reload(); });' : ''}

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
${headerButtons}
          </>
        }
        description="${feature.description}"
        eyebrow="Admin"
        title="${feature.pluralPascal.replace(/([a-z])([A-Z])/g, '$1 $2')}"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="${feature.pluralPascal.replace(/([a-z])([A-Z])/g, '$1 $2')} currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <${feature.pluralPascal}Filters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
${hasForms ? formBlocks : ''}
      <${feature.pluralPascal}Table
        items={listState.items}
${rowActions}
      />
    </div>
  );
}
`;
}

function createDetailView(feature) {
  if (!hasDetail(feature)) {
    return null;
  }

  const detailForms = mutationsWithSurface(feature, 'detailForm');
  const detailActions = mutationsWithSurface(feature, 'detailAction');
  const hasStatus = feature.columns.some(([, , type]) => type === 'status');
  const imports = [
    '"use client";',
    '',
    feature.childPage
      ? 'import Link from "next/link";'
      : detailActions.length
        ? ''
        : '',
    '',
    'import { PageLoading } from "@/components/shared/page-loading";',
    `import { AdminPageHeader, AdminRecordGrid, AdminSection${detailActions.length ? ', AdminConfirmDialog' : ''}${feature.childPage ? ', createAdminDetailHref' : ''} } from "@/features/admin/shared";`,
    '',
    detailForms.length
      ? `import { ${feature.singularPascal}Form } from "../components/${kebabCase(feature.singular)}-form";`
      : '',
    hasStatus
      ? `import { ${feature.singularPascal}StatusBadge } from "../components/${kebabCase(feature.singular)}-status-badge";`
      : '',
    feature.mutations.length
      ? `import { use${feature.singularPascal}Actions } from "../hooks/use-${kebabCase(feature.singular)}-actions";`
      : '',
    `import { use${feature.singularPascal}Details } from "../hooks/use-${kebabCase(feature.singular)}-details";`,
  ]
    .filter(Boolean)
    .join('\n');

  return `
${imports}

export function ${feature.singularPascal}DetailsPage({
  ${feature.idParam},
  lang,
}: {
  ${feature.idParam}: string;
  lang: string;
}) {
  const detailState = use${feature.singularPascal}Details(${feature.idParam});
  ${feature.childPage ? '' : 'void lang;'}
  ${feature.mutations.length ? 'const actions = use' + feature.singularPascal + 'Actions(async () => { await detailState.reload(); });' : ''}

  if (detailState.isLoading) {
    return <PageLoading label="Loading ${feature.singular} details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="${titleCase(feature.singular)} not found">
        <p className="text-sm text-slate-500">
          The backend did not return a ${feature.singular} for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            ${hasStatus ? `<${feature.singularPascal}StatusBadge value={detailState.item.status} />` : ''}
            ${feature.childPage ? `<Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "${feature.routeKey}", ${feature.idParam}, "${feature.childPage.childPath}")}
            >
              ${feature.childPage.title}
            </Link>` : ''}
            ${detailActions.map((mutation) => `<AdminConfirmDialog
              confirmLabel="${mutation.label}"
              description="This will call the mapped admin endpoint for the selected ${feature.singular}."
              isPending={actions.${mutation.actionName}.isSubmitting}
              onConfirm={async () => {
                await actions.${mutation.actionName}.submit(${feature.idParam});
              }}
              title="${mutation.label} ${titleCase(feature.singular)}"
              triggerLabel="${mutation.label}"
              variant="${mutation.variant ?? 'secondary'}"
            />`).join('\n            ')}
          </div>
        }
        description="${feature.detailDescription ?? feature.description}"
        eyebrow="Admin details"
        title={String(detailState.item.name ?? detailState.item.title ?? detailState.item.id ?? ${feature.idParam})}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      ${detailForms.map((mutation) => `<${feature.singularPascal}Form
        description="A JSON payload scaffold is used here until the backend DTO is confirmed."
        isSubmitting={actions.${mutation.actionName}.isSubmitting}
        onSubmit={async (payload) => {
          await actions.${mutation.actionName}.submit({
            ${feature.idParam},
            payload,
          });
        }}
        submitLabel="${mutation.label}"
        title="${mutation.label}"
      />`).join('\n      ')}
      <AdminSection description="Structured fields returned for this record." title="${titleCase(feature.singular)} details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
`;
}

function createIndexFile(feature) {
  const exports = [
    `export * from "./hooks/use-${kebabCase(feature.plural)}-list";`,
    hasDetail(feature)
      ? `export * from "./hooks/use-${kebabCase(feature.singular)}-details";`
      : '',
    feature.mutations.length
      ? `export * from "./hooks/use-${kebabCase(feature.singular)}-actions";`
      : '',
    `export * from "./views/${kebabCase(feature.plural)}-list-page";`,
    hasDetail(feature)
      ? `export * from "./views/${kebabCase(feature.singular)}-details-page";`
      : '',
    `export * from "./types/${featurePaths(feature).typeFile.replace('.ts', '')}";`,
  ]
    .filter(Boolean)
    .join('\n');

  return `${exports}\n`;
}

function createListRoute(feature) {
  return `
import { ${feature.pluralPascal}ListPage } from "${relativeFeatureImport(feature.featureDir)}";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <${feature.pluralPascal}ListPage lang={lang} />;
}
`;
}

function createDetailRoute(feature) {
  if (!hasDetail(feature)) {
    return null;
  }

  return `
import { ${feature.singularPascal}DetailsPage } from "${relativeFeatureImport(feature.featureDir)}";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; ${feature.idParam}: string }>;
}) {
  const { lang, ${feature.idParam} } = await params;

  return <${feature.singularPascal}DetailsPage ${feature.idParam}={${feature.idParam}} lang={lang} />;
}
`;
}

function createLoadingRoute(label) {
  return `
import { PageLoading } from "@/components/shared/page-loading";

export default function Loading() {
  return <PageLoading label="${label}" />;
}
`;
}

function writeEntityFeature(feature) {
  const paths = featurePaths(feature);
  const base = paths.base;

  writeFile(`${base}/types/${paths.typeFile}`, createEntityTypes(feature));
  writeFile(`${base}/api/get-${kebabCase(feature.plural)}.ts`, createListApi(feature));

  const detailApi = createDetailApi(feature);

  if (detailApi) {
    writeFile(
      `${base}/api/get-${kebabCase(feature.singular)}-by-id.ts`,
      detailApi
    );
  }

  for (const mutation of feature.mutations) {
    writeFile(`${base}/api/${mutation.fileName}.ts`, mutationCall(feature, mutation));
  }

  writeFile(
    `${base}/hooks/use-${kebabCase(feature.plural)}-list.ts`,
    createListHook(feature)
  );

  const detailHook = createDetailHook(feature);

  if (detailHook) {
    writeFile(
      `${base}/hooks/use-${kebabCase(feature.singular)}-details.ts`,
      detailHook
    );
  }

  const actionsHook = createActionsHook(feature);

  if (actionsHook) {
    writeFile(
      `${base}/hooks/use-${kebabCase(feature.singular)}-actions.ts`,
      actionsHook
    );
  }

  const statusComponent = createStatusComponent(feature);

  if (statusComponent) {
    writeFile(
      `${base}/components/${kebabCase(feature.singular)}-status-badge.tsx`,
      statusComponent
    );
  }

  writeFile(
    `${base}/components/${kebabCase(feature.plural)}-filters.tsx`,
    createFiltersComponent(feature)
  );
  writeFile(
    `${base}/components/${kebabCase(feature.plural)}-table.tsx`,
    createTableComponent(feature)
  );

  const formComponent = createFormComponent(feature);

  if (formComponent) {
    writeFile(
      `${base}/components/${kebabCase(feature.singular)}-form.tsx`,
      formComponent
    );
  }

  writeFile(
    `${base}/views/${kebabCase(feature.plural)}-list-page.tsx`,
    createListView(feature)
  );

  const detailView = createDetailView(feature);

  if (detailView) {
    writeFile(
      `${base}/views/${kebabCase(feature.singular)}-details-page.tsx`,
      detailView
    );
  }

  writeFile(`${base}/index.ts`, createIndexFile(feature));

  const routeBase = `src/app/[lang]/(admin)/admin/${feature.routePath}`;
  writeFile(`${routeBase}/page.tsx`, createListRoute(feature));

  if (['users', 'stores'].includes(feature.routePath)) {
    writeFile(
      `${routeBase}/loading.tsx`,
      createLoadingRoute(`Loading ${feature.plural}...`)
    );
  }

  const detailRoute = createDetailRoute(feature);

  if (detailRoute) {
    writeFile(
      `${routeBase}/[${feature.idParam}]/page.tsx`,
      detailRoute
    );
  }
}

function createNestedIndex(relativeDir) {
  const targetDir = path.join(rootDir, relativeDir);

  if (!fs.existsSync(targetDir)) {
    return;
  }

  const entries = fs
    .readdirSync(targetDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (!entries.length) {
    return;
  }

  writeFile(
    `${relativeDir}/index.ts`,
    `${entries.map((entry) => `export * from "./${entry}";`).join('\n')}\n`
  );
}

for (const feature of entityFeatures) {
  writeEntityFeature(feature);
}

createNestedIndex('src/features/admin/billing');
createNestedIndex('src/features/admin/contact');

console.log(`Generated ${entityFeatures.length} entity admin features.`);
