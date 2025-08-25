import { http, HttpResponse } from "msw";
import { randomUUID } from "node:crypto";
import { baseURL } from "./index";
import {
  GranularityLevel,
  UniqueProductIdentifierReferenceDto,
} from "../../../src";
import { activeOrganization } from "../../organization";

export const uniqueProductIdentifierId = randomUUID();
export const uniqueProductIdentifierReference: UniqueProductIdentifierReferenceDto =
  {
    id: randomUUID(),
    organizationId: randomUUID(),
    modelId: randomUUID(),
    granularityLevel: GranularityLevel.MODEL,
  };
export const uniqueProductIdentifierHandlers = [
  http.get(
    `${baseURL}/organizations/${activeOrganization.id}/unique-product-identifiers/${uniqueProductIdentifierId}/reference`,
    () => {
      return HttpResponse.json({ ...uniqueProductIdentifierReference });
    },
  ),
];
