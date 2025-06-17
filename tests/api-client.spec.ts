import { server } from "./msw.server";
import { GranularityLevel, OpenDppApiClient, VisibilityLevel } from "../src";
import { randomUUID } from "node:crypto";
import { activeOrganization, organizations } from "./handlers/organization";
import { model, responseDataValues, updateDataValues } from "./handlers/model";
import { productDataModel } from "./handlers/product-data-model";
import {
  responseView,
  uniqueProductIdentifier,
  uniqueProductIdentifierId,
} from "./handlers/unique-product-identifiers";
import { item1, item2 } from "./handlers/item";
import {
  dataFieldDraft,
  draftsOfOrganization,
  productDataModelDraft,
  sectionDraft,
} from "./handlers/product-data-model-draft";

describe("ApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const baseURL = "https://api.cloud.open-dpp.de";

  describe("organizations", () => {
    it("should return organizations", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      const response = await client.organizations.getAll();
      expect(response.data).toEqual(organizations);
    });
  });

  describe("product-data-models", () => {
    it("should get all product data models", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);
      const response = await client.productDataModels.getAll();
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
  });

  describe("model", () => {
    it("should return model", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);
      const response = await client.models.getModelById(model.id);
      expect(response.data).toEqual(model);
    });

    it("should update model data", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

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
      client.setActiveOrganizationId(activeOrganization.id);

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
      const response = await client.models.addModelData(
        model.id,
        addDataValues,
      );
      expect(response.data.dataValues).toEqual(
        addDataValues.map((v) => ({ ...v })),
      );
    });
    it("should assign product data model to model", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

      const response = await client.models.assignProductDataModelToModel(
        productDataModel.id,
        model.id,
      );
      expect(response.data).toEqual({
        ...model,
        productDataModelId: productDataModel.id,
      });
    });
  });

  describe("items", () => {
    it("should create item", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

      const response = await client.items.createItem(model.id);
      expect(response.data).toEqual(item1);
    });

    it("should get items", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

      const response = await client.items.getItems(model.id);
      expect(response.data).toEqual([item1, item2]);
    });

    it("should get single item", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

      const response = await client.items.getItem(model.id, item1.id);
      expect(response.data).toEqual(item1);
    });

    it("should update item data", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

      const response = await client.items.updateItemData(
        model.id,
        item1.id,
        updateDataValues,
      );
      expect(response.data.dataValues).toEqual(responseDataValues);
    });

    it("should add item data", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      client.setActiveOrganizationId(activeOrganization.id);

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
      const response = await client.items.addItemData(
        model.id,
        item1.id,
        addDataValues,
      );
      expect(response.data.dataValues).toEqual(
        addDataValues.map((v) => ({ ...v })),
      );
    });
  });

  describe("product-data-model-drafts", () => {
    const client = new OpenDppApiClient({
      baseURL,
    });
    client.setActiveOrganizationId(activeOrganization.id);
    it("should be created", async () => {
      const response = await client.productDataModelDrafts.create({
        name: productDataModelDraft.name,
      });
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });
    it("should add section to draft", async () => {
      const response = await client.productDataModelDrafts.addSection(
        productDataModelDraft.id,
        {
          name: sectionDraft.name,
          type: sectionDraft.type,
          parentSectionId: randomUUID(),
          layout: {
            cols: { sm: 3 },
            colSpan: { sm: 1 },
            colStart: { sm: 1 },
            rowSpan: { sm: 1 },
            rowStart: { sm: 1 },
          },
        },
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });
    it("should add data field to section of draft", async () => {
      const response = await client.productDataModelDrafts.addDataField(
        productDataModelDraft.id,
        sectionDraft.id,
        {
          name: dataFieldDraft.name,
          type: dataFieldDraft.type,
          options: { max: 2 },
          layout: {
            colSpan: { sm: 1 },
            colStart: { sm: 1 },
            rowSpan: { sm: 1 },
            rowStart: { sm: 1 },
          },
          granularityLevel: GranularityLevel.MODEL,
        },
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should modify data field", async () => {
      const response = await client.productDataModelDrafts.modifyDataField(
        productDataModelDraft.id,
        sectionDraft.id,
        dataFieldDraft.id,
        {
          name: "new name",
          options: { min: 2 },
          layout: {
            colSpan: { sm: 2 },
            colStart: { sm: 2 },
            rowSpan: { sm: 2 },
            rowStart: { sm: 2 },
          },
        },
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should delete data field", async () => {
      const response = await client.productDataModelDrafts.deleteDataField(
        productDataModelDraft.id,
        sectionDraft.id,
        dataFieldDraft.id,
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should delete section", async () => {
      const response = await client.productDataModelDrafts.deleteSection(
        productDataModelDraft.id,
        sectionDraft.id,
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should modify section", async () => {
      const response = await client.productDataModelDrafts.modifySection(
        productDataModelDraft.id,
        sectionDraft.id,
        {
          name: "new name",
          layout: {
            cols: { sm: 3 },
            colSpan: { sm: 2 },
            colStart: { sm: 2 },
            rowSpan: { sm: 2 },
            rowStart: { sm: 2 },
          },
        },
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should get all product data model drafts", async () => {
      const response = await client.productDataModelDrafts.getAll();
      expect(response.data).toEqual(draftsOfOrganization);
    });

    it("should get product data model draft", async () => {
      const response = await client.productDataModelDrafts.getById(
        productDataModelDraft.id,
      );
      expect(response.data).toEqual({ ...productDataModelDraft });
    });

    it("should modify product data model draft", async () => {
      const response = await client.productDataModelDrafts.modify(
        productDataModelDraft.id,
        { name: "new Name" },
      );
      expect(response.data).toEqual({ ...productDataModelDraft });
    });

    it("should be published", async () => {
      const response = await client.productDataModelDrafts.publish(
        productDataModelDraft.id,
        { visibility: VisibilityLevel.PRIVATE },
      );
      expect(response.data).toEqual({ ...productDataModel });
    });
  });

  describe("unique-product-identifiers", () => {
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

    it("should return unique product identifier", async () => {
      const client = new OpenDppApiClient({
        baseURL,
      });
      const response =
        await client.uniqueProductIdentifiers.getUniqueProductIdentifier(
          uniqueProductIdentifierId,
        );
      expect(response.data).toEqual(uniqueProductIdentifier);
    });
  });
});
