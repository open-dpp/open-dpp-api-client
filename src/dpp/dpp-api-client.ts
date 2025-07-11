import { OrganizationsNamespace } from "./organizations/organizations.namespace";
import { ModelsNamespace } from "./models/models.namespace";
import { ItemsNamespace } from "./items/items.namespace";
import { ProductDataModelDraftsNamespace } from "./product-data-model-drafts/product-data-model-drafts.namespace";
import { ProductDataModelsNamespace } from "./product-data-models/product-data-models.namespace";
import { UniqueProductIdentifiersNamespace } from "./unique-product-identifiers/unique-product-identifiers.namespace";
import { AasIntegrationNamespace } from "./integrations/aas-integration.namespace";
import axios, { AxiosInstance } from "axios";
import { IApiClient, ApiClientOptions } from "../api-client";

export class DppApiClient implements IApiClient {
  public organizations!: OrganizationsNamespace;
  public models!: ModelsNamespace;
  public items!: ItemsNamespace;
  public productDataModelDrafts!: ProductDataModelDraftsNamespace;
  public productDataModels!: ProductDataModelsNamespace;
  public uniqueProductIdentifiers!: UniqueProductIdentifiersNamespace;
  public aasIntegration!: AasIntegrationNamespace;
  private axiosInstance!: AxiosInstance;
  private options: ApiClientOptions;

  constructor(options: ApiClientOptions = {}) {
    this.options = options;
    this.createNewAxiosInstance();
  }

  public setApiKey(apiKey: string) {
    this.options.apiKey = apiKey;
    this.createNewAxiosInstance();
  }

  public setActiveOrganizationId(id: string) {
    this.options.activeOrganizationId = id;
    this.createNewAxiosInstance();
  }

  private createNewAxiosInstance() {
    this.axiosInstance = axios.create({
      baseURL: this.options.baseURL ?? "https://api.cloud.open-dpp.de",
      headers: {
        Authorization: this.options.apiKey
          ? `Bearer ${this.options.apiKey}`
          : "",
        ...this.options.headers,
      },
      ...this.options,
    });
    this.organizations = new OrganizationsNamespace(this.axiosInstance);
    this.models = new ModelsNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
    this.items = new ItemsNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
    this.productDataModels = new ProductDataModelsNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
    this.productDataModelDrafts = new ProductDataModelDraftsNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
    this.aasIntegration = new AasIntegrationNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );

    this.uniqueProductIdentifiers = new UniqueProductIdentifiersNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
  }
}
