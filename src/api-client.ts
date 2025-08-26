import axios, { AxiosRequestConfig } from "axios";

export interface IApiClient {
  setApiKey(apiKey: string): void;
  setActiveOrganizationId(id: string): void;
}

export interface ApiClientOptions extends AxiosRequestConfig {
  apiKey?: string;
  activeOrganizationId?: string;
}

export function createAxiosClient(
  options: ApiClientOptions,
  defaultBaseUrl: string,
) {
  return axios.create({
    ...options,
    baseURL: options.baseURL ?? defaultBaseUrl,
    headers: {
      ...options.headers,
      Authorization: options.apiKey ? `Bearer ${options.apiKey}` : "",
    },
  });
}
