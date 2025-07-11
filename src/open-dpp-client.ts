import { DppApiClient } from "./dpp/dpp-api-client";
import { ApiClientOptions } from "./api-client";
import { MarketplaceApiClient } from "./marketplace/marketplace-api-client";

type OpenDppClientOptions = {
  dpp?: ApiClientOptions;
  marketplace?: ApiClientOptions;
};

export class OpenDppClient {
  public readonly dpp: DppApiClient;
  public readonly marketplace: MarketplaceApiClient;
  constructor({ dpp = {}, marketplace = {} }: OpenDppClientOptions) {
    this.dpp = new DppApiClient(dpp);
    this.marketplace = new MarketplaceApiClient(marketplace);
  }

  public setApiKey(apiKey: string) {
    this.dpp.setApiKey(apiKey);
    this.marketplace.setApiKey(apiKey);
  }

  public setActiveOrganizationId(id: string) {
    this.dpp.setActiveOrganizationId(id);
    this.marketplace.setActiveOrganizationId(id);
  }
}
