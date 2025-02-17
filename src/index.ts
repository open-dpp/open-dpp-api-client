import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { OrganizationsNamespace } from "./namespaces/organizations.namespace";
import { ModelsNamespace } from "./namespaces/models.namespace";
import { ProductDataModelsNamespace } from "./namespaces/product-data-models.namespace";

export interface ApiClientOptions extends AxiosRequestConfig {
  apiKey?: string;
}

export class OpenDppApiClient {
  private axiosInstance: AxiosInstance;
  private readonly initOptions: ApiClientOptions;
  public organizations: OrganizationsNamespace;
  public models: ModelsNamespace;
  public productDataModels: ProductDataModelsNamespace;

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
