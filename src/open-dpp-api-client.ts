import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { OrganizationsNamespace } from "./organizations/organizations.namespace";
import { ModelsNamespace } from "./models/models.namespace";
import { ProductDataModelsNamespace } from "./product-data-models/product-data-models.namespace";
import { UniqueProductIdentifiersNamespace } from "./unique-product-identifiers/unique.product.identifiers.namespace";

export interface ApiClientOptions extends AxiosRequestConfig {
  apiKey?: string;
}

export class OpenDppApiClient {
  public organizations: OrganizationsNamespace;
  public models: ModelsNamespace;
  public productDataModels: ProductDataModelsNamespace;
  public uniqueProductIdentifiers: UniqueProductIdentifiersNamespace;
  private axiosInstance: AxiosInstance;
  private readonly initOptions: ApiClientOptions;

  constructor(options: ApiClientOptions = {}) {
    this.initOptions = options;
    this.axiosInstance = axios.create({
      baseURL: this.initOptions.baseURL ?? "https://api.cloud.open-dpp.de",
      headers: {
        Authorization: this.initOptions.apiKey
          ? `Bearer ${this.initOptions.apiKey}`
          : "",
        ...this.initOptions.headers,
      },
      ...this.initOptions,
    });
    this.organizations = new OrganizationsNamespace(this.axiosInstance);
    this.models = new ModelsNamespace(this.axiosInstance);
    this.productDataModels = new ProductDataModelsNamespace(this.axiosInstance);
    this.uniqueProductIdentifiers = new UniqueProductIdentifiersNamespace(
      this.axiosInstance,
    );
  }

  public setApiKey(apiKey: string) {
    this.createNewAxiosInstance(apiKey);
  }

  private createNewAxiosInstance(apiKey?: string) {
    let auth = "";
    if (apiKey) {
      auth = `Bearer ${apiKey}`;
    } else if (this.initOptions.apiKey) {
      auth = `Bearer ${this.initOptions.apiKey}`;
    }
    this.axiosInstance = axios.create({
      baseURL: this.initOptions.baseURL ?? "https://api.cloud.open-dpp.de",
      headers: {
        Authorization: auth,
        ...this.initOptions.headers,
      },
      ...this.initOptions,
    });
    this.organizations = new OrganizationsNamespace(this.axiosInstance);
    this.models = new ModelsNamespace(this.axiosInstance);
    this.productDataModels = new ProductDataModelsNamespace(this.axiosInstance);
  }
}
