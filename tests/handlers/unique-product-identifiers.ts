import { http, HttpResponse } from "msw";
import { randomUUID } from "node:crypto";
import { baseURL } from "./index";
import {
  DataFieldType,
  GranularityLevel,
  UniqueProductIdentifierReferenceDto,
  ViewDto,
} from "../../src";
import { activeOrganization } from "./organization";

export const uniqueProductIdentifierId = randomUUID();
export const uniqueProductIdentifierReference: UniqueProductIdentifierReferenceDto =
  {
    id: randomUUID(),
    organizationId: randomUUID(),
    modelId: randomUUID(),
    granularityLevel: GranularityLevel.MODEL,
  };
export const responseView: ViewDto = {
  name: "My model",
  description: "Description",
  nodes: [
    {
      name: "Repeating Section",
      rows: [
        {
          layout: {
            cols: { sm: 3 },
            colStart: { sm: 1 },
            colSpan: { sm: 1 },
            rowStart: { sm: 1 },
            rowSpan: { sm: 1 },
          },
          children: [
            {
              type: DataFieldType.TEXT_FIELD,
              value: "val1,0",
              name: "Title 1",
              layout: {
                colStart: { sm: 1 },
                colSpan: { sm: 1 },
                rowStart: { sm: 1 },
                rowSpan: { sm: 1 },
              },
            },
            {
              name: "Group Section",
              layout: {
                cols: { sm: 3 },
                colStart: { sm: 1 },
                colSpan: { sm: 1 },
                rowStart: { sm: 1 },
                rowSpan: { sm: 1 },
              },
              children: [
                {
                  type: DataFieldType.TEXT_FIELD,
                  value: "val3,0",
                  name: "Title 3",
                  layout: {
                    colStart: { sm: 1 },
                    colSpan: { sm: 1 },
                    rowStart: { sm: 1 },
                    rowSpan: { sm: 1 },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Group Section 2",
      layout: {
        cols: { sm: 2 },
        colStart: { sm: 1 },
        colSpan: { sm: 1 },
        rowStart: { sm: 1 },
        rowSpan: { sm: 1 },
      },
      children: [
        {
          type: DataFieldType.TEXT_FIELD,
          value: "val5,0",
          name: "Title sg21",
          layout: {
            colStart: { sm: 1 },
            colSpan: { sm: 1 },
            rowStart: { sm: 1 },
            rowSpan: { sm: 1 },
          },
        },
      ],
    },
  ],
};
export const uniqueProductIdentifierHandlers = [
  http.get(
    `${baseURL}/unique-product-identifiers/${uniqueProductIdentifierId}/view`,
    () => {
      return HttpResponse.json({ ...responseView });
    },
  ),
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/unique-product-identifiers/${uniqueProductIdentifierId}/reference`,
    () => {
      return HttpResponse.json({ ...uniqueProductIdentifierReference });
    },
  ),
];
