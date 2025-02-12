"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.responseDataValues = exports.updateDataValues = exports.productDataModel = exports.model = exports.organizations = void 0;
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
    name: "Laptop neu",
    version: "1.0",
    sections: [
        {
            id: (0, node_crypto_1.randomUUID)(),
            dataFields: [
                {
                    id: (0, node_crypto_1.randomUUID)(),
                    options: {
                        min: 24,
                    },
                    name: "Prozessor",
                    type: "TextField",
                },
            ],
        },
    ],
};
exports.updateDataValues = [
    {
        id: (0, node_crypto_1.randomUUID)(),
        value: "value 1",
    },
    {
        id: (0, node_crypto_1.randomUUID)(),
        value: "value 2",
    },
];
const dataSectionId = (0, node_crypto_1.randomUUID)();
const dataFieldId = (0, node_crypto_1.randomUUID)();
exports.responseDataValues = exports.updateDataValues.map((v) => ({
    ...v,
    dataSectionId,
    dataFieldId,
}));
const handlers = [
    // Intercept "GET https://example.com/user" requests...
    msw_1.http.get(`${baseURL}/organizations`, () => {
        // ...and respond to them using this JSON response.
        return msw_1.HttpResponse.json([...exports.organizations]);
    }),
    msw_1.http.get(`${baseURL}/models/${exports.model.id}`, () => {
        return msw_1.HttpResponse.json(exports.model);
    }),
    msw_1.http.patch(`${baseURL}/models/${exports.model.id}/data-values`, async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const body = await request.json();
        return msw_1.HttpResponse.json({
            ...exports.model,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataValues: body.map((b) => ({
                ...b,
                dataSectionId,
                dataFieldId,
            })),
        }, { status: 201 });
    }),
    msw_1.http.post(`${baseURL}/product-data-models`, async ({ request }) => {
        return msw_1.HttpResponse.json(await request.json(), { status: 201 });
    }),
    msw_1.http.get(`${baseURL}/product-data-models`, async () => {
        return msw_1.HttpResponse.json([{ id: exports.productDataModel.id, name: exports.productDataModel.name }], { status: 200 });
    }),
    msw_1.http.get(`${baseURL}/product-data-models/${exports.productDataModel.id}`, async () => {
        return msw_1.HttpResponse.json(exports.productDataModel, { status: 200 });
    }),
    msw_1.http.post(`${baseURL}/models/${exports.model.id}/product-data-models/${exports.productDataModel.id}`, async () => {
        return msw_1.HttpResponse.json({ ...exports.model, productDataModelId: exports.productDataModel.id }, { status: 201 });
    }),
];
exports.server = (0, node_1.setupServer)(...handlers);
