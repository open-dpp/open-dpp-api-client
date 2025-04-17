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
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/views`,
    async ({ request }) => {
      const url = new URL(request.url);

      // Read the "id" URL query parameter using the "URLSearchParams" API.
      // Given "/product?id=1", "organization" will equal "1".
      const dataModelId = url.searchParams.get("dataModelId");

      // Note that query parameters are potentially undefined.
      // Make sure to account for that in your handlers.
      if (dataModelId !== view1.dataModelId) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(view1);
    },
  ),
];
