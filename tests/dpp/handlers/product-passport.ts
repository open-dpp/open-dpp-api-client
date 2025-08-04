import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { ProductPassportDto } from "../../../src";
import { randomUUID } from "node:crypto";

export const productPassport: ProductPassportDto = {
  id: randomUUID(),
  name: "name",
  description: "description",
  dataSections: [],
};

export const productPassportHandlers = [
  http.get(`${baseURL}/product-passports/${productPassport.id}`, () => {
    return HttpResponse.json({ ...productPassport });
  }),
];
