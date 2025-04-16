import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { activeOrganization } from "./organization";
import { ViewDto } from "../../src";
import { randomUUID } from "node:crypto";

export const view1: ViewDto = {
  id: randomUUID(),
  name: "name",
  version: "1.0.0",
  ownedByOrganizationId: randomUUID(),
  createdByUserId: randomUUID(),
  nodes: [{ id: randomUUID() }],
  dataModelId: randomUUID(),
};

export const viewHandlers = [
  http.post(`${baseURL}/organizations/${activeOrganization.id}/views`, () => {
    return HttpResponse.json(view1);
  }),
  http.post(
    `${baseURL}/organizations/${activeOrganization.id}/views/${view1.id}/nodes`,
    () => {
      return HttpResponse.json(view1);
    },
  ),
];
