import { DppApiClient } from "./dpp/dpp-api-client";
import { ApiClientOptions } from "./api-client";
import { MarketplaceApiClient } from "./marketplace/marketplace-api-client";
import { AgentServerApiClient } from "./agent-server/agent-server-api-client";

type OpenDppClientOptions = {
  dpp?: ApiClientOptions;
  marketplace?: ApiClientOptions;
  agentServer?: ApiClientOptions;
};

export class OpenDppClient {
  public readonly dpp: DppApiClient;
  public readonly marketplace: MarketplaceApiClient;
  public readonly agentServer: AgentServerApiClient;
  constructor({
    dpp = {},
    marketplace = {},
    agentServer = {},
  }: OpenDppClientOptions) {
    this.dpp = new DppApiClient(dpp);
    this.marketplace = new MarketplaceApiClient(marketplace);
    this.agentServer = new AgentServerApiClient(agentServer);
  }

  public setApiKey(apiKey: string) {
    this.dpp.setApiKey(apiKey);
    this.marketplace.setApiKey(apiKey);
  }

  public setActiveOrganizationId(id: string) {
    this.dpp.setActiveOrganizationId(id);
    this.marketplace.setActiveOrganizationId(id);
    this.agentServer.setActiveOrganizationId(id);
  }
}
