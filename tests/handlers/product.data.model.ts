import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { ProductDataModelDto, SectionType } from "../../src";
import { randomUUID } from "node:crypto";

export const productDataModel: ProductDataModelDto = {
  id: randomUUID(),
  name: "Laptop neu",
  version: "1.0",
  sections: [
    {
      id: randomUUID(),
      type: SectionType.GROUP,
      name: "section name",
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
export const productDataModelHandlers = [
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
];
