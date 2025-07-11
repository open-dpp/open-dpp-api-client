import { AxiosRequestConfig } from "axios";
import { DppApiClient } from "./dpp-api-client";

export interface SdkOptions extends AxiosRequestConfig {
  apiKey?: string;
  activeOrganizationId?: string;
}

export class OpenDppSdk {
  public readonly dpp: DppApiClient;
  constructor(options: SdkOptions = {}) {
    this.dpp = new DppApiClient(options);
  }

  public setApiKey(apiKey: string) {
    this.dpp.setApiKey(apiKey);
  }

  public setActiveOrganizationId(id: string) {
    this.dpp.setActiveOrganizationId(id);
  }
}
