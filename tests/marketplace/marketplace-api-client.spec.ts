import { server } from "./msw.server";
import { OpenDppClient } from "../../src";
import { passportTemplate } from "./handlers/passport-templates";
import { marketplaceURL } from "./handlers";

describe("MarketplaceApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("passport templates", () => {
    it("should return passport templates", async () => {
      const sdk = new OpenDppClient({
        marketplace: { baseURL: marketplaceURL },
      });
      const response = await sdk.marketplace.passportTemplates.getAll();
      expect(response.data).toEqual([passportTemplate]);
    });
  });
});
