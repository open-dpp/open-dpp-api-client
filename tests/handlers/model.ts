import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { randomUUID } from "node:crypto";
import { DataValueDto, DataValuePatchDto } from "../../src";
import { productDataModel } from "./product-data-model";
import { activeOrganization } from "./organization";

export const updateDataValues: DataValuePatchDto[] = [
  {
    id: randomUUID(),
    value: "value 1",
  },
  {
    id: randomUUID(),
    value: "value 2",
  },
];
export const dataSectionId = randomUUID();
export const dataFieldId = randomUUID();

export const model = {
  uniqueProductIdentifiers: [
    {
      uuid: randomUUID(),
      view: "all",
      referenceId: randomUUID(),
    },
  ],
  id: randomUUID(),
  dataValues: [],
  name: "My name",
  description: "My desc",
  owner: randomUUID(),
};

export const responseDataValues: DataValueDto[] = updateDataValues.map((v) => ({
  ...v,
  dataSectionId,
  dataFieldId,
}));

export const modelHandlers = [
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}`,
    () => {
      return HttpResponse.json(model);
    },
  ),
  http.patch(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/data-values`,
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
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/data-values`,
    async ({ request }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body: any = await request.json();
      return HttpResponse.json(
        {
          ...model,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataValues: body.map((b: any) => ({
            id: randomUUID(),
            ...b,
          })),
        },
        { status: 201 },
      );
    },
  ),
  http.post(
    `${baseURL}/organizations/${activeOrganization.id}/models/${model.id}/product-data-models/${productDataModel.id}`,
    async () => {
      return HttpResponse.json(
        { ...model, productDataModelId: productDataModel.id },
        { status: 201 },
      );
    },
  ),
];
