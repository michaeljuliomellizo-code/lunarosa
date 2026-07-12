export type UserRole =
  | "admin"
  | "manager"
  | "employee"
  | "customer";

export type Permission =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "customers"
  | "marketing"
  | "coupons"
  | "referrals"
  | "loyalty"
  | "reviews"
  | "reports"
  | "settings"
  | "users";

export const permissions: Record<
  UserRole,
  Permission[]
> = {
  admin: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "customers",
    "marketing",
    "coupons",
    "referrals",
    "loyalty",
    "reviews",
    "reports",
    "settings",
    "users",
  ],

  manager: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "customers",
    "marketing",
    "coupons",
    "referrals",
    "loyalty",
    "reviews",
    "reports",
  ],

  employee: [
    "dashboard",
    "orders",
    "customers",
    "reviews",
  ],

  customer: [],
};

export function hasPermission(
  role: UserRole,
  permission: Permission
): boolean {
  return permissions[role]?.includes(permission);
}

export function canAccessAdmin(
  role: UserRole
): boolean {
  return (
    role === "admin" ||
    role === "manager" ||
    role === "employee"
  );
}

export function isAdmin(
  role: UserRole
): boolean {
  return role === "admin";
}

export function isManager(
  role: UserRole
): boolean {
  return role === "manager";
}

export function isEmployee(
  role: UserRole
): boolean {
  return role === "employee";
}

export function isCustomer(
  role: UserRole
): boolean {
  return role === "customer";
}