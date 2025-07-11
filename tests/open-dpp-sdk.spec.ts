import { server } from "./msw.server";
import {
  AssetAdministrationShellType,
  GranularityLevel,
  OpenDppSdk,
  VisibilityLevel,
} from "../src";
import { randomUUID } from "node:crypto";
import { activeOrganization, organizations } from "./handlers/organization";
import { model, responseDataValues, updateDataValues } from "./handlers/model";
import { productDataModel } from "./handlers/product-data-model";
import {
  responseView,
  uniqueProductIdentifierId,
  uniqueProductIdentifierReference,
} from "./handlers/unique-product-identifiers";
import { item1, item2 } from "./handlers/item";
import {
  dataFieldDraft,
  draftsOfOrganization,
  productDataModelDraft,
  sectionDraft,
} from "./handlers/product-data-model-draft";
import {
  aasPropertiesWithParent,
  connection,
  connectionList,
} from "./handlers/aas-integration";

describe("ApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const baseURL = "https://api.cloud.open-dpp.de";

  describe("organizations", () => {
    it("should return organizations", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      const response = await sdk.dpp.organizations.getAll();
      expect(response.data).toEqual(organizations);
    });
  });

  describe("product-data-models", () => {
    it("should get all product data models", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);
      const response = await sdk.dpp.productDataModels.getAll();
      expect(response.data).toEqual([
        { id: productDataModel.id, name: productDataModel.name },
      ]);
    });

    it("should get product data model by id", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      const response = await sdk.dpp.productDataModels.getById(
        productDataModel.id,
      );
      expect(response.data).toEqual(productDataModel);
    });
  });

  describe("model", () => {
    it("should return model", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);
      const response = await sdk.dpp.models.getById(model.id);
      expect(response.data).toEqual(model);
    });

    it("should update model data", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.models.modifyData(
        model.id,
        updateDataValues,
      );
      expect(response.data.dataValues).toEqual(responseDataValues);
    });

    it("should add model data", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

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
      const response = await sdk.dpp.models.addData(model.id, addDataValues);
      expect(response.data.dataValues).toEqual(
        addDataValues.map((v) => ({ ...v })),
      );
    });
    it("should assign product data model to model", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.models.assignProductDataModel(
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
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.items.create(model.id);
      expect(response.data).toEqual(item1);
    });

    it("should get items", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.items.getAll(model.id);
      expect(response.data).toEqual([item1, item2]);
    });

    it("should get single item", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.items.getById(model.id, item1.id);
      expect(response.data).toEqual(item1);
    });

    it("should update item data", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

      const response = await sdk.dpp.items.modifyData(
        model.id,
        item1.id,
        updateDataValues,
      );
      expect(response.data.dataValues).toEqual(responseDataValues);
    });

    it("should add item data", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);

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
      const response = await sdk.dpp.items.addData(
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
    const sdk = new OpenDppSdk({
      baseURL,
    });
    sdk.setActiveOrganizationId(activeOrganization.id);
    it("should be created", async () => {
      const response = await sdk.dpp.productDataModelDrafts.create({
        name: productDataModelDraft.name,
      });
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });
    it("should add section to draft", async () => {
      const response = await sdk.dpp.productDataModelDrafts.addSection(
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
      const response = await sdk.dpp.productDataModelDrafts.addDataField(
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
      const response = await sdk.dpp.productDataModelDrafts.modifyDataField(
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
      const response = await sdk.dpp.productDataModelDrafts.deleteDataField(
        productDataModelDraft.id,
        sectionDraft.id,
        dataFieldDraft.id,
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should delete section", async () => {
      const response = await sdk.dpp.productDataModelDrafts.deleteSection(
        productDataModelDraft.id,
        sectionDraft.id,
      );
      expect(response.data).toEqual({
        ...productDataModelDraft,
      });
    });

    it("should modify section", async () => {
      const response = await sdk.dpp.productDataModelDrafts.modifySection(
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
      const response = await sdk.dpp.productDataModelDrafts.getAll();
      expect(response.data).toEqual(draftsOfOrganization);
    });

    it("should get product data model draft", async () => {
      const response = await sdk.dpp.productDataModelDrafts.getById(
        productDataModelDraft.id,
      );
      expect(response.data).toEqual({ ...productDataModelDraft });
    });

    it("should modify product data model draft", async () => {
      const response = await sdk.dpp.productDataModelDrafts.modify(
        productDataModelDraft.id,
        { name: "new Name" },
      );
      expect(response.data).toEqual({ ...productDataModelDraft });
    });

    it("should be published", async () => {
      const response = await sdk.dpp.productDataModelDrafts.publish(
        productDataModelDraft.id,
        { visibility: VisibilityLevel.PRIVATE },
      );
      expect(response.data).toEqual({ ...productDataModel });
    });
  });

  describe("unique-product-identifiers", () => {
    it("should return view by unique product identifier", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      const response = await sdk.dpp.uniqueProductIdentifiers.getView(
        uniqueProductIdentifierId,
      );
      expect(response.data).toEqual({
        ...responseView,
      });
    });

    it("should return reference of unique product identifier", async () => {
      const sdk = new OpenDppSdk({
        baseURL,
      });
      sdk.setActiveOrganizationId(activeOrganization.id);
      const response = await sdk.dpp.uniqueProductIdentifiers.getReference(
        uniqueProductIdentifierId,
      );
      expect(response.data).toEqual(uniqueProductIdentifierReference);
    });
  });

  describe("aas-integration", () => {
    const sdk = new OpenDppSdk({
      baseURL,
    });
    sdk.setActiveOrganizationId(activeOrganization.id);
    it("should return aas connection", async () => {
      const response = await sdk.dpp.aasIntegration.getConnection(
        connection.id,
      );
      expect(response.data).toEqual({
        ...connection,
      });
    });

    it("should return all aas connections of organization", async () => {
      const response = await sdk.dpp.aasIntegration.getAllConnections();
      expect(response.data).toEqual(connectionList);
    });

    it("should create aas connection", async () => {
      const response = await sdk.dpp.aasIntegration.createConnection({
        name: "Connection 1",
        aasType: AssetAdministrationShellType.Truck,
        dataModelId: randomUUID(),
        modelId: randomUUID(),
        fieldAssignments: [
          {
            dataFieldId: randomUUID(),
            sectionId: randomUUID(),
            idShortParent: "Parent",
            idShort: "Child",
          },
        ],
      });
      expect(response.data).toEqual({
        ...connection,
      });
    });

    it("should patch aas connection", async () => {
      const response = await sdk.dpp.aasIntegration.modifyConnection(
        connection.id,
        {
          name: "Connection 2",
          modelId: randomUUID(),
          fieldAssignments: [
            {
              dataFieldId: randomUUID(),
              sectionId: randomUUID(),
              idShortParent: "Parent",
              idShort: "Child",
            },
          ],
        },
      );
      expect(response.data).toEqual({
        ...connection,
      });
    });

    it("should return aas properties with parent for given aas type", async () => {
      const response = await sdk.dpp.aasIntegration.getPropertiesOfAas(
        AssetAdministrationShellType.Truck,
      );
      expect(response.data).toEqual(aasPropertiesWithParent);
    });
  });
});
