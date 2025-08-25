import { server } from "./msw.server";
import { OpenDppClient } from "../../src";
import { aiConfigurationDto } from "./handlers/ai-configurations";
import { agentServerURL } from "./handlers";
import { activeOrganization } from "../organization";
import { AiProvider } from "../../src/agent-server/ai-configuration/ai-configuration.dtos";

describe("AgentServerApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("ai configuration", () => {
    const sdk = new OpenDppClient({
      agentServer: { baseURL: agentServerURL },
    });
    sdk.setActiveOrganizationId(activeOrganization.id);
    it("should create ai configuration", async () => {
      const response = await sdk.agentServer.aiConfigurations.upsert({
        provider: AiProvider.Mistral,
        model: "codestral-latest",
        isEnabled: true,
      });
      expect(response.data).toEqual(aiConfigurationDto);
    });
    it("should return passport templates", async () => {
      const response = await sdk.agentServer.aiConfigurations.get();
      expect(response.data).toEqual(aiConfigurationDto);
    });
  });
});
