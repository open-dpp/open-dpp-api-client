import { AxiosInstance } from "axios";
import { AasMappingDto } from "./aas-mapping.dtos";

export class AasMappingNamespace {
  private readonly aasMappingsEndpoint: string;
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.aasMappingsEndpoint = `/organizations/${this.organizationId}/integration/aas/mappings`;
  }

  public async getMapping(mappingId: string) {
    return this.axiosInstance.get<AasMappingDto>(
      `${this.aasMappingsEndpoint}/${mappingId}`,
    );
  }
}
