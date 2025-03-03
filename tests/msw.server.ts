import { setupServer } from "msw/node";
import { modelHandlers } from "./handlers/model";
import { productDataModelHandlers } from "./handlers/product.data.model";
import { uniqueProductIdentifierHandlers } from "./handlers/unique.product.identifiers";
import { organizationHandlers } from "./handlers/organization";

const handlers = [
  ...modelHandlers,
  ...productDataModelHandlers,
  ...uniqueProductIdentifierHandlers,
  ...organizationHandlers,
];

export const server = setupServer(...handlers);
