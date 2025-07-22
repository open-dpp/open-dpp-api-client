import { setupServer } from "msw/node";
import { modelHandlers } from "./handlers/model";
import { itemHandlers } from "./handlers/item";
import { productDataModelHandlers } from "./handlers/template";
import { templateDraftsHandlers } from "./handlers/template-draft";
import { uniqueProductIdentifierHandlers } from "./handlers/unique-product-identifiers";
import { organizationHandlers } from "./handlers/organization";
import { aasIntegrationHandlers } from "./handlers/aas-integration";

const handlers = [
  ...modelHandlers,
  ...itemHandlers,
  ...productDataModelHandlers,
  ...templateDraftsHandlers,
  ...uniqueProductIdentifierHandlers,
  ...organizationHandlers,
  ...aasIntegrationHandlers,
];

export const server = setupServer(...handlers);
