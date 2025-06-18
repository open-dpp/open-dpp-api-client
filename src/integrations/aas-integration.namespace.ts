import { AxiosInstance } from "axios";
import {
  AasConnectionDto,
  CreateAasConnectionDto,
  UpdateAasConnectionDto,
} from "./aas-integration.dtos";

export class AasIntegrationNamespace {
  private readonly aasBaseEndpoint: string;
  private readonly aasConnectionsEndpoint: string;
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.aasBaseEndpoint = `/organizations/${this.organizationId}/integration/aas`;
    this.aasConnectionsEndpoint = `${this.aasBaseEndpoint}/connections`;
  }

  public async getConnection(connectionId: string) {
    return this.axiosInstance.get<AasConnectionDto>(
      `${this.aasConnectionsEndpoint}/${connectionId}`,
    );
  }

  public async createConnection(data: CreateAasConnectionDto) {
    return this.axiosInstance.post<AasConnectionDto>(
      this.aasConnectionsEndpoint,
      data,
    );
  }

  public async modifyConnection(
    connectionId: string,
    data: UpdateAasConnectionDto,
  ) {
    return this.axiosInstance.patch<AasConnectionDto>(
      `${this.aasConnectionsEndpoint}/${connectionId}`,
      data,
    );
  }
}
