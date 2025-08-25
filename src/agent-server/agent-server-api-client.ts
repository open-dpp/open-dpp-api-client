import axios, { AxiosInstance } from "axios";
import { ApiClientOptions, IApiClient } from "../api-client";
import { AiConfigurationNamespace } from "./ai-configuration/ai-configuration.namespace";

export class AgentServerApiClient implements IApiClient {
  public aiConfigurations!: AiConfigurationNamespace;
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
      baseURL: this.options.baseURL ?? "https://agent-server.cloud.open-dpp.de",
      headers: {
        Authorization: this.options.apiKey
          ? `Bearer ${this.options.apiKey}`
          : "",
        ...this.options.headers,
      },
      ...this.options,
    });
    this.aiConfigurations = new AiConfigurationNamespace(
      this.axiosInstance,
      this.options.activeOrganizationId,
    );
  }
}
