import { server } from "./msw.server";
import { OpenDppClient } from "../../src";
import { analyticsUrl } from "./handlers";
import { activeOrganization } from "../organization";
import {
  pageViewDto,
  passportMeasurementDto,
  passportMetricQueryDto,
} from "./handlers/passport-metrics";
import { expectWithDetailedError } from "../error-utils";
import { randomUUID } from "node:crypto";

describe("AnalyticsApiClient", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("passport metrics", () => {
    const sdk = new OpenDppClient({
      analytics: { baseURL: analyticsUrl },
    });
    sdk.setActiveOrganizationId(activeOrganization.id);
    it("should query passport metric", async () => {
      await expectWithDetailedError(
        // Action
        () => sdk.analytics.passportMetric.query(passportMetricQueryDto),
        // Expectation
        (response) => expect(response.data).toEqual([passportMeasurementDto]),
      );
    });

    it("should add page view", async () => {
      const response = await sdk.analytics.passportMetric.addPageView({
        uuid: randomUUID(),
        page: "http://example.com",
      });

      expect(response.data).toEqual(pageViewDto);
    });
  });
});
