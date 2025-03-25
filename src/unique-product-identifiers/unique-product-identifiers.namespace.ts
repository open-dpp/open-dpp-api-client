import { AxiosInstance } from "axios";
import { ViewDto } from "./unique-product-identifiers.dtos";

export class UniqueProductIdentifiersNamespace {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async getView(uuid: string) {
    return this.axiosInstance.get<ViewDto>(
      `/unique-product-identifiers/${uuid}/view`,
    );
  }
}
