import { http, HttpResponse } from "msw";
import { randomUUID } from "node:crypto";

import { activeOrganization } from "../../organization";
import {
  AiConfigurationDto,
  AiProvider,
} from "../../../src/agent-server/ai-configuration/ai-configuration.dtos";
import { agentServerURL } from "./index";

export const nowDate = new Date("2025-01-01T12:00:00Z");

export const aiConfigurationDto: AiConfigurationDto = {
  id: randomUUID(),
  ownedByOrganizationId: randomUUID(),
  createdByUserId: randomUUID(),
  createdAt: nowDate.toISOString(),
  updatedAt: nowDate.toISOString(),
  provider: AiProvider.Mistral,
  model: "codestral-latest",
  isEnabled: true,
};

export const aiConfigurationHandler = [
  http.put(
    `${agentServerURL}/organizations/${activeOrganization.id}/configurations`,
    () => {
      return HttpResponse.json(aiConfigurationDto);
    },
  ),
  http.get(
    `${agentServerURL}/organizations/${activeOrganization.id}/configurations`,
    () => {
      return HttpResponse.json(aiConfigurationDto);
    },
  ),
];
