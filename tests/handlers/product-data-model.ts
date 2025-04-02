import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import {
  DataFieldType,
  ProductDataModelDto,
  SectionType,
  VisibilityLevel,
} from "../../src";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";

export const productDataModel: ProductDataModelDto = {
  id: randomUUID(),
  name: "Laptop neu",
  visibility: VisibilityLevel.PRIVATE,
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
          type: DataFieldType.TEXT_FIELD,
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
