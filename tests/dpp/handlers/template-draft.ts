import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import {
  GranularityLevel,
  TemplateDraftDto,
  TemplateDraftGetAllDto,
} from "../../../src";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";
import { productDataModel } from "./product-data-model";
import { SectionDto, SectionType } from "../../../src";
import { DataFieldDto, DataFieldType } from "../../../src";

const dataModelId = randomUUID();

export const templateDraft: TemplateDraftDto = {
  id: dataModelId,
  name: "Laptop neu",
  version: "1.0.0",
  publications: [],
  createdByUserId: randomUUID(),
  ownedByOrganizationId: randomUUID(),
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
};

export const draftsOfOrganization: TemplateDraftGetAllDto[] = [
  { id: templateDraft.id, name: templateDraft.name },
  { id: randomUUID(), name: "Other draft" },
];

export const sectionDraft: SectionDto = {
  id: randomUUID(),
  name: "sect",
  type: SectionType.GROUP,
  dataFields: [],
  subSections: [],
  layout: {
    cols: { sm: 3 },
    colStart: { sm: 1 },
    colSpan: { sm: 1 },
    rowStart: { sm: 1 },
    rowSpan: { sm: 1 },
  },
};

export const dataFieldDraft: DataFieldDto = {
  id: randomUUID(),
  name: "sect",
  type: DataFieldType.TEXT_FIELD,
  options: {},
  layout: {
    colStart: { sm: 1 },
    colSpan: { sm: 1 },
    rowStart: { sm: 1 },
    rowSpan: { sm: 1 },
  },
  granularityLevel: GranularityLevel.MODEL,
};

const draftEndpointUrl = `${baseURL}/organizations/${activeOrganization.id}/template-drafts`;

export const templateDraftsHandlers = [
  http.post(`${draftEndpointUrl}`, async () => {
    return HttpResponse.json(templateDraft, {
      status: 201,
    });
  }),
  http.post(`${draftEndpointUrl}/${templateDraft.id}/sections`, async () => {
    return HttpResponse.json(templateDraft, {
      status: 200,
    });
  }),
  http.post(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),
  http.post(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}/data-fields`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),
  http.patch(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}/data-fields/${dataFieldDraft.id}`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),

  http.delete(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}/data-fields/${dataFieldDraft.id}`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),

  http.delete(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),

  http.patch(
    `${draftEndpointUrl}/${templateDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(templateDraft, {
        status: 200,
      });
    },
  ),
  http.get(`${draftEndpointUrl}`, async () => {
    return HttpResponse.json(draftsOfOrganization, {
      status: 200,
    });
  }),

  http.get(`${draftEndpointUrl}/${templateDraft.id}`, async () => {
    return HttpResponse.json(templateDraft, {
      status: 200,
    });
  }),

  http.patch(`${draftEndpointUrl}/${templateDraft.id}`, async () => {
    return HttpResponse.json(templateDraft, {
      status: 200,
    });
  }),

  http.post(`${draftEndpointUrl}/${templateDraft.id}/publish`, async () => {
    return HttpResponse.json(productDataModel, {
      status: 200,
    });
  }),
];
