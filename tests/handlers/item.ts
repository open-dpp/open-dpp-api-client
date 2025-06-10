import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";
import { ItemDto } from "../../src/items/item.dtos";
import { dataFieldId, dataSectionId, model } from "./model";

export const item1: ItemDto = {
  id: randomUUID(),
  uniqueProductIdentifiers: [],
  dataValues: [],
  productDataModelId: randomUUID(),
};

export const item2: ItemDto = {
  id: randomUUID(),
  uniqueProductIdentifiers: [],
  dataValues: [],
  productDataModelId: randomUUID(),
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
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/items/${item1.id}`,
    () => {
      return HttpResponse.json(item1);
    },
  ),
  http.patch(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/items/${item1.id}/data-values`,
    async ({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = await request.json();
      return HttpResponse.json(
        {
          ...model,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataValues: body.map((b: any) => ({
            ...b,
            dataSectionId,
            dataFieldId,
          })),
        },
        { status: 200 },
      );
    },
  ),
  http.post(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/items/${item1.id}/data-values`,
    async ({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = await request.json();
      return HttpResponse.json(
        {
          ...model,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataValues: body.map((b: any) => ({
            ...b,
          })),
        },
        { status: 201 },
      );
    },
  ),
];
