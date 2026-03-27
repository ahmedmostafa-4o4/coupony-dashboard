import { getRoles } from "./get-roles";

import { adaptRoleDetailsFallback } from "../utils/role-details.adapter";

export async function getRoleById(roleId: string) {
  const response = await getRoles();

  return adaptRoleDetailsFallback(roleId, response);
}
