import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import { ProductDataModelDto, VisibilityLevel } from "../../src";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";
import { SectionType } from "../../src";
import { DataFieldType } from "../../src";

const dataModelId = randomUUID();

export const productDataModel: ProductDataModelDto = {
  id: dataModelId,
  name: "Laptop neu",
  visibility: VisibilityLevel.PRIVATE,
  version: "1.0",
  sections: [
    {
      id: randomUUID(),
      type: SectionType.GROUP,
      name: "section name",
      layout: {
        cols: { sm: 3 },
        colStart: { sm: 1 },
        colSpan: { sm: 1 },
        rowStart: { sm: 1 },
        rowSpan: { sm: 1 },
      },
      dataFields: [
        {
          id: randomUUID(),
          options: {
            min: 24,
          },
          name: "Prozessor",
          type: DataFieldType.TEXT_FIELD,
          layout: {
            colStart: { sm: 1 },
            colSpan: { sm: 1 },
            rowStart: { sm: 1 },
            rowSpan: { sm: 1 },
          },
        },
      ],
      subSections: [],
    },
  ],
  ownedByOrganizationId: activeOrganization.id,
  createdByUserId: randomUUID(),
};

export const productDataModelHandlers = [
  http.get(`${baseURL}/product-data-models`, async ({ request }) => {
    const url = new URL(request.url);

    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "/product?id=1", "organization" will equal "1".
    const organizationId = url.searchParams.get("organization");

    // Note that query parameters are potentially undefined.
    // Make sure to account for that in your handlers.
    if (organizationId !== activeOrganization.id) {
      return new HttpResponse(null, { status: 404 });
    }
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
