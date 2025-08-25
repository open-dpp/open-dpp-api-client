import { AxiosInstance } from "axios";
import {
  AiConfigurationDto,
  AiConfigurationUpsertDto,
} from "./ai-configuration.dtos";

export class AiConfigurationNamespace {
  private readonly configurationsEndpoint: string;
  constructor(
    public readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.configurationsEndpoint = `/organizations/${this.organizationId}/configurations`;
  }

  public async upsert(data: AiConfigurationUpsertDto) {
    return this.axiosInstance.put<AiConfigurationDto>(
      this.configurationsEndpoint,
      data,
    );
  }

  public async get() {
    return this.axiosInstance.get<AiConfigurationDto>(
      this.configurationsEndpoint,
    );
  }
}
