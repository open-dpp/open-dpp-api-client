"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
const msw_server_1 = require("./msw.server");
describe("ApiClient", () => {
    beforeAll(() => msw_server_1.server.listen());
    afterEach(() => msw_server_1.server.resetHandlers());
    afterAll(() => msw_server_1.server.close());
    const baseURL = "https://api.cloud.open-dpp.de";
    it("should return organizations", async () => {
        const client = new dist_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getOrganizations();
        expect(response.data).toEqual(msw_server_1.organizations);
    });
    it("should return model", async () => {
        const client = new dist_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getModelById(msw_server_1.model.id);
        expect(response.data).toEqual(msw_server_1.model);
    });
    it("should assign product data model to model", async () => {
        const client = new dist_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.assignProductDataModelToModel(msw_server_1.productDataModel.id, msw_server_1.model.id);
        expect(response.data).toEqual({
            ...msw_server_1.model,
            productDataModelId: msw_server_1.productDataModel.id,
        });
    });
});
