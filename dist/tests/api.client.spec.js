"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msw_server_1 = require("./msw.server");
const src_1 = require("../src");
describe("ApiClient", () => {
    beforeAll(() => msw_server_1.server.listen());
    afterEach(() => msw_server_1.server.resetHandlers());
    afterAll(() => msw_server_1.server.close());
    const baseURL = "https://api.cloud.open-dpp.de";
    it("should return organizations", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getOrganizations();
        expect(response.data).toEqual(msw_server_1.organizations);
    });
    it("should return model", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getModelById(msw_server_1.model.id);
        expect(response.data).toEqual(msw_server_1.model);
    });
    it("should create product data model", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.createProductDataModel(msw_server_1.productDataModel);
        expect(response.data).toEqual(msw_server_1.productDataModel);
    });
    it("should get all product data models", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getProductDataModels();
        expect(response.data).toEqual([
            { id: msw_server_1.productDataModel.id, name: msw_server_1.productDataModel.name },
        ]);
    });
    it("should get product data model by id", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.getProductDataModelById(msw_server_1.productDataModel.id);
        expect(response.data).toEqual(msw_server_1.productDataModel);
    });
    it("should update model data", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.updateModelData(msw_server_1.model.id, msw_server_1.updateDataValues);
        expect(response.data.dataValues).toEqual(msw_server_1.responseDataValues);
    });
    it("should assign product data model to model", async () => {
        const client = new src_1.OpenDppApiClient({
            baseURL,
        });
        const response = await client.assignProductDataModelToModel(msw_server_1.productDataModel.id, msw_server_1.model.id);
        expect(response.data).toEqual({
            ...msw_server_1.model,
            productDataModelId: msw_server_1.productDataModel.id,
        });
    });
});
