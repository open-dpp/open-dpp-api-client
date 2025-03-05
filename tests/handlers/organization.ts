import { http, HttpResponse } from "msw";

import { randomUUID } from "node:crypto";
import { baseURL } from "./index";

export const organizations = [
  {
    id: randomUUID(),
    name: "orga1",
  },
  { id: randomUUID(), name: "orga2" },
];
export const organizationHandlers = [
  http.get(`${baseURL}/organizations`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([...organizations]);
  }),
];
export const activeOrganization = organizations[0];
