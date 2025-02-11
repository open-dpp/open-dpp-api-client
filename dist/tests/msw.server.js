"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.productDataModel = exports.model = exports.organizations = void 0;
const msw_1 = require("msw");
const node_1 = require("msw/node");
const node_crypto_1 = require("node:crypto");
const baseURL = "https://api.cloud.open-dpp.de";
exports.organizations = [
    {
        id: (0, node_crypto_1.randomUUID)(),
        name: "orga1",
    },
    { id: (0, node_crypto_1.randomUUID)(), name: "orga2" },
];
exports.model = {
    uniqueProductIdentifiers: [
        {
            uuid: (0, node_crypto_1.randomUUID)(),
            view: "all",
            referenceId: (0, node_crypto_1.randomUUID)(),
        },
    ],
    id: (0, node_crypto_1.randomUUID)(),
    dataValues: [],
    name: "My name",
    description: "My desc",
    owner: (0, node_crypto_1.randomUUID)(),
};
exports.productDataModel = {
    id: (0, node_crypto_1.randomUUID)(),
};
const handlers = [
    // Intercept "GET https://example.com/user" requests...
    msw_1.http.get(`${baseURL}/organizations`, () => {
        // ...and respond to them using this JSON response.
        return msw_1.HttpResponse.json([...exports.organizations]);
    }),
    msw_1.http.get(`${baseURL}/models/${exports.model.id}`, () => {
        return msw_1.HttpResponse.json(exports.model);
    }),
    msw_1.http.post(`${baseURL}/models/${exports.model.id}/product-data-models/${exports.productDataModel.id}`, async () => {
        return msw_1.HttpResponse.json({ ...exports.model, productDataModelId: exports.productDataModel.id }, { status: 201 });
    }),
];
exports.server = (0, node_1.setupServer)(...handlers);
