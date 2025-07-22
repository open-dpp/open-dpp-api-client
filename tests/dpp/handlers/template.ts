import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import {
  DataFieldType,
  GranularityLevel,
  SectionType,
  TemplateDto,
} from "../../../src";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";

const dataModelId = randomUUID();

export const template: TemplateDto = {
  id: dataModelId,
  name: "Laptop neu",
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
          granularityLevel: GranularityLevel.MODEL,
        },
      ],
      subSections: [],
    },
  ],
  ownedByOrganizationId: activeOrganization.id,
  createdByUserId: randomUUID(),
};

const templatesEndpointUrl = `${baseURL}/organizations/${activeOrganization.id}/templates`;

export const productDataModelHandlers = [
  http.get(templatesEndpointUrl, async () => {
    return HttpResponse.json([{ id: template.id, name: template.name }], {
      status: 200,
    });
  }),
  http.get(`${templatesEndpointUrl}/${template.id}`, async () => {
    return HttpResponse.json(template, { status: 200 });
  }),
];
