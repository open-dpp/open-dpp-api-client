import { http, HttpResponse } from "msw";
import { baseURL } from "./index";
import {
  DataFieldDraftDto,
  DataFieldType,
  ProductDataModelDraftDto,
  ProductDataModelDraftGetAllDto,
  SectionDraftDto,
  SectionType,
} from "../../src";
import { randomUUID } from "node:crypto";
import { activeOrganization } from "./organization";
import { productDataModel } from "./product-data-model";

export const productDataModelDraft: ProductDataModelDraftDto = {
  id: randomUUID(),
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
};

export const draftsOfOrganization: ProductDataModelDraftGetAllDto[] = [
  { id: productDataModelDraft.id, name: productDataModelDraft.name },
  { id: randomUUID(), name: "Other draft" },
];

export const sectionDraft: SectionDraftDto = {
  id: randomUUID(),
  name: "sect",
  type: SectionType.GROUP,
  dataFields: [],
  subSections: [],
};

export const dataFieldDraft: DataFieldDraftDto = {
  id: randomUUID(),
  name: "sect",
  type: DataFieldType.TEXT_FIELD,
};

const draftEndpointUrl = `${baseURL}/organizations/${activeOrganization.id}/product-data-model-drafts`;

export const productDataModelDraftsHandlers = [
  http.post(`${draftEndpointUrl}`, async () => {
    return HttpResponse.json(productDataModelDraft, {
      status: 201,
    });
  }),
  http.post(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),
  http.post(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),
  http.post(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}/data-fields`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),
  http.patch(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}/data-fields/${dataFieldDraft.id}`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),

  http.delete(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}/data-fields/${dataFieldDraft.id}`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),

  http.delete(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),

  http.patch(
    `${draftEndpointUrl}/${productDataModelDraft.id}/sections/${sectionDraft.id}`,
    async () => {
      return HttpResponse.json(productDataModelDraft, {
        status: 200,
      });
    },
  ),
  http.get(`${draftEndpointUrl}`, async () => {
    return HttpResponse.json(draftsOfOrganization, {
      status: 200,
    });
  }),

  http.get(`${draftEndpointUrl}/${productDataModelDraft.id}`, async () => {
    return HttpResponse.json(productDataModelDraft, {
      status: 200,
    });
  }),

  http.patch(`${draftEndpointUrl}/${productDataModelDraft.id}`, async () => {
    return HttpResponse.json(productDataModelDraft, {
      status: 200,
    });
  }),

  http.post(
    `${draftEndpointUrl}/${productDataModelDraft.id}/publish`,
    async () => {
      return HttpResponse.json(productDataModel, {
        status: 200,
      });
    },
  ),
];
