import { setupServer } from "msw/node";
import { modelHandlers } from "./handlers/model";
import { productDataModelHandlers } from "./handlers/product-data-model";
import { uniqueProductIdentifierHandlers } from "./handlers/unique-product-identifiers";
import { organizationHandlers } from "./handlers/organization";
import { itemHandlers } from "./handlers/item";
import { productDataModelDraftsHandlers } from "./handlers/product-data-model-draft";

const handlers = [
  ...modelHandlers,
  ...itemHandlers,
  ...productDataModelHandlers,
  ...productDataModelDraftsHandlers,
  ...uniqueProductIdentifierHandlers,
  ...organizationHandlers,
];

export const server = setupServer(...handlers);
