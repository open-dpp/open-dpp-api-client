import { DppApiClient } from "./dpp/dpp-api-client";
import { ApiClientOptions, IApiClient } from "./api-client";
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
  private readonly clients: IApiClient[];
  constructor({
    dpp = {},
    marketplace = {},
    agentServer = {},
  }: OpenDppClientOptions) {
    this.dpp = new DppApiClient(dpp);
    this.marketplace = new MarketplaceApiClient(marketplace);
    this.agentServer = new AgentServerApiClient(agentServer);
    this.clients = [this.dpp, this.marketplace, this.agentServer];
  }

  public setApiKey(apiKey: string) {
    this.clients.forEach((client) => client.setApiKey(apiKey));
  }

  public setActiveOrganizationId(id: string) {
    this.clients.forEach((client) => client.setActiveOrganizationId(id));
  }
}
