import { http, HttpResponse } from "msw";
import { marketplaceURL } from "./index";

export const passportTemplate = {};

export const passportHandlers = [
  http.get(`${marketplaceURL}/templates/passports`, () => {
    return HttpResponse.json([passportTemplate]);
  }),
];
