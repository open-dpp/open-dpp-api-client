import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";
import { ItemDto } from "../../src/items/item.dtos";
import { model } from "./model";

export const item1: ItemDto = {
  id: randomUUID(),
  uniqueProductIdentifiers: [],
};

export const item2: ItemDto = {
  id: randomUUID(),
  uniqueProductIdentifiers: [],
};

export const itemHandlers = [
  http.post(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/items`,
    () => {
      return HttpResponse.json(item1);
    },
  ),
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/items`,
    () => {
      return HttpResponse.json([item1, item2]);
    },
  ),
];
