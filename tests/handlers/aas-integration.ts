import { http, HttpResponse } from "msw";
import { randomUUID } from "node:crypto";
import { baseURL } from "./index";
import { AasConnectionDto, AssetAdministrationShellType } from "../../src";
import { activeOrganization } from "./organization";

export const connection: AasConnectionDto = {
  id: randomUUID(),
  modelId: randomUUID(),
  name: "Connection 1",
  dataModelId: randomUUID(),
  aasType: AssetAdministrationShellType.Truck,
  fieldAssignments: [
    {
      dataFieldId: randomUUID(),
      sectionId: randomUUID(),
      idShortParent: randomUUID(),
      idShort: randomUUID(),
    },
  ],
};
export const aasIntegrationHandlers = [
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/integration/aas/connections/${connection.id}`,
    () => {
      return HttpResponse.json({ ...connection });
    },
  ),
  http.post(
    `${baseURL}/organizations/${activeOrganization.id}/integration/aas/connections`,
    () => {
      return HttpResponse.json({ ...connection });
    },
  ),
  http.patch(
    `${baseURL}/organizations/${activeOrganization.id}/integration/aas/connections/${connection.id}`,
    () => {
      return HttpResponse.json({ ...connection });
    },
  ),
];
