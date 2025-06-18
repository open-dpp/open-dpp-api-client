import { AxiosInstance } from "axios";
import {
  UniqueProductIdentifierReferenceDto,
  ViewDto,
} from "./unique-product-identifiers.dtos";

export class UniqueProductIdentifiersNamespace {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {}

  public async getView(uuid: string) {
    return this.axiosInstance.get<ViewDto>(
      `/unique-product-identifiers/${uuid}/view`,
    );
  }

  public async getUniqueProductIdentifierReference(uuid: string) {
    return this.axiosInstance.get<UniqueProductIdentifierReferenceDto>(
      `/organizations/${this.organizationId}/unique-product-identifiers/${uuid}/reference`,
    );
  }
}
