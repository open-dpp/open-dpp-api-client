import { AxiosRequestConfig } from "axios";

export interface IApiClient {
  setApiKey(apiKey: string): void;
  setActiveOrganizationId(id: string): void;
}

export interface ApiClientOptions extends AxiosRequestConfig {
  apiKey?: string;
  activeOrganizationId?: string;
}
