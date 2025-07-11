import axios, { AxiosInstance } from "axios";
import { ApiClientOptions, IApiClient } from "../api-client";
import { PassportTemplatesNamespace } from "./passport-templates/passport-templates.namespace";

export class MarketplaceApiClient implements IApiClient {
  public passportTemplatesNamespace!: PassportTemplatesNamespace;
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
      baseURL: this.options.baseURL ?? "https://marketplace.cloud.open-dpp.de",
      headers: {
        Authorization: this.options.apiKey
          ? `Bearer ${this.options.apiKey}`
          : "",
        ...this.options.headers,
      },
      ...this.options,
    });
    this.passportTemplatesNamespace = new PassportTemplatesNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
  }
}
