import {
  model,
  organizations,
  productDataModel,
  responseDataValues,
  responseView,
  server,
  uniqueProductIdentifierId,
  updateDataValues,
} from "./msw.server";
import { OpenDppApiClient } from "../src";
import { randomUUID } from "node:crypto";

describe("ApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const baseURL = "https://api.cloud.open-dpp.de";
  it("should return organizations", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.organizations.getAll();
    expect(response.data).toEqual(organizations);
  });

  it("should return model", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.models.getModelById(model.id);
    expect(response.data).toEqual(model);
  });

  it("should create product data model", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response =
      await client.productDataModels.createProductDataModel(productDataModel);
    expect(response.data).toEqual(productDataModel);
  });

  it("should get all product data models", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.productDataModels.getProductDataModels();
    expect(response.data).toEqual([
      { id: productDataModel.id, name: productDataModel.name },
    ]);
  });

  it("should get product data model by id", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.productDataModels.getProductDataModelById(
      productDataModel.id,
    );
    expect(response.data).toEqual(productDataModel);
  });

  it("should update model data", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.models.updateModelData(
      model.id,
      updateDataValues,
    );
    expect(response.data.dataValues).toEqual(responseDataValues);
  });

  it("should add model data", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const addDataValues = [
      {
        dataFieldId: randomUUID(),
        dataSectionId: randomUUID(),
        row: 0,
        value: "A",
      },
      {
        dataFieldId: randomUUID(),
        dataSectionId: randomUUID(),
        row: 0,
        value: "B",
      },
    ];
    const response = await client.models.addModelData(model.id, addDataValues);
    expect(response.data.dataValues).toEqual(
      addDataValues.map((v) => ({ ...v, id: expect.any(String) })),
    );
  });

  it("should assign product data model to model", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.models.assignProductDataModelToModel(
      productDataModel.id,
      model.id,
    );
    expect(response.data).toEqual({
      ...model,
      productDataModelId: productDataModel.id,
    });
  });

  it("should return view by unique product identifier", async () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    const response = await client.uniqueProductIdentifiers.getView(
      uniqueProductIdentifierId,
    );
    expect(response.data).toEqual({
      ...responseView,
    });
  });
});
