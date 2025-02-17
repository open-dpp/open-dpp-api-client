import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { randomUUID } from "node:crypto";
import { ProductDataModelDto } from "../src/product-data-models/product.data.model.dtos";
import { DataValueDto, DataValuePatchDto } from "../src/models/model.dtos";

const baseURL = "https://api.cloud.open-dpp.de";

export const organizations = [
  {
    id: randomUUID(),
    name: "orga1",
  },
  { id: randomUUID(), name: "orga2" },
];

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

export const productDataModel: ProductDataModelDto = {
  id: randomUUID(),
  name: "Laptop neu",
  version: "1.0",
  sections: [
    {
      id: randomUUID(),
      dataFields: [
        {
          id: randomUUID(),
          options: {
            min: 24,
          },
          name: "Prozessor",
          type: "TextField",
        },
      ],
    },
  ],
};

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

const dataSectionId = randomUUID();
const dataFieldId = randomUUID();

export const responseDataValues: DataValueDto[] = updateDataValues.map((v) => ({
  ...v,
  dataSectionId,
  dataFieldId,
}));

const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${baseURL}/organizations`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([...organizations]);
  }),
  http.get(`${baseURL}/models/${model.id}`, () => {
    return HttpResponse.json(model);
  }),
  http.patch(
    `${baseURL}/models/${model.id}/data-values`,
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
        { status: 201 },
      );
    },
  ),
  http.post(`${baseURL}/product-data-models`, async ({ request }) => {
    return HttpResponse.json(await request.json(), { status: 201 });
  }),
  http.get(`${baseURL}/product-data-models`, async () => {
    return HttpResponse.json(
      [{ id: productDataModel.id, name: productDataModel.name }],
      { status: 200 },
    );
  }),
  http.get(
    `${baseURL}/product-data-models/${productDataModel.id}`,
    async () => {
      return HttpResponse.json(productDataModel, { status: 200 });
    },
  ),

  http.post(
    `${baseURL}/models/${model.id}/product-data-models/${productDataModel.id}`,
    async () => {
      return HttpResponse.json(
        { ...model, productDataModelId: productDataModel.id },
        { status: 201 },
      );
    },
  ),
];

export const server = setupServer(...handlers);
